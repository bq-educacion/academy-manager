import {
  ContactCenter,
  ModalityCenter,
  NatureCenter,
  TypeActivities,
  TypeCenter,
} from "../types.ts";
import { Context } from "../app.ts";
import { CenterModel } from "../models/models.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.3/mod.ts";

export const Mutation = {
  createCenter: async (
    _parent: unknown,
    args: {
      name: string;
      address: string;
      population: string;
      phone: string;
      email: string;
      type: TypeCenter;
      typeActivities: TypeActivities;
      modality: ModalityCenter;
      nature: NatureCenter;
      course: string;
      languages: string[];
      notes: string;
    },
    ctx: Context,
  ): Promise<string> => {
    const db = ctx.db;
    const centerCollection = db.collection<CenterModel>("centers");

    const center = await centerCollection.findOne({ name: args.name });
    if (center) throw new Error("Center already exists");
    await centerCollection.insertOne({
      name: args.name,
      address: args.address,
      population: args.population,
      phone: args.phone,
      email: args.email,
      type: args.type,
      typeActivities: args.typeActivities,
      modality: args.modality,
      nature: args.nature,
      course: args.course,
      languages: args.languages,
      notes: args.notes,
      contacts: [],
      groups: [],
      createdAt: new Date().toLocaleDateString(),
    });

    return "Center created";
  },

  addContactCenter: async (
    _parent: unknown,
    args: {
      idCenter: string;
      name: string;
      surname: string;
      email: string;
      phone: string;
    },
    ctx: Context,
  ): Promise<string> => {
    const db = ctx.db;
    const centerCollection = db.collection<CenterModel>("centers");

    const center = await centerCollection.findOne({
      _id: new ObjectId(args.idCenter),
    });
    if (!center) {
      throw new Error("Center not found");
    }

    const contact = await centerCollection.findOne({
      contacts: { $elemMatch: { name: args.name } },
    });
    if (contact) throw new Error("Contact already exists");

    const newContact: ContactCenter = {
      name: args.name,
      surname: args.surname,
      email: args.email,
      phone: args.phone,
    };
    await centerCollection.updateOne({ _id: new ObjectId(args.idCenter) }, {
      $push: { contacts: { $each: [newContact] } },
    });
    return "Contact added";
  },
};
