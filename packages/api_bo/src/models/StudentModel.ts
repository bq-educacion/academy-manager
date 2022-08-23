import { Student } from "../types.ts";
import { ObjectId } from "objectId";
import { Collection, Database } from "mongo";
import { FindById } from "./types.ts";

export type StudentModel = Omit<Student, "id" | "center" | "groups"> & {
  _id?: ObjectId;
};

export const studentCollection = (
  db: Database,
): Collection<StudentModel> & FindById<StudentModel> => {
  const collection = db.collection<StudentModel>("students");
  (collection as Collection<StudentModel> & FindById<StudentModel>).findById =
    function (id: string): Promise<StudentModel | undefined> {
      return collection.findOne({ _id: new ObjectId(id) });
    };
  return collection as Collection<StudentModel> & FindById<StudentModel>;
};
