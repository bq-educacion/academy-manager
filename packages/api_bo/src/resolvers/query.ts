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
  PaginatedGroups,
  QueryGetCenterArgs,
  QueryGetCentersArgs,
  QueryGetGroupArgs,
  QueryGetGroupsArgs,
} from "../types.ts";
import { Filter } from "mongo";
import { paginatedFilters } from "../lib/paginatedFilters.ts";

export const Query = {
  getCenters: (
    _parent: unknown,
    args: QueryGetCentersArgs,
    ctx: Context,
  ): Promise<PaginatedCenters> => {
    const filter: Filter<PaginatedCenters> = { $or: [{}] };
    if (args.searchText) {
      filter["$or"] = [
        { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { address: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          population: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        { phone: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { email: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { type: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          activityTypes: {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        { modality: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { nature: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { course: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          createdAt: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          languages: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          "contacts.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "groupsName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
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

    if (args.orderFilter && args.order) {
      if (args.order !== 1 && args.order !== -1) {
        throw new Error("400, wrong order (1 or -1)");
      }
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
    } else if (args.orderFilter && !args.order) {
      throw new Error("400, order is required");
    } else if (!args.orderFilter && args.order) {
      throw new Error("400, orderFilter is required");
    } else {
      sortFilter.name = 1;
    }

    return paginatedFilters(
      centerCollection(ctx.db),
      filter,
      "centers",
      sortFilter,
      args.page,
      args.pageSize,
    ) as Promise<PaginatedCenters>;
  },

  getCenter: async (
    _parent: unknown,
    args: QueryGetCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    try{
    const center = await centerCollection(ctx.db).findOne({
      _id: new ObjectId(args.id),
    });
    if (!center) {
      throw new Error("404, Center not found");
    }
    return center;
  } catch (error) {
    throw new Error("500",error);
  }
  },

  getGroups: (
    _parent: unknown,
    args: QueryGetGroupsArgs,
    ctx: Context,
  ): Promise<PaginatedGroups> => {
    const filter: Filter<PaginatedGroups> = { $or: [{}] };
    if (args.searchText) {
      filter["$or"] = [
        { id_group: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { type: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { course: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          createdAt: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          "timetable.day": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "timetable.start": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "timetable.end": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          "centersName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "instructorsName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "studentsName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
      ];
    }

    let sortFilter = {};

    if (args.orderFilter && args.order) {
      if (args.order !== 1 && args.order !== -1) {
        throw new Error("400, wrong order (1 or -1)");
      }
      switch (args.orderFilter) {
        case "id_group":
          sortFilter = { id_group: args.order };
          break;
        case "center":
          sortFilter = { "centersName.name": args.order };
          break;
        case "instructors":
          sortFilter = { "instructorsName.name": args.order };
          break;
        case "start":
          sortFilter = { "timetable.start": args.order };
          break;
        case "end":
          sortFilter = { "timetable.end": args.order };
          break;
        default: // default id_groupAsc
          sortFilter = { id_group: 1 };
          break;
      }
    } else if (args.orderFilter && !args.order) {
      throw new Error("400, order is required");
    } else if (!args.orderFilter && args.order) {
      throw new Error("400, orderFilter is required");
    } else {
      sortFilter = { id_group: 1 };
    }

    return paginatedFilters(
      groupCollection(ctx.db),
      filter,
      "groups",
      sortFilter,
      args.page,
      args.pageSize,
    ) as Promise<PaginatedGroups>;
  },

  getGroup: async (
    _parent: unknown,
    args: QueryGetGroupArgs,
    ctx: Context,
  ): Promise<GroupModel> => {
    try{
    const group = await groupCollection(ctx.db).findById(args.id);
    if (!group) {
      throw new Error("400, Group not found");
    }
    return group;
  } catch (error) {
    throw new Error("500",error);
  }
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
    return await groupCollection(ctx.db).find({ center: parent._id }).toArray();
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
