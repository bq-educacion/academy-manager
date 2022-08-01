import { ObjectId } from "objectId";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection } from "../models/GroupModel.ts";
import { QueryGetCenterArgs } from "../types.ts";

export const Query = {
  getCenters: async (_parent: unknown, _args: unknown, ctx: Context) => {
    return await centerCollection(ctx.db).find().toArray();
  },

  getCenter: async (
    _parent: unknown,
    args: QueryGetCenterArgs,
    ctx: Context,
  ) => {
    const center = await centerCollection(ctx.db).findOne({
      _id: new ObjectId(args.id),
    });
    if (!center) {
      throw new Error("Center not found");
    }
    return center;
  },
};

export const Center = {
  id: (parent: CenterModel): string => {
    return String(parent._id!);
  },
  groups: async (parent: CenterModel, ctx: Context) => {
    return await Promise.all(parent.groups.map(async (group: ObjectId) => {
      return await groupCollection(ctx.db).findOne({ _id: group });
    }));
  },
};
