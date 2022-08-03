import {
  ContactCenter,
  MutationAddContactCenterArgs,
  MutationCreateCenterArgs,
  MutationEditCenterArgs,
  MutationEditContactsCenterArgs,
} from "../types.ts";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { ObjectId } from "objectId";

export const Mutation = {
  createCenter: async (
    _parent: unknown,
    args: MutationCreateCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    const center = await centerCollection(ctx.db).findOne({ name: args.name });
    if (center) throw new Error("404, Center already exists");
    const createdAt = new Date().toLocaleDateString();
    const idCenter = await centerCollection(ctx.db).insertOne({
      ...args,
      contacts: [],
      groups: [],
      createdAt: createdAt,
    });
    return {
      _id: idCenter,
      contacts: [],
      groups: [],
      createdAt: createdAt,
      ...args,
    };
  },

  addContactCenter: async (
    _parent: unknown,
    args: MutationAddContactCenterArgs,
    ctx: Context,
  ): Promise<ContactCenter> => {
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

    const newContact: ContactCenter = { ...args };

    await centerCollection(ctx.db).updateOne({
      _id: new ObjectId(args.idCenter),
    }, { $push: { contacts: { $each: [newContact] } } });
    return newContact;
  },

  editCenter: async (
    _parent: unknown,
    args: MutationEditCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    const center = await centerCollection(ctx.db).findOne({
      _id: new ObjectId(args.id),
    });
    if (!center) {
      throw new Error("404, Center not found");
    }

    await centerCollection(ctx.db).updateOne({ _id: new ObjectId(args.id) }, {
      $set: { ...args },
    });
    return { _id: center._id, ...center, ...args };
  },

  editContactsCenter: async (
    _parent: unknown,
    args: MutationEditContactsCenterArgs,
    ctx: Context,
  ): Promise<ContactCenter> => {
    const contactsCenter = await centerCollection(ctx.db).find(
      {
        _id: new ObjectId(args.idCenter),
        contacts: { $elemMatch: { email: args.originEmail } },
      },
      { projection: { _id: 0, contacts: 1 } },
    ).toArray();

    if (contactsCenter.length === 0) {
      throw new Error("404, Center or contact not found");
    }

    let contactUpdate: ContactCenter = {};
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
    }) as ContactCenter[];

    await centerCollection(ctx.db).updateOne({
      _id: new ObjectId(args.idCenter),
    }, { $set: { contacts: updateContacts } });

    return contactUpdate;
  },
};
