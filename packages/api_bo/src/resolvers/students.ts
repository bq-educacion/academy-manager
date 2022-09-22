import { Context } from "../app.ts";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";

import {
  MutationDeleteStudentArgs,
  MutationSetStatusStudentArgs,
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
} from "../types.ts";
import { ObjectId } from "objectId";
import { validDate } from "../lib/validDate.ts";
import { checkNotNull } from "../lib/checkNotNull.ts";
import { addCourse, removeCourse, updateCourses } from "../lib/courses.ts";
import { checkActiveGroups } from "../lib/checkActiveGroups.ts";
import { mongoSearchRegex } from "../lib/mongoSearchRegex.ts";

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
      if (!ctx.user) {
        throw new Error("403, Unauthorized");
      }
      const filter: Filter<PaginatedStudents> = { $or: [{}] };
      if (args.students.searchText) {
        filter["$or"] = [
          { name: mongoSearchRegex(args.students.searchText) },
          { birthDate: mongoSearchRegex(args.students.searchText) },
          { course: mongoSearchRegex(args.students.searchText) },
          { state: mongoSearchRegex(args.students.searchText) },
          { registrationDate: mongoSearchRegex(args.students.searchText) },
          { descriptionAllergy: mongoSearchRegex(args.students.searchText) },
          { collectionPermit: mongoSearchRegex(args.students.searchText) },
          { notes: mongoSearchRegex(args.students.searchText) },
          { "contacts.name": mongoSearchRegex(args.students.searchText) },
          { "centersName.name": mongoSearchRegex(args.students.searchText) },
          { "groupsName.name": mongoSearchRegex(args.students.searchText) },
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

      if (args.students.orderFilter && args.students.order) {
        if (args.students.order !== 1 && args.students.order !== -1) {
          throw new Error("400, wrong order (1 or -1)");
        }
        sortFilter = {
          [OrderFilter[args.students.orderFilter]]: args.students.order,
        };
      } else if (args.students.orderFilter && !args.students.order) {
        throw new Error("400, order is required");
      } else if (!args.students.orderFilter && args.students.order) {
        throw new Error("400, orderFilter is required");
      } else {
        sortFilter = { name: 1 };
      }

      return paginatedFilters(
        studentCollection(ctx.db),
        filter,
        "students",
        sortFilter,
        args.students.page,
        args.students.pageSize,
      ) as Promise<PaginatedStudents>;
    },

    getStudent: async (
      _parent: unknown,
      args: QueryGetStudentArgs,
      ctx: Context,
    ): Promise<StudentModel> => {
      try {
        if (!ctx.user) {
          throw new Error("403, Unauthorized");
        }
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
        if (!ctx.user) {
          throw new Error("403, Unauthorized");
        }
        checkNotNull(args.student);

        let newStudent = {
          ...args.student,
          enrolled: true,
          active: false,
        };

        if (args.student.birthDate) {
          const birthDate = validDate(args.student.birthDate);
          newStudent = { ...newStudent, birthDate };
        }

        if (args.student.registrationDate) {
          const registrationDate = validDate(args.student.registrationDate);
          newStudent = { ...newStudent, registrationDate };
        }

        const groups = args.idGroups?.map((group) => new ObjectId(group));
        const existsGroups = await groupCollection(ctx.db).find({
          _id: { $in: groups },
        }).toArray();
        if (existsGroups.length !== groups.length) {
          throw new Error("404, Groups not found");
        }

        newStudent = {
          ...newStudent,
          active: checkActiveGroups(existsGroups, true),
        };

        if (args.student.contacts) {
          newStudent = {
            ...newStudent,
            contacts: args.student.contacts?.map((c) => ({ ...c })),
          };
        }

        await addCourse(
          existsGroups,
          groupCollection(ctx.db),
          args.student.course,
        );

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
        if (!ctx.user) {
          throw new Error("403, Unauthorized");
        }
        checkNotNull(args.contact);
        const newStudentContact = await studentCollection(ctx.db).findAndModify(
          { _id: new ObjectId(args.idStudent) },
          {
            update: {
              $push: {
                contacts: { $each: [{ ...args.contact }] },
              },
            },
            new: true,
          },
        );
        if (!newStudentContact) {
          throw new Error("404, Student not found");
        }
        return { ...args.contact };
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
        if (!ctx.user) {
          throw new Error("403, Unauthorized");
        }
        checkNotNull(args.student);
        let updateStudent = { ...args.student } as Partial<StudentModel>;

        if (args.idGroups) {
          const groups = args.idGroups.map((group) => new ObjectId(group));
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

          updateStudent = {
            ...updateStudent,
            active: checkActiveGroups(existsGroups, true),
          };
        }

        if (args.student.birthDate) {
          const birthDate = validDate(args.student.birthDate);
          updateStudent = { ...updateStudent, birthDate };
        }

        if (args.student.registrationDate) {
          const registrationDate = validDate(args.student.registrationDate);
          updateStudent = { ...updateStudent, registrationDate };
        }

        if (args.student.course) {
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

          await addCourse(groups, groupCollection(ctx.db), args.student.course);
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
        checkNotNull(args.contact);
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
              name: args.contact.name || contact.name,
              email: args.contact.email || contact.email,
              phone: args.contact.phone || contact.phone,
              send_info: args.contact.send_info === undefined
                ? contact.send_info
                : args.contact.send_info,
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

    deleteStudent: async (
      _parent: unknown,
      args: MutationDeleteStudentArgs,
      ctx: Context,
    ): Promise<StudentModel> => {
      try {
        if (!ctx.user) {
          throw new Error("403, Unauthorized");
        }
        const student = await studentCollection(ctx.db).findById(args.id);
        if (!student) {
          throw new Error("404, Student not found");
        }
        //delete student from groups and update groups course
        const groups = await groupCollection(ctx.db)
          .find({
            students: new ObjectId(args.id),
          })
          .toArray();

        await removeCourse(
          groups,
          groupCollection(ctx.db),
          studentCollection(ctx.db),
          student.course,
        );
        await groupCollection(ctx.db).updateMany(
          { students: new ObjectId(args.id) },
          { $pull: { students: new ObjectId(args.id) } },
        );

        await studentCollection(ctx.db).deleteOne({
          _id: new ObjectId(args.id),
        });

        return student;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },

    setStatusStudent: async (
      _parent: unknown,
      args: MutationSetStatusStudentArgs,
      ctx: Context,
    ): Promise<StudentModel | undefined> => {
      try {
        if (!ctx.user) {
          throw new Error("403, Unauthorized");
        }
        checkNotNull(args);
        let student: StudentModel | undefined = undefined;

        //if enrolled = false, we will only keep the center, group, course, registration date, name and surname.
        if (!args.enrolled) {
          student = await studentCollection(ctx.db).findAndModify(
            { _id: new ObjectId(args.id) },
            {
              update: {
                $set: {
                  enrolled: args.enrolled,
                  birthDate: null,
                  allergies: null,
                  descriptionAllergy: null,
                  oldStudent: null,
                  signedMandate: null,
                  imageAuthorisation: null,
                  collectionPermit: null,
                  goesAlone: null,
                  notes: null,
                  contacts: [],
                },
              },
              new: true,
            },
          );
          if (!student) {
            throw new Error("404, Student not found");
          }
        } else if (args.enrolled) {
          student = await studentCollection(ctx.db).findAndModify(
            { _id: new ObjectId(args.id) },
            {
              update: { $set: { enrolled: args.enrolled } },
              new: true,
            },
          );
          if (!student) {
            throw new Error("404, Student not found");
          }
        }

        // update courses
        const groups = await groupCollection(ctx.db).find({
          students: new ObjectId(args.id),
        }).toArray();
        updateCourses(
          groups,
          groupCollection(ctx.db),
          studentCollection(ctx.db),
        );

        return student;
      } catch (error) {
        throw new Error("500, " + error);
      }
    },
  },
};
