import { ObjectId } from "objectId";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";
import {
  instructorCollection,
  InstructorModel,
} from "../models/InstructorModel.ts";
import {
  PaginatedCenters,
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
  ): Promise<PaginatedCenters> => {
    const page = args.page || 1;
    const pageSize = args.pageSize ||
      (await centerCollection(ctx.db).countDocuments());

    const filter: Filter<PaginatedCenters> = { $or: [] };
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

    const agr = await centerCollection(ctx.db)
      .aggregate<PaginatedCenters>([
        { $match: filter },
        {
          $facet: {
            stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
            stage2: [
              { $sort: sortFilter },
              { $skip: pageSize * (page - 1) },
              { $limit: pageSize === 0 ? 1 : pageSize },
              // { $addFields: { id: "$_id" } },
              // { $unset: "_id" }
            ],
          },
        },
        { $unwind: "$stage1" },
        {
          $project: {
            totalNumber: "$stage1.count",
            page: { $floor: page },
            pageSize: { $floor: pageSize },
            totalPages: {
              $ceil: { $divide: ["$stage1.count", pageSize] },
            },
            data: "$stage2",
          },
        },
      ])
      .toArray();

    if (agr.length === 0) {
      return {
        totalNumber: 0,
        page: 1,
        pageSize: 0,
        totalPages: 1,
        data: [],
      };
    }

    return agr[0];
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
  groups: async (
    parent: CenterModel,
    _: unknown,
    ctx: Context,
  ): Promise<GroupModel[]> => {
<<<<<<< HEAD
    return await groupCollection(ctx.db)
      .find({ center: parent._id })
      .toArray();
=======
    return await groupCollection(ctx.db).find({ center: parent._id }).toArray();
>>>>>>> 37757e6652371b6f8da513d0940a89ead1fe5e64
  },
};

export const Group = {
  id: (parent: GroupModel): string => {
    return String(parent._id!);
  },
  center: async (
    parent: GroupModel,
    _: unknown,
    ctx: Context,
  ): Promise<CenterModel | undefined> => {
    return await centerCollection(ctx.db).findOne({ _id: parent.center });
  },
  students: async (
    parent: GroupModel,
    _: unknown,
    ctx: Context,
  ): Promise<StudentModel[]> => {
    return await studentCollection(ctx.db)
      .find({
        _id: { $in: parent.students },
      })
      .toArray();
  },
  instructors: async (
    parent: GroupModel,
    _: unknown,
    ctx: Context,
  ): Promise<InstructorModel[]> => {
    return await instructorCollection(ctx.db)
      .find({
        _id: { $in: parent.instructors },
      })
      .toArray();
  },
};
