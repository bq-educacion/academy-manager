import { Context } from "../app.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import {
  instructorCollection,
  InstructorModel,
} from "../models/InstructorModel.ts";
import {
  MutationDeleteInstructorArgs,
  MutationSetStatusInstructorArgs,
  PaginatedInstructors,
  QueryCheckCorporateEmailArgs,
  QueryGetInstructorArgs,
  QueryGetInstructorsArgs,
  Region,
} from "../types.ts";
import { Filter } from "mongo";
import { paginatedFilters } from "../lib/paginatedFilters.ts";
import {
  Availability,
  MutationCreateInstructorArgs,
  MutationEditInstructorArgs,
} from "../types.ts";
import { ObjectId } from "objectId";
import { setIdDays } from "../lib/setIdDays.ts";
import { checkNotNull } from "../lib/checkNotNull.ts";
import { checkActiveGroups } from "../lib/checkActiveGroups.ts";
import { setActiveToFalse } from "../lib/setActiveToFalse.ts";
import { studentCollection } from "../models/StudentModel.ts";
import { updateCourses } from "../lib/courses.ts";
import { centerCollection } from "../models/CenterModel.ts";
import { checkActiveCenter } from "../lib/checkActiveCenter.ts";
import { getUniqueItems } from "../lib/getUniqueItems.ts";
import { areaCollection } from "../models/AreaModel.ts";
import { checkAreas } from "../lib/checkAreas.ts";

