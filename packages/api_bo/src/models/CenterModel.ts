import { Center } from "../types.ts";
import { ObjectId } from "objectId";
import { Collection, Database } from "mongo";
import { FindById } from "./types.ts";

export type CenterModel =
  | Omit<Center, "id" | "groups"> & {
    _id: ObjectId;
  }
  | null;

export const centerCollection = (
  db: Database,
): Collection<CenterModel> & FindById<CenterModel> => {
  const collection = db.collection<CenterModel>("centers");
  (collection as Collection<CenterModel> & FindById<CenterModel>).findById =
    function (id: string): Promise<CenterModel | undefined> {
      return collection.findOne({ _id: new ObjectId(id) });
    };
  return collection as Collection<CenterModel> & FindById<CenterModel>;
};
