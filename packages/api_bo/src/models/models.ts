import { Center, Group } from "../types.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.3/mod.ts";

export type CenterModel = Omit<Center, "id"> & {
  _id?: ObjectId;
};

export type GroupModel = Omit<Group, "id" | "center"> & {
  _id?: ObjectId;
  center: ObjectId;
};

export type InstructorModel = Omit<Group, "id" | "center" | "groups"> & {
  _id?: ObjectId;
  center: ObjectId;
  groups: ObjectId[];
};

export type StudentModel = Omit<Group, "id" | "center" | "group"> & {
  _id?: ObjectId;
  center: ObjectId;
  group: ObjectId;
};
