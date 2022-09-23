import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import {
  MutationDeleteCenterArgs,
  MutationSetActiveCenterArgs,
  PaginatedCenters,
  QueryAdvancedGetCentersArgs,
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
import { mongoSearchRegex } from "../lib/mongoSearchRegex.ts";
import { advancedMongoSearchRegex } from "../lib/mongoSearchRegex.ts";
import { sortFilter } from "../lib/paginatedFilters.ts";

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
      if (args.centers.searchText) {
        filter["$or"] = [
          { name: mongoSearchRegex(args.centers.searchText) },
          { address: mongoSearchRegex(args.centers.searchText) },
          { city: mongoSearchRegex(args.centers.searchText) },
          { phone: mongoSearchRegex(args.centers.searchText) },
          { email: mongoSearchRegex(args.centers.searchText) },
          { type: mongoSearchRegex(args.centers.searchText) },
          { nature: mongoSearchRegex(args.centers.searchText) },
          { notes: mongoSearchRegex(args.centers.searchText) },
          { createdAt: mongoSearchRegex(args.centers.searchText) },
          { languages: mongoSearchRegex(args.centers.searchText) },
          { "contacts.name": mongoSearchRegex(args.centers.searchText) },
          { "groupsName.name": mongoSearchRegex(args.centers.searchText) },
        ];
      }

      const sort = sortFilter(
        args.centers.orderFilter,
        args.centers.order,
        "centers",
        "name",
      );

      return paginatedFilters(
        centerCollection(ctx.db),
        filter,
        "centers",
        sort,
        args.centers.page,
        args.centers.pageSize,
      ) as Promise<PaginatedCenters>;
    },

    advancedGetCenters: (
      _parent: unknown,
      args: QueryAdvancedGetCentersArgs,
      ctx: Context,
    ): Promise<PaginatedCenters> => {
      const filter: Filter<PaginatedCenters> = { $or: [{}] };
      if (args.centers.searchText) {
        filter["$or"] = [{}];
        const data = [];
        if (args.centers.searchText.name) {
          data.push(
            advancedMongoSearchRegex("name", args.centers.searchText.name),
          );
        }
        if (args.centers.searchText.languages) {
          data.push(
            advancedMongoSearchRegex(
              "languages",
              args.centers.searchText.languages,
            ),
          );
        }
        if (args.centers.searchText.city) {
          data.push(
            advancedMongoSearchRegex("city", args.centers.searchText.city),
          );
        }
        if (args.centers.searchText.type) {
          data.push(
            advancedMongoSearchRegex("type", args.centers.searchText.type),
          );
        }
        if (args.centers.searchText.nature) {
          data.push(
            advancedMongoSearchRegex("nature", args.centers.searchText.nature),
          );
        }
        filter["$or"] = data;
      }

      const sort = sortFilter(
        args.centers.orderFilter,
        args.centers.order,
        "centers",
        "name",
      );

      return paginatedFilters(
        centerCollection(ctx.db),
        filter,
        "centers",
        sort,
        args.centers.page,
        args.centers.pageSize,
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
        checkNotNull(args.center);
        if (args.center.email) {
          const email = await centerCollection(ctx.db).findOne({
            email: args.center.email,
          });
          if (email) {
            throw new Error("400, Email must be unique");
          }
        }

        const createdAt = new Date().toLocaleDateString("en-GB");

        let center = {
          ...args.center,
          createdAt,
          active: true,
        };

        if (args.center.contacts) {
          center = {
            ...center,
            contacts: args.center.contacts.map((c) => ({ ...c })),
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
        checkNotNull(args.contact);
        const newCenterContact = await centerCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.idCenter) },
          {
            update: { $push: { contacts: { $each: [{ ...args.contact }] } } },
            new: true,
          },
        );
        if (!newCenterContact) {
          throw new Error("404, Center not found");
        }
        return {
          ...args.contact,
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
        checkNotNull(args.center);
        // TODO(@pruizj): update to findOneAndUpdate, findAndModify will be deprecated
        const newCenter = await centerCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            update: { $set: { ...(args.center as Partial<CenterModel>) } },
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
        checkNotNull(args.contact);
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
              name: args.contact.name || contact.name,
              email: args.contact.email || contact.email,
              phone: args.contact.phone || contact.phone,
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
