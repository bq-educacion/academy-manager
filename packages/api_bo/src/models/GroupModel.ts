import { Group} from "../types.ts";
import { ObjectId } from "objectId";
import { Database } from "mongo";

export type GroupModel = Omit<Group, "id" | "center" | "groups" | "instructors"> & {
    _id?: ObjectId;
    center: ObjectId;
    groups: ObjectId[];
    instructors: ObjectId[];
};

export const groupCollection = (db:Database) => db.collection<GroupModel>("groups");