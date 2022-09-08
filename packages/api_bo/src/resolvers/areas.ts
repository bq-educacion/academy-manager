//import { areaCollection, AreaModel } from "../models/AreaModel.ts";

export const areas = {
  // Area: {
  //   id: (parent: AreaModel): string => {
  //     return String(parent._id!);
  //   }
  // },
  // Query: {
  //   getAreas: async (
  //     _parent: unknown,
  //     args: QueryGetAreasArgs,
  //     ctx: Context,
  //   ): Promise<AreaModel[]> => {
  //     try{
  //         return await areaCollection(ctx.db).find({ region: args.region }).toArray();
  //     }catch(error){
  //         throw new Error("500, " + error);
  //     }
  //   },

  //   getArea: async (
  //     _parent: unknown,
  //     args: QueryGetAreaArgs,
  //     ctx: Context,
  //   ): Promise<AreaModel> => {
  //     try {
  //       const area = await areaCollection(ctx.db).findById(args.id);
  //       if (!area) {
  //         throw new Error("400, Area not found");
  //       }
  //       return area;
  //     } catch (error) {
  //       throw new Error("500, " + error);
  //     }
  //   },
  // },
  // Mutation: {
  //   createArea:  (
  //     _parent: unknown,
  //     args: MutationCreateAreaArgs,
  //     ctx: Context,
  //   ): Promise<GroupModel> => {
  //     try {

  //     } catch (error) {
  //       throw new Error("500, " + error);
  //     }
  //   },

  //   deleteGroup: async (
  //     _parent: unknown,
  //     args: MutationDeleteGroupArgs,
  //     ctx: Context,
  //   ): Promise<GroupModel> => {
  //     try {
  //       const deletedGroup = await groupCollection(ctx.db).findAndModify(
  //         { _id: new ObjectId(args.id) },
  //         {
  //           remove: true,
  //         },
  //       );
  //       if (!deletedGroup) {
  //         throw new Error("404, Group not found");
  //       }

  //       // if students are not in other groups, activeGroup = false
  //       setActiveToFalse(
  //         deletedGroup.students,
  //         groupCollection(ctx.db),
  //         "students",
  //         studentCollection(ctx.db),
  //       );

  //       // if instructors are not in other groups, activeGroup = false
  //       setActiveToFalse(
  //         deletedGroup.instructors,
  //         groupCollection(ctx.db),
  //         "instructors",
  //         instructorCollection(ctx.db),
  //       );

  //       return deletedGroup;
  //     } catch (error) {
  //       throw new Error("500, " + error);
  //     }
  //   },
  // },
};
