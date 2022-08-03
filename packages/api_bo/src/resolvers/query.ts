import { ObjectId } from "objectId";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection } from "../models/StudentModel.ts";
import { instructorCollection } from "../models/InstructorModel.ts";
import { QueryGetCenterArgs, QueryGetGroupArgs } from "../types.ts";

export const Query = {
  getCenters: async (
    _parent: unknown,
    _args: unknown,
    ctx: Context,
  ): Promise<CenterModel[]> => {
    return await centerCollection(ctx.db).find().toArray();
  },

  getCenter: async (
    _parent: unknown,
    args: QueryGetCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    const center = await centerCollection(ctx.db).findById(args.id);
    if (!center) {
      throw new Error("404, Center not found");
    }
    return center;
  },

  getGroups: async (
    _parent: unknown,
    _args: unknown,
    ctx: Context,
  ): Promise<GroupModel[]> => {
    return await groupCollection(ctx.db).find().toArray();
  },

  getGroup: async (
    _parent: unknown,
    args: QueryGetGroupArgs,
    ctx: Context,
  ): Promise<GroupModel> => {
    const group = await groupCollection(ctx.db).findOne({
      _id: new ObjectId(args.id),
    });
    if (!group) {
      throw new Error("404, Group not found");
    }
    return group;
  },
};

export const Center = {
  id: (parent: CenterModel): string => {
    return String(parent._id!);
  },
  groups: async (parent: CenterModel, _: unknown, ctx: Context) => {
    return await groupCollection(ctx.db).find({ _id: { $in: parent.groups } })
      .toArray();
  },
};

export const Group = {
  id: (parent: GroupModel): string => {
    return String(parent._id!);
  },
  center: async (parent: GroupModel, _: unknown, ctx: Context) => {
    return await centerCollection(ctx.db).findOne({ _id: parent.center });
  },
  students: async (parent: GroupModel, _: unknown, ctx: Context) => {
    return await studentCollection(ctx.db).find({
      _id: { $in: parent.students },
    }).toArray();
  },
  instructors: async (parent: GroupModel, _: unknown, ctx: Context) => {
    return await instructorCollection(ctx.db).find({
      _id: { $in: parent.instructors },
    }).toArray();
  },
};
