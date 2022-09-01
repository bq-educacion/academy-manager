import {
  Availability,
  CenterContact,
  Course,
  MutationAddCenterContactArgs,
  MutationAddStudentContactArgs,
  MutationCreateCenterArgs,
  MutationCreateGroupArgs,
  MutationCreateInstructorArgs,
  MutationCreateStudentArgs,
  MutationEditCenterArgs,
  MutationEditCenterContactArgs,
  MutationEditGroupArgs,
  MutationEditInstructorArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactArgs,
  StudentContact,
  StudentState,
  Timetable,
} from "../types.ts";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { ObjectId } from "objectId";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import {
  instructorCollection,
  InstructorModel,
} from "../models/InstructorModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";
import { setIdDays } from "../lib/setIdDays.ts";
import { validDate } from "../lib/validDate.ts";
import { checkNotNull } from "../lib/checkNotNull.ts";
import { validHour } from "../lib/validHour.ts";
import { addCourse, removeCourse } from "../lib/courses.ts";

export const Mutation = {
  createCenter: async (
    _parent: unknown,
    args: MutationCreateCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    try {
      checkNotNull(args);
      if (args.email) {
        const email = await centerCollection(ctx.db).findOne({
          email: args.email,
        });
        if (email) {
          throw new Error("400, Email must be unique");
        }
      }

      const createdAt = new Date().toLocaleDateString("en-GB");

      let center = {
        ...args,
        createdAt,
      };

      if (args.contacts) {
        center = { ...center, contacts: args.contacts?.map((c) => ({ ...c })) };
      }
      const idCenter = await centerCollection(ctx.db).insertOne({
        ...center,
      });

      return {
        _id: idCenter,
        ...center,
      };
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  addCenterContact: async (
    _parent: unknown,
    args: MutationAddCenterContactArgs,
    ctx: Context,
  ): Promise<CenterContact> => {
    try {
      checkNotNull(args);
      const newCenterContact = await centerCollection(ctx.db).findAndModify(
        { _id: new ObjectId(args.idCenter) },
        {
          update: { $push: { contacts: { $each: [{ ...args }] } } },
          new: true,
        },
      );
      if (!newCenterContact) {
        throw new Error("404, Center not found");
      }
      return {
        ...args,
      };
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  editCenter: async (
    _parent: unknown,
    args: MutationEditCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    try {
      checkNotNull(args);
      // TODO(@pruizj): update to findOneAndUpdate, findAndModify will be deprecated
      const newCenter = await centerCollection(ctx.db).findAndModify(
        { _id: new ObjectId(args.id) },
        {
          update: { $set: { ...(args as Partial<CenterModel>) } },
          new: true,
        },
      );
      if (!newCenter) {
        throw new Error("404, Center not found");
      }
      return newCenter;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  editCenterContact: async (
    _parent: unknown,
    args: MutationEditCenterContactArgs,
    ctx: Context,
  ): Promise<CenterContact> => {
    try {
      checkNotNull(args);
      const contactsCenter = await centerCollection(ctx.db)
        .find(
          {
            _id: new ObjectId(args.idCenter),
            contacts: { $elemMatch: { email: args.originEmail } },
          },
          { projection: { _id: 0, contacts: 1 } },
        )
        .toArray();

      if (contactsCenter.length === 0) {
        throw new Error("404, Center or contact not found");
      }

      let contactUpdate: CenterContact = {
        email: "",
        name: "",
        phone: "",
      };

      const updateContacts = contactsCenter[0].contacts?.map((contact) => {
        if (contact.email === args.originEmail) {
          contactUpdate = {
            name: args.name || contact.name,
            email: args.email || contact.email,
            phone: args.phone || contact.phone,
          };
          return contactUpdate;
        }
        return contact;
      }) as CenterContact[];

      await centerCollection(ctx.db).updateOne(
        {
          _id: new ObjectId(args.idCenter),
        },
        { $set: { contacts: updateContacts } },
      );

      return contactUpdate;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  createGroup: async (
    _parent: unknown,
    args: MutationCreateGroupArgs,
    ctx: Context,
  ): Promise<GroupModel> => {
    try {
      checkNotNull(args);
      const group = await groupCollection(ctx.db).findOne({
        center: new ObjectId(args.idCenter),
        name: { $regex: args.name, $options: "i" },
      });
      if (group) throw new Error("404, Group already exists");

      const createdAt = new Date().toLocaleDateString("en-GB");

      const ids = await groupCollection(ctx.db)
        .find({})
        .sort({ id_group: -1 })
        .toArray();
      let id_group = 1;
      if (ids.length > 0) {
        id_group = (ids[0].id_group as number) + 1;
      }
      while (await groupCollection(ctx.db).findOne({ id_group })) {
        id_group = id_group + 1;
      }

      const centerExists = await centerCollection(ctx.db).findById(
        args.idCenter,
      );
      if (!centerExists) throw new Error("404, Center not found");
      const center = new ObjectId(args.idCenter);

      const instructors = args.instructors?.map(
        (instructor) => new ObjectId(instructor),
      );
      if (args.instructors) {
        const exists = await instructorCollection(ctx.db)
          .find({
            _id: { $in: instructors },
          })
          .toArray();
        if (exists?.length !== instructors?.length) {
          throw new Error("404, Instructors not found");
        }
      }

      const timetable = setIdDays(args.timetable) as Timetable[];
      validHour(timetable);

      const course: Course = {
        EPO: [],
        ESO: [],
      };

      const newGroup = {
        ...args,
        id_group,
        timetable,
        center,
        course,
        instructors: instructors || [],
        createdAt,
        students: [],
      };
      const idGroup = await groupCollection(ctx.db).insertOne({
        ...newGroup,
      });

      return {
        _id: idGroup,
        ...newGroup,
      };
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

  editGroup: async (
    _parent: unknown,
    args: MutationEditGroupArgs,
    ctx: Context,
  ): Promise<GroupModel> => {
    try {
      checkNotNull(args);
      let updateGroup = { ...args } as Partial<GroupModel>;

      if (args.instructors) {
        const instructors = args.instructors?.map(
          (instructor) => new ObjectId(instructor),
        );

        const exists = await instructorCollection(ctx.db)
          .find({
            _id: { $in: instructors },
          })
          .toArray();

        if (exists?.length !== instructors?.length) {
          throw new Error("404, Instructors not found");
        }
        updateGroup = { ...updateGroup, instructors };
      }

      if (args.center) {
        const exists = await centerCollection(ctx.db).findById(args.center);
        if (!exists) {
          throw new Error("404, Center not found");
        }
        updateGroup = { ...updateGroup, center: new ObjectId(args.center) };
      }

      if (args.timetable) {
        const timetable = setIdDays(args.timetable) as Timetable[];
        validHour(timetable);
        updateGroup = { ...updateGroup, timetable };
      }

      const newGroup = await groupCollection(ctx.db).findAndModify(
        { _id: new ObjectId(args.id) },
        {
          update: { $set: updateGroup },
          new: true,
        },
      );
      if (!newGroup) {
        throw new Error("404, Group not found");
      }
      return newGroup;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },

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

  createInstructor: async (
    _parent: unknown,
    args: MutationCreateInstructorArgs,
    ctx: Context,
  ): Promise<InstructorModel> => {
    try {
      checkNotNull(args);
      if (args.corporateEmail) {
        const existsInstructor = await instructorCollection(ctx.db).findOne({
          corporateEmail: args.corporateEmail,
        });
        if (existsInstructor) {
          throw new Error("400, Corporate email must be unique");
        }
      }

      const groups = args.groups?.map((group) => new ObjectId(group));
      const existsGroups = await groupCollection(ctx.db)
        .find({
          _id: { $in: groups },
        })
        .toArray();

      if (existsGroups.length !== groups.length) {
        throw new Error("404, Groups not found");
      }

      const availability = setIdDays(args.availability) as Availability[];

      const newInstructor = {
        ...args,
        availability,
      };
      const idInstructor = await instructorCollection(ctx.db).insertOne({
        ...newInstructor,
      });

      await groupCollection(ctx.db).updateMany(
        { _id: { $in: groups } },
        { $push: { instructors: { $each: [idInstructor] } } },
      );

      return {
        _id: idInstructor,
        ...newInstructor,
      };
    } catch (error) {
      throw new Error("500, " + error);
    }
  },
  editInstructor: async (
    _parent: unknown,
    args: MutationEditInstructorArgs,
    ctx: Context,
  ): Promise<InstructorModel> => {
    try {
      checkNotNull(args);
      let updateInstructor = { ...args } as Partial<InstructorModel>;

      if (args.corporateEmail) {
        const existsCorporateEmail = await instructorCollection(ctx.db).findOne(
          {
            corporateEmail: args.corporateEmail,
          },
        );
        if (existsCorporateEmail) {
          throw new Error(
            "400, Corporate email must be unique",
          );
        }
      }

      if (args.availability) {
        const availability = setIdDays(args.availability) as Availability[];
        updateInstructor = { ...updateInstructor, availability };
      }

      if (args.groups) {
        const groups = args.groups.map((group) => new ObjectId(group));
        const existsGroups = await groupCollection(ctx.db)
          .find({
            _id: { $in: groups },
          })
          .toArray();

        if (existsGroups.length !== groups.length) {
          throw new Error("404, Groups not found");
        }

        const instructorGroups = await groupCollection(ctx.db)
          .find({
            instructors: new ObjectId(args.id),
          }).toArray();

        const instructorGroupsIds = instructorGroups.map((group) => group._id);
        const groupsToRemove = instructorGroupsIds.filter(
          (group) => {
            if (group) return !groups.includes(group);
          },
        );
        const groupsToAdd = groups.filter(
          (group) => !instructorGroupsIds.includes(group),
        );
        //add instructor to new groups
        if (groupsToAdd.length > 0) {
          await groupCollection(ctx.db).updateMany(
            { _id: { $in: groupsToAdd } },
            { $push: { instructors: { $each: [new ObjectId(args.id)] } } },
          );
        }

        //remove instructor from old groups
        if (groupsToRemove.length > 0) {
          await groupCollection(ctx.db).updateMany(
            { _id: { $in: groupsToRemove } },
            { $pull: { instructors: new ObjectId(args.id) } },
          );
        }
      }

      const newInstructor = await instructorCollection(ctx.db).findAndModify(
        { _id: new ObjectId(args.id) },
        {
          update: { $set: updateInstructor },
          new: true,
        },
      );
      if (!newInstructor) {
        throw new Error("404, Instructor not found");
      }
      return newInstructor;
    } catch (error) {
      throw new Error("500, " + error);
    }
  },
};