export const instructors = {
  Instructor: {
    id: (parent: InstructorModel): string => {
      return String(parent._id!);
    },
    groups: async (
      parent: InstructorModel,
      _: unknown,
      ctx: Context,
    ): Promise<GroupModel[] | undefined> => {
      return await groupCollection(ctx.db)
        .find({ instructors: parent._id })
        .toArray();
    },
  },
  Query: {
    checkCorporateEmail: async (
      _parent: unknown,
      args: QueryCheckCorporateEmailArgs,
      ctx: Context,
    ): Promise<string> => {
      try {
        const instructor = await instructorCollection(ctx.db).findOne({
          corporateEmail: args.email,
        });
        if (instructor) {
          throw new Error("400, Corporate email must be unique");
        }
        return args.email;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    getInstructors: (
      _parent: unknown,
      args: QueryGetInstructorsArgs,
      ctx: Context,
    ): Promise<PaginatedInstructors> => {
      const filter: Filter<PaginatedInstructors> = { $or: [{}] };
      if (args.instructors.searchText) {
        filter["$or"] = [
          {
            name: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            corporateEmail: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            personalEmail: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            phone: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            state: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            training: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            previousExperience: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            knowledge: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            urlCV: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            materialsExperience: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            platformEducationExperience: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            languages: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            "availability.day": {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            "availability.hours": {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            summerAvailability: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            vehicle: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            geographicalAvailability: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            areas: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            notes: {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            "centersName.name": {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
          {
            "groupsId.id_group": {
              $regex: `.*${args.instructors.searchText}.*`,
              $options: "i",
            },
          },
        ];
      }

      let sortFilter = {};
      const OrderFilter = {
        name: "name",
        center: "centersName.name",
        areas: "areas",
        id_day: "availability.id_day",
        state: "state",
        id_group: "groupsId.id_group",
        vehicle: "vehicle",
        languages: "languages",
        summerAvailability: "summerAvailability",
      };

      if (args.instructors.orderFilter && args.instructors.order) {
        if (args.instructors.order !== 1 && args.instructors.order !== -1) {
          throw new Error("400, wrong order (1 or -1)");
        }
        sortFilter = {
          [OrderFilter[args.instructors.orderFilter]]: args.instructors.order,
        };
      } else if (args.instructors.orderFilter && !args.instructors.order) {
        throw new Error("400, order is required");
      } else if (!args.instructors.orderFilter && args.instructors.order) {
        throw new Error("400, orderFilter is required");
      } else {
        sortFilter = { name: 1 };
      }

      return paginatedFilters(
        instructorCollection(ctx.db),
        filter,
        "instructors",
        sortFilter,
        args.instructors.page,
        args.instructors.pageSize,
      ) as Promise<PaginatedInstructors>;
    },

    getInstructor: async (
      _parent: unknown,
      args: QueryGetInstructorArgs,
      ctx: Context,
    ): Promise<InstructorModel> => {
      try {
        const instructor = await instructorCollection(ctx.db).findById(args.id);
        if (!instructor) {
          throw new Error("404, Instructor not found");
        }
        return instructor;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
  Mutation: {
    createInstructor: async (
      _parent: unknown,
      args: MutationCreateInstructorArgs,
      ctx: Context,
    ): Promise<InstructorModel> => {
      try {
        checkNotNull(args.instructor);
        if (
          args.instructor.training.careerInEducation === null ||
          args.instructor.training.technicalCareer === null
        ) {
          throw new Error("400, Fields cannot be null");
        }

        await checkAreas(
          args.instructor.areas,
          args.instructor.geographicalAvailability,
          areaCollection(ctx.db),
        );

        let newInstructor = {
          ...args.instructor,
          active: false,
          availability: setIdDays(
            args.instructor.availability,
          ) as Availability[],
        };

        if (args.instructor.corporateEmail) {
          const existsInstructor = await instructorCollection(ctx.db).findOne({
            corporateEmail: args.instructor.corporateEmail,
          });
          if (existsInstructor) {
            throw new Error("400, Corporate email must be unique");
          }
        }

        const groups = args.idGroups?.map((group) => new ObjectId(group));
        const existsGroups = await groupCollection(ctx.db)
          .find({
            _id: { $in: groups },
          })
          .toArray();

        if (existsGroups.length !== groups.length) {
          throw new Error("404, Groups not found");
        }

        await checkActiveCenter(existsGroups, centerCollection(ctx.db));

        newInstructor = {
          ...newInstructor,
          active: checkActiveGroups(existsGroups),
        };

        const idInstructor = await instructorCollection(ctx.db).insertOne({
          ...newInstructor,
        });

        await groupCollection(ctx.db).updateMany(
          { _id: { $in: groups } },
          { $push: { instructors: { $each: [idInstructor] } } },
        );

        instructors.Mutation.setStatusInstructor(
          _parent,
          { id: idInstructor.toString(), enrolled: args.instructor.enrolled },
          ctx,
        );

        return {
          _id: idInstructor,
          ...newInstructor,
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    editInstructor: async (
      _parent: unknown,
      args: MutationEditInstructorArgs,
      ctx: Context,
    ): Promise<InstructorModel> => {
      try {
        checkNotNull(args.instructor);
        let updateInstructor = { ...args.instructor } as Partial<
          InstructorModel
        >;

        if (args.instructor.corporateEmail) {
          const existsCorporateEmail = await instructorCollection(ctx.db)
            .findOne(
              {
                corporateEmail: args.instructor.corporateEmail,
              },
            );
          if (existsCorporateEmail) {
            throw new Error(
              "400, Corporate email must be unique",
            );
          }
        }

        if (args.instructor.availability) {
          const availability = setIdDays(
            args.instructor.availability,
          ) as Availability[];
          updateInstructor = { ...updateInstructor, availability };
        }

        if (args.instructor.areas && args.instructor.geographicalAvailability) {
          await checkAreas(
            args.instructor.areas,
            args.instructor.geographicalAvailability,
            areaCollection(ctx.db),
          );
        } else if (
          args.instructor.areas && !args.instructor.geographicalAvailability
        ) {
          const region = await instructorCollection(ctx.db).distinct(
            "geographicalAvailability",
            { _id: new ObjectId(args.id) },
          ) as Region[];
          await checkAreas(
            args.instructor.areas,
            region,
            areaCollection(ctx.db),
          );
        } else if (
          !args.instructor.areas && args.instructor.geographicalAvailability
        ) {
          const areas = await instructorCollection(ctx.db).distinct("areas", {
            _id: new ObjectId(args.id),
          }) as string[];
          await checkAreas(
            areas,
            args.instructor.geographicalAvailability,
            areaCollection(ctx.db),
          );
        }

        if (args.idGroups) {
          const groups = args.idGroups.map((group) => new ObjectId(group));
          const existsGroups = await groupCollection(ctx.db)
            .find({
              _id: { $in: groups },
            })
            .toArray();

          if (existsGroups.length !== groups.length) {
            throw new Error("404, Groups not found");
          }

          updateInstructor = {
            ...updateInstructor,
            active: existsGroups.length === 0
              ? false
              : checkActiveGroups(existsGroups, true),
          };

          const instructorGroupsIds: ObjectId[] = await groupCollection(ctx.db)
            .distinct("_id", {
              instructors: new ObjectId(args.id),
            });

          const groupsToRemove = instructorGroupsIds.filter(
            (group) => {
              if (group) return !groups.includes(group);
            },
          );
          const groupsToAdd = groups.filter(
            (group) => !instructorGroupsIds.includes(group),
          );
          //add instructor to new groups
          if (groupsToAdd.length > 0) {
            await groupCollection(ctx.db).updateMany(
              { _id: { $in: groupsToAdd } },
              { $push: { instructors: { $each: [new ObjectId(args.id)] } } },
            );
          }

          //remove instructor from old groups
          if (groupsToRemove.length > 0) {
            await groupCollection(ctx.db).updateMany(
              { _id: { $in: groupsToRemove } },
              { $pull: { instructors: new ObjectId(args.id) } },
            );
          }
          //set groups to inactive if they don't have instructors
          const groupsWithoutInstructors: ObjectId[] = await groupCollection(
            ctx.db,
          ).distinct("_id", {
            instructors: { $size: 0 },
          });

          await groupCollection(ctx.db).updateMany(
            { _id: { $in: groupsWithoutInstructors } },
            { $set: { active: false } },
          );

          //if students are not in other groups, set active to false
          const idStudents =
            (await getUniqueItems(groupCollection(ctx.db), "students", {
              active: false,
            })).map((student) => {
              return new ObjectId(student);
            });
          setActiveToFalse(
            idStudents,
            groupCollection(ctx.db),
            "students",
            studentCollection(ctx.db),
          );
        }

        const newInstructor = await instructorCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            update: { $set: updateInstructor },
            new: true,
          },
        );
        if (!newInstructor) {
          throw new Error("404, Instructor not found");
        }
        return newInstructor;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    deleteInstructor: async (
      _parent: unknown,
      args: MutationDeleteInstructorArgs,
      ctx: Context,
    ): Promise<InstructorModel> => {
      try {
        const instructor = await instructorCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            remove: true,
          },
        );
        if (!instructor) {
          throw new Error("404, Instructor not found");
        }

        //delete instructor from groups
        await groupCollection(ctx.db).updateMany(
          { instructors: new ObjectId(args.id) },
          { $pull: { instructors: new ObjectId(args.id) } },
        );

        //if there are no instructors in the group, set active to false
        await groupCollection(ctx.db).updateMany(
          { instructors: { $size: 0 } },
          { $set: { active: false } },
        );

        //if students are not in other groups, set active to false
        const idStudents: ObjectId[] =
          (await groupCollection(ctx.db).distinct("students", {
            active: false,
          })).flat();

        await setActiveToFalse(
          idStudents,
          groupCollection(ctx.db),
          "students",
          studentCollection(ctx.db),
        );

        //update courses
        let groups: GroupModel[] = [];
        await Promise.all(idStudents.map(async (id) => {
          const group = await groupCollection(ctx.db).find({ students: id })
            .toArray();
          groups = [...groups, ...group];
        }));
        updateCourses(
          groups,
          groupCollection(ctx.db),
          studentCollection(ctx.db),
        );

        return instructor;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    setStatusInstructor: async (
      _parent: unknown,
      args: MutationSetStatusInstructorArgs,
      ctx: Context,
    ): Promise<InstructorModel> => {
      try {
        checkNotNull(args);
        let instructor = await instructorCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            update: { $set: { enrolled: args.enrolled } },
            new: true,
          },
        );
        if (!instructor) {
          throw new Error("404, Instructor not found");
        }

        //check if center of groups are active
        const activeCenterGroups = await groupCollection(ctx.db).aggregate<
          GroupModel
        >([
          {
            $lookup: {
              from: "centers",
              localField: "center",
              foreignField: "_id",
              as: "center",
            },
          },
          {
            $match: {
              instructors: new ObjectId(args.id),
              "center.active": true,
            },
          },
        ]).toArray();

        if (activeCenterGroups.length > 0) {
          const idsActiveCenterGroups: ObjectId[] = activeCenterGroups.map(
            (group) => group._id,
          );

          if (!args.enrolled) {
            instructor = await instructorCollection(ctx.db).findAndModify(
              { _id: new ObjectId(args.id) },
              {
                update: { $set: { corporateEmail: null } },
                new: true,
              },
            );
            if (!instructor) {
              throw new Error("404, Instructor not found");
            }

            //if groups have all inactive instructors, set group active to false
            const updateGroups = await Promise.all(
              activeCenterGroups.map(async (item) => {
                const instructors = await instructorCollection(ctx.db)
                  .countDocuments({
                    _id: { $in: item.instructors },
                    enrolled: true,
                  });
                if (instructors === 0) {
                  return item._id;
                }
              }),
            ) as ObjectId[];

            await groupCollection(ctx.db).updateMany({
              _id: { $in: updateGroups },
            }, { $set: { active: false } });

            //if students are not in other groups, set active to false
            const idStudents =
              (await getUniqueItems(groupCollection(ctx.db), "students", {
                active: false,
              })).map((student) => {
                return new ObjectId(student);
              });
            setActiveToFalse(
              idStudents,
              groupCollection(ctx.db),
              "students",
              studentCollection(ctx.db),
            );
          } else {
            //set active to true in groups of instructor
            await groupCollection(ctx.db).updateMany({
              _id: { $in: idsActiveCenterGroups },
            }, { $set: { active: true } });

            //set active to true in students of this groups
            const idStudents =
              (await getUniqueItems(groupCollection(ctx.db), "students", {
                _id: { $in: idsActiveCenterGroups },
              })).map((student) => {
                return new ObjectId(student);
              });
            await studentCollection(ctx.db).updateMany({
              _id: { $in: idStudents },
            }, { $set: { active: true } });

            // set active instructor to true
            await instructorCollection(ctx.db).findAndModify(
              { _id: new ObjectId(args.id) },
              {
                update: { $set: { active: true } },
                new: true,
              },
            );
          }

          //update courses
          const groups = await groupCollection(ctx.db).find({
            _id: { $in: idsActiveCenterGroups },
          }).toArray();
          updateCourses(
            groups,
            groupCollection(ctx.db),
            studentCollection(ctx.db),
          );
        }
        return instructor;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
