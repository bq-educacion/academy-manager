import { Area } from "../types.ts";
import { ObjectId } from "objectId";
import { Collection, Database } from "mongo";
import { FindById } from "./types.ts";

export type AreaModel = Omit<Area, "id"> & {
  _id: ObjectId;
};

export const areaCollection = (
  db: Database,
): Collection<AreaModel> & FindById<AreaModel> => {
  const collection = db.collection<AreaModel>("areas");
  (collection as Collection<AreaModel> & FindById<AreaModel>).findById =
    function (id: string): Promise<AreaModel | undefined> {
      return collection.findOne({ _id: new ObjectId(id) });
    };
  return collection as Collection<AreaModel> & FindById<AreaModel>;
};
