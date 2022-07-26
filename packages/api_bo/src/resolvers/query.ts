import { ObjectId } from "https://deno.land/x/web_bson@v0.2.3/mod.ts";
import { Context } from "../app.ts";
import { CenterModel} from "../models/models.ts";

export const Query = {
  getCenters: async (_parent: unknown, _args:unknown, ctx: Context) => {
    const db = ctx.db;
    const centerCollection = db.collection<CenterModel>("centers");
    const centers = await centerCollection.find().toArray();
    return centers;
  },
  getCenter: async (_parent:unknown,args:{id:string},ctx:Context) => {
    const db = ctx.db;
    const centerCollection = db.collection<CenterModel>("centers");
    const center = await centerCollection.findOne({_id: new ObjectId(args.id)});
    if(!center){
      throw new Error("Center not found");
    }
    return center;
  },
};

export const Center = {
  id: (parent: CenterModel): string => {
    return String(parent._id!);
  },
};


