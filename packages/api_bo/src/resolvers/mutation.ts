import {ContactCenter,MutationAddContactCenterArgs,MutationCreateCenterArgs,} from "../types.ts";
import { Context } from "../app.ts";
import { centerCollection } from "../models/CenterModel.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.3/mod.ts";

export const Mutation = {
  createCenter: async (_parent: unknown, args: MutationCreateCenterArgs, ctx: Context) => {
    const center = await centerCollection(ctx.db).findOne({ name: args.name });
    if (center) throw new Error("Center already exists");
    const createdAt = new Date().toLocaleDateString();
    const idCenter = await centerCollection(ctx.db).insertOne({...args, contacts: [], groups: [], createdAt: createdAt});
    return {_id:idCenter,contacts:[],groups:[], createdAt:createdAt,...args};
  },

  addContactCenter: async (_parent: unknown, args: MutationAddContactCenterArgs, ctx: Context) => {
    const center = await centerCollection(ctx.db).findOne({_id: new ObjectId(args.idCenter)});
    if (!center) {
      throw new Error("Center not found");
    }

    const contact = await centerCollection(ctx.db).findOne({_id:center._id, contacts: { $elemMatch: { email: args.email }}});
    if (contact) throw new Error("Contact already exists");

    const newContact: ContactCenter = {...args};

    await centerCollection(ctx.db).updateOne({ _id: new ObjectId(args.idCenter) }, {$push: { contacts: { $each: [newContact] }}});
    return newContact;
  },
};
