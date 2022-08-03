import { Center } from "../types.ts";
import { ObjectId } from "objectId";
import { Database } from "mongo";

export type CenterModel = Omit<Center, "id" | "groups"> & {
  _id?: ObjectId;
  groups: ObjectId[];
};

export const centerCollection = (db: Database) =>
  db.collection<CenterModel>("centers");

// export const centerCollection = (db: Database) => {
//   const collection = db.collection<CenterModel>("centers");
//   collection.prototype.findById = async function(id: string): Promise<CenterModel>{
//       return await collection.findOne({_id: new ObjectId(id)}) as CenterModel;
//   }
//   return collection;
// }
