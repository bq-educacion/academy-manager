import { Context } from "../app.ts";
import { ObjectId } from "objectId";
import { areaCollection, AreaModel } from "../models/AreaModel.ts";
import {
  MutationCreateAreaArgs,
  MutationDeleteAreaArgs,
  QueryGetAreaArgs,
  QueryGetAreasArgs,
} from "../types.ts";

export const areas = {
  Area: {
    id: (parent: AreaModel): string => {
      return String(parent._id!);
    },
  },
  Query: {
    getAreas: async (
      _parent: unknown,
      args: QueryGetAreasArgs,
      ctx: Context,
    ): Promise<AreaModel[]> => {
      try {
        return await areaCollection(ctx.db).find({ region: args.region })
          .toArray();
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    getArea: async (
      _parent: unknown,
      args: QueryGetAreaArgs,
      ctx: Context,
    ): Promise<AreaModel> => {
      try {
        const area = await areaCollection(ctx.db).findById(args.id);
        if (!area) {
          throw new Error("400, Area not found");
        }
        return area;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
  Mutation: {
    createArea: async (
      _parent: unknown,
      args: MutationCreateAreaArgs,
      ctx: Context,
    ): Promise<AreaModel> => {
      try {
        const idArea = await areaCollection(ctx.db).insertOne({ ...args });
        return {
          _id: idArea,
          ...args,
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    deleteArea: async (
      _parent: unknown,
      args: MutationDeleteAreaArgs,
      ctx: Context,
    ): Promise<AreaModel> => {
      try {
        return await areaCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          { remove: true },
        ) as AreaModel;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
