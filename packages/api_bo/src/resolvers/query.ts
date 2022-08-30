import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";
import {
  instructorCollection,
  InstructorModel,
} from "../models/InstructorModel.ts";
import {
  PaginatedCenters,
  PaginatedGroups,
  PaginatedInstructors,
  PaginatedStudents,
  QueryCheckCorporateEmailArgs,
  QueryGetCenterArgs,
  QueryGetCentersArgs,
  QueryGetGroupArgs,
  QueryGetGroupsArgs,
  QueryGetInstructorArgs,
  QueryGetInstructorsArgs,
  QueryGetStudentArgs,
  QueryGetStudentsArgs,
} from "../types.ts";
import { Filter } from "mongo";
import { paginatedFilters } from "../lib/paginatedFilters.ts";

export const Query = {
  getCenters: (
    _parent: unknown,
    args: QueryGetCentersArgs,
    ctx: Context,
  ): Promise<PaginatedCenters> => {
    const filter: Filter<PaginatedCenters> = { $or: [{}] };
    if (args.searchText) {
      filter["$or"] = [
        { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { address: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          city: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        { phone: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { email: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { type: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { nature: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          createdAt: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          languages: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          "contacts.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "groupsName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
      ];
    }

    let sortFilter = {};
    const OrderFilter = {
      name: "name",
      nature: "nature",
      languages: "languages",
      city: "city",
      type: "type",
    };
    if (args.orderFilter && args.order) {
      if (args.order !== 1 && args.order !== -1) {
        throw new Error("400, wrong order (1 or -1)");
      }
      sortFilter = { [OrderFilter[args.orderFilter]]: args.order };
    } else if (args.orderFilter && !args.order) {
      throw new Error("400, order is required");
    } else if (!args.orderFilter && args.order) {
      throw new Error("400, orderFilter is required");
    } else {
      sortFilter = { name: 1 };
    }

    return paginatedFilters(
      centerCollection(ctx.db),
      filter,
      "centers",
      sortFilter,
      args.page,
      args.pageSize,
    ) as Promise<PaginatedCenters>;
  },

  getCenter: async (
    _parent: unknown,
    args: QueryGetCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    try {
      const center = await centerCollection(ctx.db).findById(args.id);
      if (!center) {
        throw new Error("404, Center not found");
      }
      return center;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  getGroups: (
    _parent: unknown,
    args: QueryGetGroupsArgs,
    ctx: Context,
  ): Promise<PaginatedGroups> => {
    const filter: Filter<PaginatedGroups> = { $or: [{}] };
    if (args.searchText) {
      filter["$or"] = [
        { id_group: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { type: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { modality: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          createdAt: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          "timetable.day": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "timetable.start": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "timetable.end": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          "centersName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "instructorsName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "studentsName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
      ];
    }

    let sortFilter = {};
    const OrderFilter = {
      id_group: "id_group",
      modality: "modality",
      instructors: "instructorsName.name",
      center: "centersName.name",
      id_day: "timetable.id_day",
      start: "timetable.start",
      end: "timetable.end",
    };

    if (args.orderFilter && args.order) {
      if (args.order !== 1 && args.order !== -1) {
        throw new Error("400, wrong order (1 or -1)");
      }
      sortFilter = { [OrderFilter[args.orderFilter]]: args.order };
    } else if (args.orderFilter && !args.order) {
      throw new Error("400, order is required");
    } else if (!args.orderFilter && args.order) {
      throw new Error("400, orderFilter is required");
    } else {
      sortFilter = { id_group: 1 };
    }

    return paginatedFilters(
      groupCollection(ctx.db),
      filter,
      "groups",
      sortFilter,
      args.page,
      args.pageSize,
    ) as Promise<PaginatedGroups>;
  },

  getGroup: async (
    _parent: unknown,
    args: QueryGetGroupArgs,
    ctx: Context,
  ): Promise<GroupModel> => {
    try {
      const group = await groupCollection(ctx.db).findById(args.id);
      if (!group) {
        throw new Error("400, Group not found");
      }
      return group;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  getStudents: (
    _parent: unknown,
    args: QueryGetStudentsArgs,
    ctx: Context,
  ): Promise<PaginatedStudents> => {
    const filter: Filter<PaginatedStudents> = { $or: [{}] };
    if (args.searchText) {
      filter["$or"] = [
        { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { birthDate: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { course: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { state: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          registrationDate: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          descriptionAllergy: {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          collectionPermit: { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          "contacts.name": { $regex: `.*${args.searchText}.*`, $options: "i" },
        },
        {
          "centersName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "groupsName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
      ];
    }

    let sortFilter = {};
    const OrderFilter = {
      name: "name",
      course: "course",
      state: "state",
      center: "centersName.name",
      group: "groupsName.name",
    };

    if (args.orderFilter && args.order) {
      if (args.order !== 1 && args.order !== -1) {
        throw new Error("400, wrong order (1 or -1)");
      }
      sortFilter = { [OrderFilter[args.orderFilter]]: args.order };
    } else if (args.orderFilter && !args.order) {
      throw new Error("400, order is required");
    } else if (!args.orderFilter && args.order) {
      throw new Error("400, orderFilter is required");
    } else {
      sortFilter = { name: 1 };
    }

    return paginatedFilters(
      studentCollection(ctx.db),
      filter,
      "students",
      sortFilter,
      args.page,
      args.pageSize,
    ) as Promise<PaginatedStudents>;
  },

  getStudent: async (
    _parent: unknown,
    args: QueryGetStudentArgs,
    ctx: Context,
  ): Promise<StudentModel> => {
    try {
      const student = await studentCollection(ctx.db).findById(args.id);
      if (!student) {
        throw new Error("404, Student not found");
      }
      return student;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  checkCorporateEmail: async (
    _parent: unknown,
    args: QueryCheckCorporateEmailArgs,
    ctx: Context,
  ): Promise<string> => {
    try {
      const instructor = await instructorCollection(ctx.db).findOne({
        corporateEmail: args.email,
      });
      if (instructor) {
        throw new Error("400, Corporate email must be unique");
      }
      return args.email;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  getInstructors: (
    _parent: unknown,
    args: QueryGetInstructorsArgs,
    ctx: Context,
  ): Promise<PaginatedInstructors> => {
    const filter: Filter<PaginatedInstructors> = { $or: [{}] };
    if (args.searchText) {
      filter["$or"] = [
        { name: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { corporateEmail: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { personalEmail: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { phone: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { state: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { training: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          previousExperience: {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        { knowledge: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { urlCV: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          materialsExperience: {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          platformEducationExperience: {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        { languages: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          "availability.day": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "availability.hours": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          summerAvailability: {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        { vehicle: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          geographicalAvailability: {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        { areas: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
        {
          "centersName.name": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
        {
          "groupsId.id_group": {
            $regex: `.*${args.searchText}.*`,
            $options: "i",
          },
        },
      ];
    }

    let sortFilter = {};
    const OrderFilter = {
      name: "name",
      center: "centersName.name",
      areas: "areas",
      id_day: "availability.id_day",
      state: "state",
      id_group: "groupsId.id_group",
      vehicle: "vehicle",
      languages: "languages",
      summerAvailability: "summerAvailability",
    };

    if (args.orderFilter && args.order) {
      if (args.order !== 1 && args.order !== -1) {
        throw new Error("400, wrong order (1 or -1)");
      }
      sortFilter = { [OrderFilter[args.orderFilter]]: args.order };
    } else if (args.orderFilter && !args.order) {
      throw new Error("400, order is required");
    } else if (!args.orderFilter && args.order) {
      throw new Error("400, orderFilter is required");
    } else {
      sortFilter = { name: 1 };
    }

    return paginatedFilters(
      instructorCollection(ctx.db),
      filter,
      "instructors",
      sortFilter,
      args.page,
      args.pageSize,
    ) as Promise<PaginatedInstructors>;
  },

  getInstructor: async (
    _parent: unknown,
    args: QueryGetInstructorArgs,
    ctx: Context,
  ): Promise<InstructorModel> => {
    try {
      const instructor = await instructorCollection(ctx.db).findById(args.id);
      if (!instructor) {
        throw new Error("404, Instructor not found");
      }
      return instructor;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },
};

export const Center = {
  id: (parent: CenterModel): string => {
    return String(parent._id!);
  },
  groups: async (
    parent: CenterModel,
    _: unknown,
    ctx: Context,
  ): Promise<GroupModel[]> => {
    return await groupCollection(ctx.db).find({ center: parent._id }).toArray();
  },
};

export const Group = {
  id: (parent: GroupModel): string => {
    return String(parent._id!);
  },
  center: async (
    parent: GroupModel,
    _: unknown,
    ctx: Context,
  ): Promise<CenterModel | undefined> => {
    return await centerCollection(ctx.db).findOne({ _id: parent.center });
  },
  students: async (
    parent: GroupModel,
    _: unknown,
    ctx: Context,
  ): Promise<StudentModel[]> => {
    return await studentCollection(ctx.db)
      .find({
        _id: { $in: parent.students },
      })
      .toArray();
  },
  instructors: async (
    parent: GroupModel,
    _: unknown,
    ctx: Context,
  ): Promise<InstructorModel[]> => {
    return await instructorCollection(ctx.db)
      .find({
        _id: { $in: parent.instructors },
      })
      .toArray();
  },
};

export const Student = {
  id: (parent: StudentModel): string => {
    return String(parent._id!);
  },
  groups: async (
    parent: StudentModel,
    _: unknown,
    ctx: Context,
  ): Promise<GroupModel[] | undefined> => {
    return await groupCollection(ctx.db).find({ students: parent._id })
      .toArray();
  },
};

export const Instructor = {
  id: (parent: InstructorModel): string => {
    return String(parent._id!);
  },
  groups: async (
    parent: InstructorModel,
    _: unknown,
    ctx: Context,
  ): Promise<GroupModel[] | undefined> => {
    return await groupCollection(ctx.db)
      .find({ instructors: parent._id })
      .toArray();
  },
};
