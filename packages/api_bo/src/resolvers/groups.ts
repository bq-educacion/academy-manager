import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";
import {
  instructorCollection,
  InstructorModel,
} from "../models/InstructorModel.ts";
import {
  MutationDeleteGroupArgs,
  PaginatedGroups,
  QueryAdvancedGetGroupsArgs,
  QueryGetGroupArgs,
  QueryGetGroupsArgs,
} from "../types.ts";
import { Filter } from "mongo";
import { paginatedFilters, sortFilter } from "../lib/paginatedFilters.ts";
import {
  Course,
  MutationCreateGroupArgs,
  MutationEditGroupArgs,
  Timetable,
} from "../types.ts";

import { ObjectId } from "objectId";
import { setIdDays } from "../lib/setIdDays.ts";
import { checkNotNull } from "../lib/checkNotNull.ts";
import { validHour } from "../lib/validHour.ts";
import { setActiveToFalse } from "../lib/setActiveToFalse.ts";
import {
  advancedMongoSearchRegex,
  advancedMongoSearchRegexNumber,
  mongoSearchRegex,
} from "../lib/mongoSearchRegex.ts";

export const groups = {
  Group: {
    id: (parent: GroupModel): string => {
      return String(parent._id!);
    },
    center: async (
      parent: GroupModel,
      _: unknown,
      ctx: Context,
    ): Promise<CenterModel | undefined> => {
      if (parent.center !== null) {
        return await centerCollection(ctx.db).findOne({ _id: parent.center });
      } else {
        return null;
      }
    },
    students: async (
      parent: GroupModel,
      _: unknown,
      ctx: Context,
    ): Promise<StudentModel[]> => {
      return await studentCollection(ctx.db)
        .find({
          _id: { $in: parent.students },
        })
        .toArray();
    },
    instructors: async (
      parent: GroupModel,
      _: unknown,
      ctx: Context,
    ): Promise<InstructorModel[]> => {
      return await instructorCollection(ctx.db)
        .find({
          _id: { $in: parent.instructors },
        })
        .toArray();
    },
  },
  Query: {
    getGroups: (
      _parent: unknown,
      args: QueryGetGroupsArgs,
      ctx: Context,
    ): Promise<PaginatedGroups> => {
      const filter: Filter<PaginatedGroups> = { $or: [{}] };
      if (args.groups.searchText) {
        filter["$or"] = [
          { id_group: parseInt(args.groups.searchText) },
          { name: mongoSearchRegex(args.groups.searchText) },
          { type: mongoSearchRegex(args.groups.searchText) },
          { modality: mongoSearchRegex(args.groups.searchText) },
          { createdAt: mongoSearchRegex(args.groups.searchText) },
          { "course.ESO": mongoSearchRegex(args.groups.searchText) },
          { "course.EPO": mongoSearchRegex(args.groups.searchText) },
          { "timetable.day": mongoSearchRegex(args.groups.searchText) },
          { "timetable.start": mongoSearchRegex(args.groups.searchText) },
          { "timetable.end": mongoSearchRegex(args.groups.searchText) },
          { notes: mongoSearchRegex(args.groups.searchText) },
          { "centersName.name": mongoSearchRegex(args.groups.searchText) },
          { "instructorsName.name": mongoSearchRegex(args.groups.searchText) },
          { "studentsName.name": mongoSearchRegex(args.groups.searchText) },
        ];
      }

      const sort = sortFilter(
        args.groups.orderFilter,
        args.groups.order,
        "groups",
        "id_group",
      );

      return paginatedFilters(
        groupCollection(ctx.db),
        filter,
        "groups",
        sort,
        args.groups.page,
        args.groups.pageSize,
      ) as Promise<PaginatedGroups>;
    },

    advancedGetGroups: (
      _parent: unknown,
      args: QueryAdvancedGetGroupsArgs,
      ctx: Context,
    ): Promise<PaginatedGroups> => {
      const filter: Filter<PaginatedGroups> = { $or: [{}] };
      if (args.groups.searchText) {
        const data = [];
        if (args.groups.searchText.id_group) {
          data.push(
            advancedMongoSearchRegexNumber(
              "id_group",
              args.groups.searchText.id_group,
            ),
          );
        }
        if (args.groups.searchText.center) {
          data.push(
            advancedMongoSearchRegex(
              "centersName.name",
              args.groups.searchText.center,
            ),
          );
        }
        if (args.groups.searchText.instructors) {
          data.push(
            advancedMongoSearchRegex(
              "instructorsName.name",
              args.groups.searchText.instructors,
            ),
          );
        }
        if (args.groups.searchText.start) {
          data.push(
            advancedMongoSearchRegex(
              "timetable.start",
              args.groups.searchText.start,
            ),
          );
        }
        if (args.groups.searchText.end) {
          data.push(
            advancedMongoSearchRegex(
              "timetable.end",
              args.groups.searchText.end,
            ),
          );
        }
        if (args.groups.searchText.day) {
          data.push(
            advancedMongoSearchRegex(
              "timetable.day",
              args.groups.searchText.day,
              true,
            ),
          );
        }
        if (args.groups.searchText.course) {
          data.push(
            advancedMongoSearchRegex(
              "course.ESO",
              args.groups.searchText.course,
            ),
          );
          data.push(
            advancedMongoSearchRegex(
              "course.EPO",
              args.groups.searchText.course,
            ),
          );
        }
        if (args.groups.searchText.modality) {
          data.push(
            advancedMongoSearchRegex(
              "modality",
              args.groups.searchText.modality,
              true,
            ),
          );
        }
        filter["$or"] = data;
      }

      const sort = sortFilter(
        args.groups.orderFilter,
        args.groups.order,
        "groups",
        "id_group",
      );

      return paginatedFilters(
        groupCollection(ctx.db),
        filter,
        "groups",
        sort,
        args.groups.page,
        args.groups.pageSize,
      ) as Promise<PaginatedGroups>;
    },

    getGroup: async (
      _parent: unknown,
      args: QueryGetGroupArgs,
      ctx: Context,
    ): Promise<{ group: GroupModel; totalStudents: number }> => {
      try {
        const group = await groupCollection(ctx.db).findById(args.id);
        if (!group) {
          throw new Error("400, Group not found");
        }

        return { group, totalStudents: group.students.length };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
  Mutation: {
    createGroup: async (
      _parent: unknown,
      args: MutationCreateGroupArgs,
      ctx: Context,
    ): Promise<GroupModel> => {
      try {
        checkNotNull(args.group);
        const group = await groupCollection(ctx.db).findOne({
          center: new ObjectId(args.idCenter),
          name: { $regex: args.group.name, $options: "i" },
        });
        if (group) throw new Error("404, Group already exists");

        const createdAt = new Date().toLocaleDateString("en-GB");

        const ids = await groupCollection(ctx.db)
          .find({})
          .sort({ id_group: -1 })
          .toArray();
        let id_group = 1;
        if (ids.length > 0) {
          id_group = (ids[0].id_group as number) + 1;
        }
        while (await groupCollection(ctx.db).findOne({ id_group })) {
          id_group = id_group + 1;
        }

        const centerExists = await centerCollection(ctx.db).findById(
          args.idCenter,
        );
        if (!centerExists) throw new Error("404, Center not found");
        const center = new ObjectId(args.idCenter);

        const instructors = args.group.instructors?.map(
          (instructor) => new ObjectId(instructor),
        );
        if (args.group.instructors) {
          const exists = await instructorCollection(ctx.db)
            .find({
              _id: { $in: instructors },
            })
            .toArray();
          if (exists?.length !== instructors?.length) {
            throw new Error("404, Instructors not found");
          }
        }

        const timetable = setIdDays(args.group.timetable) as Timetable[];
        validHour(timetable);

        const course: Course = {
          EPO: [],
          ESO: [],
        };

        const newGroup = {
          ...args.group,
          id_group,
          timetable,
          active: centerExists.active,
          center,
          course,
          instructors: instructors || [],
          createdAt,
          students: [],
        };
        const idGroup = await groupCollection(ctx.db).insertOne({
          ...newGroup,
        });

        return {
          _id: idGroup,
          ...newGroup,
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    editGroup: async (
      _parent: unknown,
      args: MutationEditGroupArgs,
      ctx: Context,
    ): Promise<GroupModel> => {
      try {
        checkNotNull(args.group);
        let activeGroups = false;
        let updateGroup = { ...args.group } as Partial<GroupModel>;

        if (args.group.instructors) {
          const instructors = args.group.instructors?.map(
            (instructor) => new ObjectId(instructor),
          );

          const exists = await instructorCollection(ctx.db)
            .find({
              _id: { $in: instructors },
            })
            .toArray();

          if (exists?.length !== instructors?.length) {
            throw new Error("404, Instructors not found");
          }

          updateGroup = { ...updateGroup, instructors };

          if (exists.length > 0) {
            //check if at least one instructor is enrolled
            activeGroups = exists.some((instructor) => instructor.enrolled);
          }

          if (!activeGroups) {
            const group = await groupCollection(ctx.db).findById(args.id);
            if (!group) throw new Error("404, Group not found");
            // if students are not in other groups, active = false
            setActiveToFalse(
              group.students,
              groupCollection(ctx.db),
              "students",
              studentCollection(ctx.db),
            );

            // if instructors are not in other groups, active = false
            setActiveToFalse(
              group.instructors,
              groupCollection(ctx.db),
              "instructors",
              instructorCollection(ctx.db),
            );
          }
        }

        if (args.group.center) {
          const exists = await centerCollection(ctx.db).findOne({
            _id: new ObjectId(args.group.center),
            active: true,
          });
          if (!exists) {
            throw new Error("404, Center not found or not active");
          }
          updateGroup = {
            ...updateGroup,
            center: new ObjectId(args.group.center),
          };
        }

        if (args.group.timetable) {
          const timetable = setIdDays(args.group.timetable) as Timetable[];
          validHour(timetable);
          updateGroup = { ...updateGroup, timetable };
        }

        updateGroup = { ...updateGroup, active: activeGroups };

        const newGroup = await groupCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            update: { $set: updateGroup },
            new: true,
          },
        );
        if (!newGroup) {
          throw new Error("404, Group not found");
        }
        return newGroup;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    deleteGroup: async (
      _parent: unknown,
      args: MutationDeleteGroupArgs,
      ctx: Context,
    ): Promise<GroupModel> => {
      try {
        const deletedGroup = await groupCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            remove: true,
          },
        );
        if (!deletedGroup) {
          throw new Error("404, Group not found");
        }

        // if students are not in other groups, active = false
        setActiveToFalse(
          deletedGroup.students,
          groupCollection(ctx.db),
          "students",
          studentCollection(ctx.db),
        );

        // if instructors are not in other groups, active = false
        setActiveToFalse(
          deletedGroup.instructors,
          groupCollection(ctx.db),
          "instructors",
          instructorCollection(ctx.db),
        );

        return deletedGroup;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
