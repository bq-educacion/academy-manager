import { Instructor } from "../types.ts";
import { ObjectId } from "objectId";
import { Collection, Database } from "mongo";
import { FindById } from "./types.ts";

export type InstructorModel = Omit<Instructor, "id" | "center" | "groups"> & {
  _id: ObjectId;
};

export const instructorCollection = (
  db: Database,
): Collection<InstructorModel> & FindById<InstructorModel> => {
  const collection = db.collection<InstructorModel>("instructors");
  (collection as Collection<InstructorModel> & FindById<InstructorModel>)
    .findById = function (id: string): Promise<InstructorModel | undefined> {
      return collection.findOne({ _id: new ObjectId(id) });
    };
  return collection as Collection<InstructorModel> & FindById<InstructorModel>;
};
