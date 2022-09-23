import { User } from "../types.ts";
import { ObjectId } from "objectId";
import { Collection, Database } from "mongo";
import { FindById } from "./types.ts";

export type UserModel = Omit<User, "id"> & {
  _id: ObjectId;
};

export const userCollection = (
  db: Database,
): Collection<UserModel> & FindById<UserModel> => {
  const collection = db.collection<UserModel>("users");
  (collection as Collection<UserModel> & FindById<UserModel>).findById =
    function (id: string): Promise<UserModel | undefined> {
      return collection.findOne({ _id: new ObjectId(id) });
    };
  return collection as Collection<UserModel> & FindById<UserModel>;
};
