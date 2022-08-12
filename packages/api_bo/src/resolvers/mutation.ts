import {
  CenterContact,
  MutationAddCenterContactArgs,
  MutationCreateCenterArgs,
  MutationCreateGroupArgs,
  MutationEditCenterArgs,
  MutationEditCenterContactsArgs,
} from "../types.ts";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { ObjectId } from "objectId";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { instructorCollection } from "../models/InstructorModel.ts";

export const Mutation = {
  createCenter: async (
    _parent: unknown,
    args: MutationCreateCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    try {
      const createdAt = new Date().toLocaleDateString("en-GB");
      const idCenter = await centerCollection(ctx.db).insertOne({
        ...args,
        notes: args.notes || "",
        contacts: [],
        createdAt,
      });
      return {
        _id: idCenter,
        contacts: [],
        createdAt: createdAt,
        ...args,
      };
    } catch (error) {
      throw new Error("500 ", error);
    }
  },

  addCenterContact: async (
    _parent: unknown,
    args: MutationAddCenterContactArgs,
    ctx: Context,
  ): Promise<CenterContact> => {
    try {
      const center = await centerCollection(ctx.db).findOne({
        _id: new ObjectId(args.idCenter),
      });
      if (!center) {
        throw new Error("404, Center not found");
      }

      const contact = await centerCollection(ctx.db).findOne({
        _id: center._id,
        contacts: { $elemMatch: { email: args.email } },
      });
      if (contact) throw new Error("404, Contact already exists");

      const newContact: CenterContact = { ...args };

      await centerCollection(ctx.db).updateOne(
        {
          _id: new ObjectId(args.idCenter),
        },
        { $push: { contacts: { $each: [newContact] } } },
      );
      return newContact;
    } catch (error) {
      throw new Error("500 ", error);
    }
  },

  editCenter: async (
    _parent: unknown,
    args: MutationEditCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
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
  },

  editCenterContacts: async (
    _parent: unknown,
    args: MutationEditCenterContactsArgs,
    ctx: Context,
  ): Promise<CenterContact> => {
    try {
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
        surname: "",
      };

      const updateContacts = contactsCenter[0].contacts?.map((contact) => {
        if (contact.email === args.originEmail) {
          contactUpdate = {
            name: args.name || contact.name,
            surname: args.surname || contact.surname,
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
      throw new Error("500 ", error);
    }
  },

  createGroup: async (
    _parent: unknown,
    args: MutationCreateGroupArgs,
    ctx: Context,
  ): Promise<GroupModel> => {
    try {
      const group = await groupCollection(ctx.db).findOne({
        center: new ObjectId(args.idCenter),
        name: { $regex: args.name, $options: "i" },
      });
      if (group) throw new Error("404, Group already exists");

      const createdAt = new Date().toLocaleDateString("en-GB");

      const ids = await groupCollection(ctx.db)
        .find({
          center: new ObjectId(args.idCenter),
        })
        .sort({ id_group: 1 })
        .toArray();
      let id_group = 1;
      if (ids.length > 0) {
        id_group = (ids[0].id_group as number) + 1;
      }

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

      const idGroup = await groupCollection(ctx.db).insertOne({
        ...args,
        id_group,
        center,
        instructors: instructors || [],
        createdAt,
        students: [],
      });

      return {
        _id: idGroup,
        ...args,
        id_group: id_group,
        center: center,
        students: [],
        instructors: instructors || [],
        createdAt: createdAt,
      };
    } catch (error) {
      throw new Error("500 " + error);
    }
  },
};
