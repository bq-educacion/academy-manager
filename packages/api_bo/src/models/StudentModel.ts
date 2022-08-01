import { Student } from "../types.ts";
import { ObjectId } from "objectId";
import { Database } from "mongo";

export type StudentModel = Omit<Student, "id" | "center"> & {
  _id?: ObjectId;
  center: ObjectId;
};

export const studentCollection = (db: Database) =>
  db.collection<StudentModel>("students");
