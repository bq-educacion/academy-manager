import { Context } from "../app.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";

import {
  PaginatedStudents,
  QueryGetStudentArgs,
  QueryGetStudentsArgs,
} from "../types.ts";
import { Filter } from "mongo";
import { paginatedFilters } from "../lib/paginatedFilters.ts";
import {
  MutationAddStudentContactArgs,
  MutationCreateStudentArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactArgs,
  StudentContact,
  StudentState,
} from "../types.ts";
import { ObjectId } from "objectId";
import { validDate } from "../lib/validDate.ts";
import { checkNotNull } from "../lib/checkNotNull.ts";
import { addCourse, removeCourse } from "../lib/courses.ts";

export const students = {
  Student: {
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
  },
  Query: {
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
            registrationDate: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            descriptionAllergy: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          {
            collectionPermit: {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
          },
          { notes: { $regex: `.*${args.searchText}.*`, $options: "i" } },
          {
            "contacts.name": {
              $regex: `.*${args.searchText}.*`,
              $options: "i",
            },
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
  },
  Mutation: {
    createStudent: async (
      _parent: unknown,
      args: MutationCreateStudentArgs,
      ctx: Context,
    ): Promise<StudentModel> => {
      try {
        checkNotNull(args);
        const state = StudentState.Active;
        let newStudent = {
          ...args,
          state,
        };

        if (args.birthDate) {
          const birthDate = validDate(args.birthDate);
          newStudent = { ...newStudent, birthDate };
        }

        if (args.registrationDate) {
          const registrationDate = validDate(args.registrationDate);
          newStudent = { ...newStudent, registrationDate };
        }

        const groups = args.idGroups?.map((group) => new ObjectId(group));
        const existsGroups = await groupCollection(ctx.db).find({
          _id: { $in: groups },
        }).toArray();
        if (existsGroups.length !== groups.length) {
          throw new Error("404, Groups not found");
        }

        if (args.contacts) {
          newStudent = {
            ...newStudent,
            contacts: args.contacts?.map((c) => ({ ...c })),
          };
        }

        await addCourse(existsGroups, groupCollection(ctx.db), args.course);

        const idStudent = await studentCollection(ctx.db).insertOne({
          ...newStudent,
        });

        await groupCollection(ctx.db).updateMany(
          { _id: { $in: groups } },
          { $push: { students: { $each: [idStudent] } } },
        );

        return {
          _id: idStudent,
          ...newStudent,
        };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    addStudentContact: async (
      _parent: unknown,
      args: MutationAddStudentContactArgs,
      ctx: Context,
    ): Promise<StudentContact> => {
      try {
        checkNotNull(args);
        const newStudentContact = await studentCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.idStudent) },
          {
            update: {
              $push: {
                contacts: { $each: [{ ...args }] },
              },
            },
            new: true,
          },
        );
        if (!newStudentContact) {
          throw new Error("404, Student not found");
        }
        return { ...args };
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    editStudent: async (
      _parent: unknown,
      args: MutationEditStudentArgs,
      ctx: Context,
    ): Promise<StudentModel> => {
      try {
        checkNotNull(args);
        let updateStudent = { ...args } as Partial<StudentModel>;

        if (args.groups) {
          const groups = args.groups.map((group) => new ObjectId(group));
          const existsGroups = await groupCollection(ctx.db)
            .find({
              _id: { $in: groups },
            })
            .toArray();
          if (existsGroups.length === 0) {
            throw new Error("404, Groups not found");
          }

          const studentGroups = await groupCollection(ctx.db)
            .find({
              students: new ObjectId(args.id),
            }).toArray();

          const studentGroupsIds = studentGroups.map((group) => group._id);
          const groupsToAdd = groups.filter(
            (group) => !studentGroupsIds.includes(group),
          );
          const groupsToRemove = studentGroupsIds.filter(
            (group) => {
              if (group) return !groups.includes(group);
            },
          );

          //delete student from old groups
          if (groupsToRemove.length > 0) {
            await groupCollection(ctx.db).updateMany(
              { _id: { $in: groupsToRemove } },
              { $pull: { students: new ObjectId(args.id) } },
            );
          }

          //add student to new groups
          if (groupsToAdd.length > 0) {
            await groupCollection(ctx.db).updateMany(
              { _id: { $in: groupsToAdd } },
              { $push: { students: { $each: [new ObjectId(args.id)] } } },
            );
          }

          const course = (await studentCollection(ctx.db).findById(args.id))
            ?.course;
          if (!course) {
            throw new Error("404, Student not found");
          }
          //Add course to new groups
          existsGroups.filter((group) => {
            if (group._id) groupsToAdd.includes(group._id);
          });
          await addCourse(existsGroups, groupCollection(ctx.db), course);

          //Remove course to old groups if there are no more students with that course
          studentGroups.filter((group) => {
            if (group._id) groupsToRemove.includes(group._id);
          });
          await removeCourse(
            studentGroups,
            groupCollection(ctx.db),
            studentCollection(ctx.db),
            course,
          );
        }

        if (args.birthDate) {
          const birthDate = validDate(args.birthDate);
          updateStudent = { ...updateStudent, birthDate };
        }

        if (args.registrationDate) {
          const registrationDate = validDate(args.registrationDate);
          updateStudent = { ...updateStudent, registrationDate };
        }

        if (args.course) {
          const oldCourse = (await studentCollection(ctx.db).findById(args.id))
            ?.course;
          if (!oldCourse) {
            throw new Error("404, Student not found");
          }

          const groups = await groupCollection(ctx.db)
            .find({
              students: new ObjectId(args.id),
            })
            .toArray();

          await addCourse(groups, groupCollection(ctx.db), args.course);
          await removeCourse(
            groups,
            groupCollection(ctx.db),
            studentCollection(ctx.db),
            oldCourse,
          );
        }

        const newStudent = await studentCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.id) },
          {
            update: { $set: updateStudent },
            new: true,
          },
        );
        if (!newStudent) {
          throw new Error("404, Student not found");
        }
        return newStudent;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    editStudentContact: async (
      _parent: unknown,
      args: MutationEditStudentContactArgs,
      ctx: Context,
    ): Promise<StudentContact> => {
      try {
        checkNotNull(args);
        const contactsStudents = await studentCollection(ctx.db)
          .find(
            {
              _id: new ObjectId(args.idStudent),
              contacts: { $elemMatch: { email: args.originEmail } },
            },
            { projection: { _id: 0, contacts: 1 } },
          )
          .toArray();

        if (contactsStudents.length === 0) {
          throw new Error("404, Student or contact not found");
        }

        let contactUpdate = {};

        const updateContacts = contactsStudents[0].contacts?.map((contact) => {
          if (contact.email === args.originEmail) {
            contactUpdate = {
              name: args.name || contact.name,
              email: args.email || contact.email,
              phone: args.phone || contact.phone,
              send_info: args.send_info === undefined
                ? contact.send_info
                : args.send_info,
            };
            return contactUpdate;
          }
          return contact;
        }) as StudentContact[];

        await studentCollection(ctx.db).updateOne(
          {
            _id: new ObjectId(args.idStudent),
          },
          { $set: { contacts: updateContacts } },
        );

        return contactUpdate as StudentContact;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};