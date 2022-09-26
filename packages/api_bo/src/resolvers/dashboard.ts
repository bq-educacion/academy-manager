import { Context } from "../app.ts";
import { centerCollection } from "../models/CenterModel.ts";
import { groupCollection } from "../models/GroupModel.ts";
import { instructorCollection } from "../models/InstructorModel.ts";
import { studentCollection } from "../models/StudentModel.ts";

export const dashboardBO = {
  Query: {
    dashboard: async (
      _parent: unknown,
      _args: unknown,
      ctx: Context,
    ) => {
      try {
        return {
          userName: ctx.user?.name || "",
          activeCenters: await centerCollection(ctx.db).countDocuments({
            active: true,
          }),
          groups: await groupCollection(ctx.db).countDocuments(),
          activeInstructors: await instructorCollection(ctx.db).countDocuments({
            enrolled: true,
          }),
          activeStudents: await studentCollection(ctx.db).countDocuments({
            enrolled: true,
          }),
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
