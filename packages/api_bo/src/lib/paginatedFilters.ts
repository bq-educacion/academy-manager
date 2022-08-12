import { Collection, Filter } from "mongo";
import { CenterModel } from "../models/CenterModel.ts";
import { GroupModel } from "../models/GroupModel.ts";
import { InputMaybe, PaginatedCenters, PaginatedGroups } from "../types.ts";

export const paginatedFilters = async (
  DBModel: Collection<CenterModel | GroupModel>,
  filter: Filter<PaginatedCenters | PaginatedGroups>,
  check: "centers" | "groups",
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
