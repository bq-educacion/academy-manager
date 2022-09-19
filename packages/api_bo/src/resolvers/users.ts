import { userCollection, UserModel } from "../models/UserModel.ts";
import { Context, key } from "../app.ts";
import { MutationLoginArgs } from "../types.ts";
import { axiod } from "axios";
import { ObjectId } from "objectId";
import { create } from "jwt";

export const users = {
  User: {
    id: (parent: UserModel): string => {
      return String(parent._id!);
    },
  },

  Query: {
    getUsers: async (
      _parent: unknown,
      _args: unknown,
      ctx: Context,
    ): Promise<UserModel[]> => {
      try {
        return await userCollection(ctx.db).find({}).toArray();
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    getUser: async (
      _parent: unknown,
      _args: unknown,
      ctx: Context,
      user: UserModel,
    ): Promise<UserModel> => {
      try {
        if (!user) {
          throw new Error("404, Unauthorized");
        }
        user = await userCollection(ctx.db).findAndModify(
          { _id: user._id },
          {
            update: { $set: { user } },
            new: true,
          },
        ) as UserModel;

        return user;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },

  Mutation: {
    login: async (
      _parent: unknown,
      args: MutationLoginArgs,
      ctx: Context,
    ): Promise<string> => {
      try {
        const googleUser = await axiod.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${args.token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = googleUser.data;

        let user: ObjectId = await userCollection(ctx.db).distinct("_id", {
          email: data.email,
        });
        if (!user) {
          user = await userCollection(ctx.db).insertOne({
            name: data.name || data.email,
            email: data.email,
          });
        }

        const token = await create(
          { "alg": "HS256", "typ": "JWT" },
          googleUser.data,
          key,
        );

        return token;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
