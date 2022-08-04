import { Group } from "../types.ts";
import { ObjectId } from "objectId";
import { Collection, Database } from "mongo";
import { FindById } from "./types.ts";

export type GroupModel = Omit<
  Group,
  "id" | "center" | "students" | "instructors"
> & {
  _id?: ObjectId;
  center: ObjectId;
  students: ObjectId[];
  instructors: ObjectId[];
};

export const groupCollection = (
  db: Database
): Collection<GroupModel> & FindById<GroupModel> => {
  const collection = db.collection<GroupModel>("groups");
  (collection as Collection<GroupModel> & FindById<GroupModel>).findById =
    function (id: string) {
      return collection.findOne({ _id: new ObjectId(id) });
    };
  return collection as Collection<GroupModel> & FindById<GroupModel>;
};
