import {
  CenterContact,
  MutationAddCenterContactArgs,
  MutationAddStudentContactArgs,
  MutationCreateCenterArgs,
  MutationCreateGroupArgs,
  MutationCreateStudentArgs,
  MutationEditCenterArgs,
  MutationEditCenterContactsArgs,
  MutationEditGroupArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactsArgs,
  StudentContact,
  StudentState,
} from "../types.ts";
import { Context } from "../app.ts";
import { centerCollection, CenterModel } from "../models/CenterModel.ts";
import { ObjectId } from "objectId";
import { groupCollection, GroupModel } from "../models/GroupModel.ts";
import { instructorCollection } from "../models/InstructorModel.ts";
import { studentCollection, StudentModel } from "../models/StudentModel.ts";
import { setIdTimetable } from "../lib/setIdTimetable.ts";

export const Mutation = {
  createCenter: async (
    _parent: unknown,
    args: MutationCreateCenterArgs,
    ctx: Context,
  ): Promise<CenterModel> => {
    try {
      const createdAt = new Date().toLocaleDateString("en-GB");
      const idCenter = await centerCollection(ctx.db).insertOne({
        ...args,
        notes: args.notes || "",
        contacts: [],
        createdAt,
      });
      return {
        _id: idCenter,
        contacts: [],
        notes: args.notes || "",
        createdAt,
        ...args,
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
      const contact = await centerCollection(ctx.db).findOne({
        _id: new ObjectId(args.idCenter),
        contacts: { $elemMatch: { email: args.email } },
      });
      if (contact) throw new Error("404, Contact already exists");

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
      return newCenterContact.contacts.filter((contact) =>
        contact.email === args.email
      )[0];
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

  editCenterContacts: async (
    _parent: unknown,
    args: MutationEditCenterContactsArgs,
    ctx: Context,
  ): Promise<CenterContact> => {
    try {
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
      const group = await groupCollection(ctx.db).findOne({
        center: new ObjectId(args.idCenter),
        name: { $regex: args.name, $options: "i" },
      });
      if (group) throw new Error("404, Group already exists");

      const createdAt = new Date().toLocaleDateString("en-GB");

      const ids = await groupCollection(ctx.db)
        .find({
          center: new ObjectId(args.idCenter),
        })
        .sort({ id_group: 1 })
        .toArray();
      let id_group = 1;
      if (ids.length > 0) {
        id_group = (ids[0].id_group as number) + 1;
      }

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

      const timetable = setIdTimetable(args.timetable);

      const idGroup = await groupCollection(ctx.db).insertOne({
        ...args,
        id_group,
        timetable,
        center,
        notes: args.notes || "",
        instructors: instructors || [],
        createdAt,
        students: [],
      });

      return {
        _id: idGroup,
        ...args,
        timetable,
        id_group,
        center,
        students: [],
        instructors: instructors || [],
        notes: args.notes || "",
        createdAt,
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
        const timetable = setIdTimetable(args.timetable);
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
      const existsCenter = await centerCollection(ctx.db).findById(
        args.idCenter,
      );
      if (!existsCenter) {
        throw new Error("404, Center not found");
      }

      const [d, m, y] = args.birthDate.split("/");
      if (!d || !m || !y) {
        throw new Error("400, Invalid birthDate");
      }
      const date = new Date(`${y}/${m}/${d}`).toString();
      if (date === "Invalid Date") {
        throw new Error("400, Invalid birthDate");
      }
      const birthDate = `${d}/${m}/${y}`;

      const state = StudentState.Active;
      const registrationDate = new Date().toLocaleDateString("en-GB");

      const group = new ObjectId(args.idGroup);
      const existsGroup = await groupCollection(ctx.db).findOne({
        _id: group,
        center: new ObjectId(args.idCenter),
      });
      if (!existsGroup) {
        throw new Error("404, Group not found");
      }

      const idStudent = await studentCollection(ctx.db).insertOne({
        ...args,
        birthDate,
        state,
        registrationDate,
        descriptionAllergy: args.descriptionAllergy || "",
        notes: args.notes || "",
        contacts: [],
      });

      await groupCollection(ctx.db).updateOne(
        { _id: group },
        { $push: { students: { $each: [idStudent] } } },
      );

      return {
        _id: idStudent,
        state,
        registrationDate,
        descriptionAllergy: args.descriptionAllergy || "",
        notes: args.notes || "",
        contacts: [],
        ...args,
        birthDate,
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
      const contact = await studentCollection(ctx.db).findOne({
        _id: new ObjectId(args.idStudent),
        contacts: { $elemMatch: { email: args.email } },
      });
      if (contact) throw new Error("404, Contact already exists");

      const newStudentContact = await studentCollection(ctx.db).findAndModify(
        { _id: new ObjectId(args.idStudent) },
        {
          update: {
            $push: {
              contacts: { $each: [{ ...args, notes: args.notes || "" }] },
            },
          },
          new: true,
        },
      );
      if (!newStudentContact) {
        throw new Error("404, Student not found");
      }
      return newStudentContact.contacts.filter((contact) =>
        contact.email === args.email
      )[0];
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
      let updateStudent = { ...args } as Partial<StudentModel>;

      if (args.group) {
        const existsGroup = await groupCollection(ctx.db).findOne({
          _id: new ObjectId(args.group),
        });
        if (!existsGroup) {
          throw new Error("404, Group not found");
        }
        //delete student from old group
        await groupCollection(ctx.db).updateOne(
          { students: new ObjectId(args.id) },
          { $pull: { students: new ObjectId(args.id) } },
        );
        //add student to new group
        await groupCollection(ctx.db).updateOne(
          { _id: new ObjectId(args.group) },
          { $push: { students: { $each: [new ObjectId(args.id)] } } },
        );
      }

      if (args.birthDate) {
        const [d, m, y] = args.birthDate.split("/");
        if (!d || !m || !y) {
          throw new Error("400, Invalid birthDate");
        }
        const date = new Date(`${y}/${m}/${d}`).toString();
        if (date === "Invalid Date") {
          throw new Error("400, Invalid birthDate");
        }
        updateStudent = { ...updateStudent, birthDate: `${d}/${m}/${y}` };
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

  editStudentContacts: async (
    _parent: unknown,
    args: MutationEditStudentContactsArgs,
    ctx: Context,
  ): Promise<StudentContact> => {
    try {
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
            notes: args.notes || contact.notes,
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
};
