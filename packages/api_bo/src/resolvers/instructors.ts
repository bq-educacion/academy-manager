import { Context } from "../app.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import {
  instructorCollection,
  InstructorModel,
} from "../models/InstructorModel.ts";
import {
  PaginatedInstructors,
  QueryCheckCorporateEmailArgs,
  QueryGetInstructorArgs,
  QueryGetInstructorsArgs,
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
      if (args.searchText) {
        filter["$or"] = [
          { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            corporateEmail: { $regex: `.*${args.searchText}.*`, $options: "i" },
          },
          {
            personalEmail: { $regex: `.*${args.searchText}.*`, $options: "i" },
          },
          { phone: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { state: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { training: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            previousExperience: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          { knowledge: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { urlCV: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            materialsExperience: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            platformEducationExperience: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          { languages: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            "availability.day": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            "availability.hours": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            summerAvailability: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          { vehicle: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            geographicalAvailability: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          { areas: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            "centersName.name": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            "groupsId.id_group": {
              $regex: `.*${args.searchText}.*`,
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
        sortFilter = { name: 1 };
      }

      return paginatedFilters(
        instructorCollection(ctx.db),
        filter,
        "instructors",
        sortFilter,
        args.page,
        args.pageSize,
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
        checkNotNull(args);
        if (args.corporateEmail) {
          const existsInstructor = await instructorCollection(ctx.db).findOne({
            corporateEmail: args.corporateEmail,
          });
          if (existsInstructor) {
            throw new Error("400, Corporate email must be unique");
          }
        }

        const groups = args.groups?.map((group) => new ObjectId(group));
        const existsGroups = await groupCollection(ctx.db)
          .find({
            _id: { $in: groups },
          })
          .toArray();

        if (existsGroups.length !== groups.length) {
          throw new Error("404, Groups not found");
        }

        const availability = setIdDays(args.availability) as Availability[];

        const newInstructor = {
          ...args,
          availability,
        };
        const idInstructor = await instructorCollection(ctx.db).insertOne({
          ...newInstructor,
        });

        await groupCollection(ctx.db).updateMany(
          { _id: { $in: groups } },
          { $push: { instructors: { $each: [idInstructor] } } },
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
        checkNotNull(args);
        let updateInstructor = { ...args } as Partial<InstructorModel>;

        if (args.corporateEmail) {
          const existsCorporateEmail = await instructorCollection(ctx.db)
            .findOne(
              {
                corporateEmail: args.corporateEmail,
              },
            );
          if (existsCorporateEmail) {
            throw new Error(
              "400, Corporate email must be unique",
            );
          }
        }

        if (args.availability) {
          const availability = setIdDays(args.availability) as Availability[];
          updateInstructor = { ...updateInstructor, availability };
        }

        if (args.groups) {
          const groups = args.groups.map((group) => new ObjectId(group));
          const existsGroups = await groupCollection(ctx.db)
            .find({
              _id: { $in: groups },
            })
            .toArray();

          if (existsGroups.length !== groups.length) {
            throw new Error("404, Groups not found");
          }

          const instructorGroups = await groupCollection(ctx.db)
            .find({
              instructors: new ObjectId(args.id),
            }).toArray();

          const instructorGroupsIds = instructorGroups.map((group) =>
            group._id
          );
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
  },
};