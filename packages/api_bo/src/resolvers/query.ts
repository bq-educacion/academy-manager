import { ObjectId } from "objectId";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";
import { instructorCollection, InstructorModel } from "../models/InstructorModel.ts";
import {
  QueryGetCenterArgs,
  QueryGetCentersArgs,
  QueryGetGroupArgs,
} from "../types.ts";
import { Filter } from "mongo";

export const Query = {
  getCenters: async (
    _parent: unknown,
    args: QueryGetCentersArgs,
    ctx: Context,
  ): Promise<CenterModel[]> => {
    const filter: Filter<CenterModel> = { "$or": [] };
    if (args.searchText) {
      filter["$or"] = [
        { name: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        { address: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        {
          population: { $regex: `.*${args.searchText || ""}.*`, $options: "i" },
        },
        { phone: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        { email: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        { type: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        {
          activityTypes: {
            $regex: `.*${args.searchText || ""}.*`,
            $options: "i",
          },
        },
        { modality: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        { nature: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        { course: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        { notes: { $regex: `.*${args.searchText || ""}.*`, $options: "i" } },
        {
          createdAt: { $regex: `.*${args.searchText || ""}.*`, $options: "i" },
        },
      ];
    }

    const sortFilter: {
      name?: number;
      languages?: number;
      population?: number;
      modality?: number;
      type?: number;
    } = {};

    if (args.order && args.orderFilter) {
      switch (args.orderFilter) {
        case "name":
          sortFilter.name = args.order;
          break;
        case "languages":
          sortFilter.languages = args.order;
          break;
        case "population":
          sortFilter.population = args.order;
          break;
        case "modality":
          sortFilter.modality = args.order;
          break;
        case "type":
          sortFilter.type = args.order;
          break;
        default: // default nameAZ
          sortFilter.name = 1;
          break;
      }
    } else {
      sortFilter.name = 1;
    }

    return await centerCollection(ctx.db).aggregate([{ $match: filter }, {
      $sort: sortFilter,
    }]).toArray();
  },

  getCenter: async (
    _parent: unknown,
    args: QueryGetCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    const center = await centerCollection(ctx.db).findOne({
      _id: new ObjectId(args.id),
    });
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
    const group = await groupCollection(ctx.db).findById(args.id);
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
  groups: async (parent: CenterModel, _: unknown, ctx: Context):Promise<GroupModel[]> => {
    return await groupCollection(ctx.db)
      .find({ center: parent._id })
      .toArray();
  },
};

export const Group = {
  id: (parent: GroupModel): string => {
    return String(parent._id!);
  },
  center: async (parent: GroupModel, _: unknown, ctx: Context):Promise<CenterModel|undefined> => {
    return await centerCollection(ctx.db).findOne({ _id: parent.center });
  },
  students: async (parent: GroupModel, _: unknown, ctx: Context):Promise<StudentModel[]> => {
    return await studentCollection(ctx.db)
      .find({
        _id: { $in: parent.students },
      })
      .toArray();
  },
  instructors: async (parent: GroupModel, _: unknown, ctx: Context):Promise<InstructorModel[]> => {
    return await instructorCollection(ctx.db)
      .find({
        _id: { $in: parent.instructors },
      })
      .toArray();
  },
};
