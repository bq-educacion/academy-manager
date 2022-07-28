import { Instructor} from "../types.ts";
import { ObjectId } from "objectId";
import { Database } from "mongo";

export type InstructorModel = Omit<Instructor, "id" | "center" > & {
    _id?: ObjectId;
    center: ObjectId;
};

export const instructorCollection = (db:Database) => db.collection<InstructorModel>("instructors");