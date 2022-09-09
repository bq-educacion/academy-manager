import { ObjectId } from "objectId";
import { Collection, UpdateFilter } from "mongo";
import { GroupModel } from "../models/GroupModel.ts";
import { CourseType, StudentStatus } from "../types.ts";
import { StudentModel } from "../models/StudentModel.ts";

export const addCourse = async (
  groups: GroupModel[],
  DBModel: Collection<GroupModel>,
  course: string,
): Promise<void> => {
  try {
    const newCourse: ObjectId[] = [];
    let type = CourseType.Eso;
    if ((/.*EPO$/).test(course)) {
      type = CourseType.Epo;
    }

    if (type === CourseType.Epo) {
      groups.forEach((group) => {
        if (!group.course.EPO.includes(course)) {
          if (group._id) newCourse.push(group._id);
        }
      });
    } else if (type === CourseType.Eso) {
      groups.forEach((group) => {
        if (!group.course.ESO.includes(course)) {
          if (group._id) newCourse.push(group._id);
        }
      });
    }
    const typeCourse = {
      EPO: "course.EPO",
      ESO: "course.ESO",
    };

    if (newCourse.length > 0) {
      await DBModel.updateMany(
        { _id: { $in: newCourse } },
        { $push: { [typeCourse[type]]: course } } as UpdateFilter<GroupModel>,
      );
    }
  } catch (error) {
    throw new Error("500 " + error);
  }
};

export const removeCourse = async (
  groups: GroupModel[],
  DBModel: Collection<GroupModel>,
  students: Collection<StudentModel>,
  course: string,
): Promise<void> => {
  try {
    const deleteOldCourse: ObjectId[] = [];
    await Promise.all(groups.map(
      async (group) => {
        const size = await students.countDocuments({
          _id: { $in: group.students },
          course: course,
        });
        if (size <= 1) {
          if (group._id) deleteOldCourse.push(group._id);
        }
      },
    ));

    let type = CourseType.Eso;
    if ((/.*EPO$/).test(course)) {
      type = CourseType.Epo;
    }
    const typeCourse = {
      EPO: "course.EPO",
      ESO: "course.ESO",
    };

    if (deleteOldCourse.length > 0) {
      await DBModel.updateMany(
        { _id: { $in: deleteOldCourse } },
        { $pull: { [typeCourse[type]]: course } } as UpdateFilter<GroupModel>,
      );
    }
  } catch (error) {
    throw new Error("500 " + error);
  }
};

export const updateCourses = async (
  groups: GroupModel[],
  DBGroups: Collection<GroupModel>,
  DBStudents: Collection<StudentModel>,
): Promise<void> => {
  try {
    await Promise.all(groups.map(async (group) => {
      const EPO: string[] = [];
      const ESO: string[] = [];
      let students = await DBStudents.distinct("course", {
        _id: { $in: group.students },
        status: StudentStatus.Active,
        activeGroup: true,
      }) as string[];
      students = [...new Set(students)];
      students.forEach((course) => {
        if ((/.*EPO$/).test(course)) {
          EPO.push(course);
        } else if ((/.*ESO$/).test(course)) {
          ESO.push(course);
        }
      });
      await DBGroups.updateOne(
        { _id: group._id },
        { $set: { course: { EPO: EPO, ESO: ESO } } },
      );
    }));
  } catch (error) {
    throw new Error("500 " + error);
  }
};
