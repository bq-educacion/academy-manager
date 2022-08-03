import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection } from "../models/GroupModel.ts";
import { QueryGetCenterArgs } from "../types.ts";

export const Query = {
  getCenters: async (
    _parent: unknown,
    _args: unknown,
    ctx: Context
  ): Promise<CenterModel[]> => {
    return await centerCollection(ctx.db).find().toArray();
  },

  getCenter: async (
    _parent: unknown,
    args: QueryGetCenterArgs,
    ctx: Context
  ): Promise<CenterModel> => {
    const center = await centerCollection(ctx.db).findById(args.id);
    if (!center) {
      throw new Error("404, Center not found");
    }
    return center;
  },
};

export const Center = {
  id: (parent: CenterModel): string => {
    return String(parent._id!);
  },
  groups: async (parent: CenterModel, _: unknown, ctx: Context) => {
    return await groupCollection(ctx.db)
      .find({ _id: { $in: parent.groups } })
      .toArray();
  },
};
