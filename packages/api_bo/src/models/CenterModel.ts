import { Center} from "../types.ts";
import { ObjectId } from "objectId";
import { Database } from "mongo";

export type CenterModel = Omit<Center, "id"| "groups"> & {
  _id?: ObjectId;
  groups: ObjectId[];
};


export const centerCollection = (db:Database) => db.collection<CenterModel>("centers");