import { Group } from "../types.ts";
import { ObjectId } from "objectId";
import { Database } from "mongo";

export type GroupModel = & Omit<Group, "id" | "center" | "students" | "instructors">
  & {
    _id?: ObjectId;
    center: ObjectId;
    students: ObjectId[];
    instructors: ObjectId[];
  };

export const groupCollection = (db: Database) =>
  db.collection<GroupModel>("groups");
