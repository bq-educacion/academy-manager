import { Collection, Filter } from "mongo";
import { CenterModel } from "../models/CenterModel.ts";
import { GroupModel } from "../models/GroupModel.ts";
import { InstructorModel } from "../models/InstructorModel.ts";
import { StudentModel } from "../models/StudentModel.ts";
import {
  InputMaybe,
  OrderFilterCenter,
  PaginatedCenters,
  PaginatedGroups,
  PaginatedInstructors,
  PaginatedStudents,
} from "../types.ts";

export const sortFilter = (
  filter: InputMaybe<OrderFilterCenter> | undefined,
  order: InputMaybe<number> | undefined,
  type: "centers" | "students" | "groups" | "instructors",
  defaultField: string,
) => {
  let sortFilter = {};
  let OrderFilter;
  if (type === "centers") {
    OrderFilter = {
      name: "name",
      nature: "nature",
      languages: "languages",
      city: "city",
      type: "type",
    };
  }

  if (filter && order) {
    if (order !== 1 && order !== -1) {
      throw new Error("400, wrong order (1 or -1)");
    }
    if (OrderFilter) {
      sortFilter = {
        [OrderFilter[filter]]: order,
      };
    }
  } else if (filter && !order) {
    throw new Error("400, order is required");
  } else if (!filter && order) {
    throw new Error("400, orderFilter is required");
  } else {
    sortFilter = { [defaultField]: 1 };
  }
  return sortFilter;
};

export const paginatedFilters = async (
  DBModel: Collection<
    CenterModel | GroupModel | StudentModel | InstructorModel
  >,
  filter: Filter<
    | PaginatedCenters
    | PaginatedGroups
    | PaginatedStudents
    | PaginatedInstructors
  >,
  check: "centers" | "groups" | "students" | "instructors",
  sortFilter: unknown,
  pageArgs?: InputMaybe<number>,
  pageSizeArgs?: InputMaybe<number>,
) => {
  try {
    const page = pageArgs || 1;
    const pageSize = pageSizeArgs || (await DBModel.countDocuments());
    const lookup = [];
    if (check === "centers") {
      lookup.push({
        $lookup: {
          from: "groups",
          localField: "_id",
          foreignField: "center",
          as: "groupsName",
        },
      });
    } else if (check === "groups") {
      lookup.push({
        $lookup: {
          from: "centers",
          localField: "center",
          foreignField: "_id",
          as: "centersName",
        },
      }, {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "_id",
          as: "studentsName",
        },
      }, {
        $lookup: {
          from: "instructors",
          localField: "instructors",
          foreignField: "_id",
          as: "instructorsName",
        },
      });
    } else if (check === "students") {
      lookup.push({
        $lookup: {
          from: "groups",
          localField: "_id",
          foreignField: "students",
          as: "groupsName",
        },
      }, {
        $lookup: {
          from: "centers",
          localField: "groupsName.center",
          foreignField: "_id",
          as: "centersName",
        },
      });
    } else if (check === "instructors") {
      lookup.push({
        $lookup: {
          from: "groups",
          localField: "_id",
          foreignField: "instructors",
          as: "groupsId",
        },
      }, {
        $lookup: {
          from: "centers",
          localField: "groupsId.center",
          foreignField: "_id",
          as: "centersName",
        },
      });
    }

    const agr = await DBModel.aggregate(
      [
        ...lookup,
        { $match: filter },
        {
          $facet: {
            stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
            stage2: [
              { $sort: sortFilter },
              { $skip: pageSize * (page - 1) },
              { $limit: pageSize === 0 ? 1 : pageSize },
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
      ],
      { collation: { locale: "es", numericOrdering: true } },
    ).toArray();

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
  } catch (error) {
    throw new Error("500 " + error);
  }
};
