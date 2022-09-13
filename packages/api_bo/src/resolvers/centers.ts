import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import {
  MutationDeleteCenterArgs,
  MutationSetActiveCenterArgs,
  PaginatedCenters,
  QueryGetCenterArgs,
  QueryGetCentersArgs,
} from "../types.ts";
import { Filter } from "mongo";
import { paginatedFilters } from "../lib/paginatedFilters.ts";
import {
  CenterContact,
  MutationAddCenterContactArgs,
  MutationCreateCenterArgs,
  MutationEditCenterArgs,
  MutationEditCenterContactArgs,
} from "../types.ts";
import { ObjectId } from "objectId";
import { checkNotNull } from "../lib/checkNotNull.ts";
import { studentCollection } from "../models/StudentModel.ts";
import { instructorCollection } from "../models/InstructorModel.ts";
import { setActiveToFalse } from "../lib/setActiveToFalse.ts";
import { getUniqueItems } from "../lib/getUniqueItems.ts";

export const centers = {
  Center: {
    id: (parent: CenterModel): string => {
      return String(parent?._id!);
    },
    groups: async (
      parent: CenterModel,
      _: unknown,
      ctx: Context,
    ): Promise<GroupModel[]> => {
      return await groupCollection(ctx.db).find({ center: parent?._id })
        .toArray();
    },
  },

  Query: {
    getCenters: (
      _parent: unknown,
      args: QueryGetCentersArgs,
      ctx: Context,
    ): Promise<PaginatedCenters> => {
      const filter: Filter<PaginatedCenters> = { $or: [{}] };
      if (args.searchText) {
        filter["$or"] = [
          { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { address: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            city: { $regex: `.*${args.searchText}.*`, $options: "i" },
          },
          { phone: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { email: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { type: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { nature: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            createdAt: { $regex: `.*${args.searchText}.*`, $options: "i" },
          },
          {
            languages: { $regex: `.*${args.searchText}.*`, $options: "i" },
          },
          {
            "contacts.name": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            "groupsName.name": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
        ];
      }

      let sortFilter = {};
      const OrderFilter = {
        name: "name",
        nature: "nature",
        languages: "languages",
        city: "city",
        type: "type",
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
        centerCollection(ctx.db),
        filter,
        "centers",
        sortFilter,
        args.page,
        args.pageSize,
      ) as Promise<PaginatedCenters>;
    },

    getCenter: async (
      _parent: unknown,
      args: QueryGetCenterArgs,
      ctx: Context,
    ): Promise<
      { center: CenterModel; totalGroups: number; totalStudents: number }
    > => {
      try {
        const center = await centerCollection(ctx.db).findById(args.id);
        if (!center) {
          throw new Error("404, Center not found");
        }

        const [totalGroups, students] = await Promise.all([
          groupCollection(ctx.db).countDocuments({
            center: new ObjectId(args.id),
          }),
          getUniqueItems(groupCollection(ctx.db), "students", {
            center: new ObjectId(args.id),
          }),
        ]);

        return {
          center,
          totalGroups,
          totalStudents: students.length,
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },

  Mutation: {
    createCenter: async (
      _parent: unknown,
      args: MutationCreateCenterArgs,
      ctx: Context,
    ): Promise<CenterModel> => {
      try {
        checkNotNull(args);
        if (args.email) {
          const email = await centerCollection(ctx.db).findOne({
            email: args.email,
          });
          if (email) {
            throw new Error("400, Email must be unique");
          }
        }

        const createdAt = new Date().toLocaleDateString("en-GB");

        let center = {
          ...args,
          createdAt,
          active: true,
        };

        if (args.contacts) {
          center = {
            ...center,
            contacts: args.contacts?.map((c) => ({ ...c })),
          };
        }
        const idCenter = await centerCollection(ctx.db).insertOne({
          ...center,
        }) as ObjectId;

        return {
          _id: idCenter,
          ...center,
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    addCenterContact: async (
      _parent: unknown,
      args: MutationAddCenterContactArgs,
      ctx: Context,
    ): Promise<CenterContact> => {
      try {
        checkNotNull(args);
        const newCenterContact = await centerCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.idCenter) },
          {
            update: { $push: { contacts: { $each: [{ ...args }] } } },
            new: true,
          },
        );
        if (!newCenterContact) {
          throw new Error("404, Center not found");
        }
        return {
          ...args,
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    editCenter: async (
      _parent: unknown,
      args: MutationEditCenterArgs,
      ctx: Context,
    ): Promise<CenterModel> => {
      try {
        checkNotNull(args);
        // TODO(@pruizj): update to findOneAndUpdate, findAndModify will be deprecated
        const newCenter = await centerCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            update: { $set: { ...(args as Partial<CenterModel>) } },
            new: true,
          },
        );
        if (!newCenter) {
          throw new Error("404, Center not found");
        }
        return newCenter;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    editCenterContact: async (
      _parent: unknown,
      args: MutationEditCenterContactArgs,
      ctx: Context,
    ): Promise<CenterContact> => {
      try {
        checkNotNull(args);
        const contactsCenter = await centerCollection(ctx.db)
          .find(
            {
              _id: new ObjectId(args.idCenter),
              contacts: { $elemMatch: { email: args.originEmail } },
            },
            { projection: { _id: 0, contacts: 1 } },
          )
          .toArray();

        if (contactsCenter.length === 0) {
          throw new Error("404, Center or contact not found");
        }

        let contactUpdate: CenterContact = {
          email: "",
          name: "",
          phone: "",
        };

        const updateContacts = contactsCenter[0]?.contacts?.map((contact) => {
          if (contact.email === args.originEmail) {
            contactUpdate = {
              name: args.name || contact.name,
              email: args.email || contact.email,
              phone: args.phone || contact.phone,
            };
            return contactUpdate;
          }
          return contact;
        }) as CenterContact[];

        await centerCollection(ctx.db).updateOne(
          {
            _id: new ObjectId(args.idCenter),
          },
          { $set: { contacts: updateContacts } },
        );

        return contactUpdate;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    deleteCenter: async (
      _parent: unknown,
      args: MutationDeleteCenterArgs,
      ctx: Context,
    ): Promise<CenterModel> => {
      try {
        const center = await centerCollection(ctx.db).findById(args.id);
        if (!center) {
          throw new Error("404, Center not found");
        }

        const idStudents: ObjectId[] =
          (await groupCollection(ctx.db).distinct("students", {
            center: new ObjectId(args.id),
          })).flat();

        const idInstructors: ObjectId[] =
          (await groupCollection(ctx.db).distinct("instructors", {
            center: new ObjectId(args.id),
          })).flat();

        await groupCollection(ctx.db).deleteMany({
          center: new ObjectId(args.id),
        });

        await centerCollection(ctx.db).deleteOne({
          _id: new ObjectId(args.id),
        });

        // if students are not in other groups, active = false
        setActiveToFalse(
          idStudents,
          groupCollection(ctx.db),
          "students",
          studentCollection(ctx.db),
        );

        // if instructors are not in other groups, active = false
        setActiveToFalse(
          idInstructors,
          groupCollection(ctx.db),
          "instructors",
          instructorCollection(ctx.db),
        );

        return center;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    setActiveCenter: async (
      _parent: unknown,
      args: MutationSetActiveCenterArgs,
      ctx: Context,
    ): Promise<CenterModel> => {
      checkNotNull(args);
      try {
        const newCenter = await centerCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            update: { $set: { active: args.active } },
            new: true,
          },
        );
        if (!newCenter) {
          throw new Error("404, Center not found");
        }

        const groups = await groupCollection(ctx.db).find({
          center: new ObjectId(args.id),
        }).toArray();
        const idGroups = groups.map((group) => group._id);
        await groupCollection(ctx.db).updateMany(
          { _id: { $in: idGroups } },
          { $set: { active: args.active } },
        );

        // if there are no instructors in the group, center = null
        if (!args.active) {
          const deleteCenterGroups = groups.map((group) => {
            if (group.instructors.length === 0) {
              if (group._id) return new ObjectId(group._id);
            }
          }) as ObjectId[];

          await groupCollection(ctx.db).updateMany(
            { _id: { $in: deleteCenterGroups } },
            { $set: { center: null } },
          );
        }

        const idStudents: ObjectId[] = groups.map((group) => group.students)
          .flat();
        if (!args.active) {
          // if students are not in other groups, active = false
          setActiveToFalse(
            idStudents,
            groupCollection(ctx.db),
            "students",
            studentCollection(ctx.db),
          );
        } else {
          if (idStudents.length > 0) {
            await studentCollection(ctx.db).updateMany(
              { _id: { $in: idStudents } },
              { $set: { active: true } },
            );
          }
        }

        const idInstructors: ObjectId[] = groups.map((group) =>
          group.instructors
        ).flat();
        if (!args.active) {
          // if instructors are not in other groups, active = false
          setActiveToFalse(
            idInstructors,
            groupCollection(ctx.db),
            "instructors",
            instructorCollection(ctx.db),
          );
        } else {
          if (idInstructors.length > 0) {
            await instructorCollection(ctx.db).updateMany(
              { _id: { $in: idInstructors } },
              { $set: { active: true } },
            );
          }
        }

        return newCenter;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
