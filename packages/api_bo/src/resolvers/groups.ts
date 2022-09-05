import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";
import {
  instructorCollection,
  InstructorModel,
} from "../models/InstructorModel.ts";
import {
  PaginatedGroups,
  QueryGetGroupArgs,
  QueryGetGroupsArgs,
} from "../types.ts";
import { Filter } from "mongo";
import { paginatedFilters } from "../lib/paginatedFilters.ts";
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
      if (args.searchText) {
        filter["$or"] = [
          { id_group: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { type: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { modality: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            createdAt: { $regex: `.*${args.searchText}.*`, $options: "i" },
          },
          { "course.ESO": { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { "course.EPO": { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            "timetable.day": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            "timetable.start": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            "timetable.end": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            "centersName.name": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            "instructorsName.name": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            "studentsName.name": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
        ];
      }

      let sortFilter = {};
      const OrderFilter = {
        id_group: "id_group",
        modality: "modality",
        course: "course",
        instructors: "instructorsName.name",
        center: "centersName.name",
        id_day: "timetable.id_day",
        start: "timetable.start",
        end: "timetable.end",
      };

      if (args.orderFilter && args.order) {
        if (args.order !== 1 && args.order !== -1) {
          throw new Error("400, wrong order (1 or -1)");
        }
        sortFilter = { [OrderFilter[args.orderFilter]]: args.order };
      } else if (args.orderFilter && !args.order) {
        throw new Error("400, order is required");
      } else if (!args.orderFilter && args.order) {
        throw new Error("400, orderFilter is required");
      } else {
        sortFilter = { id_group: 1 };
      }

      return paginatedFilters(
        groupCollection(ctx.db),
        filter,
        "groups",
        sortFilter,
        args.page,
        args.pageSize,
      ) as Promise<PaginatedGroups>;
    },

    getGroup: async (
      _parent: unknown,
      args: QueryGetGroupArgs,
      ctx: Context,
    ): Promise<GroupModel> => {
      try {
        const group = await groupCollection(ctx.db).findById(args.id);
        if (!group) {
          throw new Error("400, Group not found");
        }
        return group;
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
        checkNotNull(args);
        const group = await groupCollection(ctx.db).findOne({
          center: new ObjectId(args.idCenter),
          name: { $regex: args.name, $options: "i" },
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

        const instructors = args.instructors?.map(
          (instructor) => new ObjectId(instructor),
        );
        if (args.instructors) {
          const exists = await instructorCollection(ctx.db)
            .find({
              _id: { $in: instructors },
            })
            .toArray();
          if (exists?.length !== instructors?.length) {
            throw new Error("404, Instructors not found");
          }
        }

        const timetable = setIdDays(args.timetable) as Timetable[];
        validHour(timetable);

        const course: Course = {
          EPO: [],
          ESO: [],
        };

        const newGroup = {
          ...args,
          id_group,
          timetable,
          activeCenter: centerExists.active,
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
        checkNotNull(args);
        let updateGroup = { ...args } as Partial<GroupModel>;

        if (args.instructors) {
          const instructors = args.instructors?.map(
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
        }

        if (args.center) {
          const exists = await centerCollection(ctx.db).findById(args.center);
          if (!exists) {
            throw new Error("404, Center not found");
          }
          updateGroup = { ...updateGroup, center: new ObjectId(args.center) };
        }

        if (args.timetable) {
          const timetable = setIdDays(args.timetable) as Timetable[];
          validHour(timetable);
          updateGroup = { ...updateGroup, timetable };
        }

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
  },
};
