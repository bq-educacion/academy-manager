import { userCollection, UserModel } from "../models/UserModel.ts";
import { Context, JWT_SECRET } from "../app.ts";
import { MutationLoginArgs } from "../types.ts";
import { signJwt } from "../lib/jwt.ts";
import { googleUser } from "../lib/googleUser.ts";

export const users = {
  User: {
    id: (parent: UserModel): string => {
      return String(parent._id!);
    },
  },

  Query: {
    getUser: async (
      _parent: unknown,
      _args: unknown,
      ctx: Context,
    ): Promise<UserModel> => {
      try {
        let user = ctx.user;

        if (!user) {
          throw new Error("403, Unauthorized");
        }

        const { email, name, picture } = await googleUser(ctx.token) ||
          {
            name: user.name || user.email,
            email: user.email,
            picture: user.picture,
          };

        user = await userCollection(ctx.db).findAndModify(
          { _id: user._id },
          {
            update: { $set: { name: name || email, email, picture } },
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
        const { email, name, picture } = await googleUser(args.token);

        const user: UserModel | undefined = await userCollection(ctx.db)
          .findOne({
            email: email,
          });

        if (!user?._id) {
          await userCollection(ctx.db).insertOne({
            name: name || email,
            email: email,
            picture: picture,
          });
        }

        const token = await signJwt({
          userEmail: email,
          secretKey: JWT_SECRET,
        });

        return token;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
