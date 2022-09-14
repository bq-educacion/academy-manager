import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Number: any;
};

export type Availability = {
  __typename?: 'Availability';
  day: Days;
  hours: Array<Scalars['String']>;
  id_day: Scalars['Number'];
};

export type AvailabilityInput = {
  day: Days;
  hours: Array<Scalars['String']>;
};

export type Center = {
  __typename?: 'Center';
  active: Scalars['Boolean'];
  address: Scalars['String'];
  city: Scalars['String'];
  contacts?: Maybe<Array<CenterContact>>;
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  languages: Array<Languages>;
  name: Scalars['String'];
  nature: CenterNature;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  type: Array<CenterActivityType>;
};

export enum CenterActivityType {
  Academy = 'ACADEMY',
  Campus = 'CAMPUS',
  NoAcademy = 'NO_ACADEMY',
  Others = 'OTHERS'
}

export type CenterContact = {
  __typename?: 'CenterContact';
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type CenterContactInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type CenterInfo = {
  __typename?: 'CenterInfo';
  center: Center;
  totalGroups: Scalars['Number'];
  totalStudents: Scalars['Number'];
};

export enum CenterNature {
  Concertado = 'CONCERTADO',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Course = {
  __typename?: 'Course';
  EPO: Array<Scalars['String']>;
  ESO: Array<Scalars['String']>;
};

export enum CourseType {
  Epo = 'EPO',
  Eso = 'ESO'
}

export enum Days {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type Group = {
  __typename?: 'Group';
  active: Scalars['Boolean'];
  center?: Maybe<Center>;
  course: Course;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  id_group: Scalars['Number'];
  instructors: Array<Instructor>;
  modality: GroupModality;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  students: Array<Student>;
  timetable: Array<Timetable>;
  type: GroupType;
};

export type GroupInfo = {
  __typename?: 'GroupInfo';
  group: Group;
  totalStudents: Scalars['Number'];
};

export enum GroupModality {
  Online = 'ONLINE',
  OnSite = 'ON_SITE',
  SemiPresential = 'SEMI_PRESENTIAL'
}

export enum GroupType {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export type Instructor = {
  __typename?: 'Instructor';
  active: Scalars['Boolean'];
  areas: Array<Scalars['String']>;
  availability: Array<Availability>;
  corporateEmail?: Maybe<Scalars['String']>;
  enrolled: Scalars['Boolean'];
  geographicalAvailability: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['ID'];
  knowledge?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Languages>>;
  materialsExperience?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  personalEmail?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  platformEducationExperience?: Maybe<Array<Scalars['String']>>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars['Boolean'];
  summerAvailability?: Maybe<SummerAvailabilityInstructor>;
  training: TrainingInstructor;
  urlCV?: Maybe<Scalars['String']>;
  vehicle: TypeVehicleInstructor;
};

export enum Languages {
  English = 'English',
  Spanish = 'Spanish'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCenterContact: CenterContact;
  addStudentContact: StudentContact;
  createCenter: Center;
  createGroup: Group;
  createInstructor: Instructor;
  createStudent: Student;
  deleteCenter: Center;
  deleteGroup: Group;
  deleteInstructor: Instructor;
  deleteStudent: Student;
  editCenter: Center;
  editCenterContact: CenterContact;
  editGroup: Group;
  editInstructor: Instructor;
  editStudent: Student;
  editStudentContact: StudentContact;
  setActiveCenter: Center;
  setStatusStudent: Student;
};


export type MutationAddCenterContactArgs = {
  email: Scalars['String'];
  idCenter: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationAddStudentContactArgs = {
  email: Scalars['String'];
  idStudent: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  send_info: Scalars['Boolean'];
};


export type MutationCreateCenterArgs = {
  address: Scalars['String'];
  city: Scalars['String'];
  contacts?: InputMaybe<Array<CenterContactInput>>;
  email?: InputMaybe<Scalars['String']>;
  languages: Array<Languages>;
  name: Scalars['String'];
  nature: CenterNature;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type: Array<CenterActivityType>;
};


export type MutationCreateGroupArgs = {
  idCenter: Scalars['String'];
  instructors?: InputMaybe<Array<Scalars['String']>>;
  modality: GroupModality;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  timetable: Array<TimetableInput>;
  type: GroupType;
};


export type MutationCreateInstructorArgs = {
  areas: Array<Scalars['String']>;
  availability: Array<AvailabilityInput>;
  corporateEmail?: InputMaybe<Scalars['String']>;
  enrolled: Scalars['Boolean'];
  geographicalAvailability: Scalars['String'];
  groups: Array<Scalars['String']>;
  knowledge?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<Languages>>;
  materialsExperience?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  personalEmail?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  platformEducationExperience?: InputMaybe<Array<Scalars['String']>>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars['Boolean'];
  summerAvailability?: InputMaybe<SummerAvailabilityInstructor>;
  training: TrainingInstructorInput;
  urlCV?: InputMaybe<Scalars['String']>;
  vehicle: TypeVehicleInstructor;
};


export type MutationCreateStudentArgs = {
  allergies?: InputMaybe<Scalars['Boolean']>;
  birthDate?: InputMaybe<Scalars['String']>;
  collectionPermit?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<StudentContactInput>>;
  course: Scalars['String'];
  descriptionAllergy?: InputMaybe<Scalars['String']>;
  goesAlone?: InputMaybe<Scalars['Boolean']>;
  idGroups: Array<Scalars['String']>;
  imageAuthorisation?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  oldStudent?: InputMaybe<Scalars['Boolean']>;
  registrationDate?: InputMaybe<Scalars['String']>;
  signedMandate?: InputMaybe<Scalars['Boolean']>;
};


export type MutationDeleteCenterArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationDeleteInstructorArgs = {
  id: Scalars['String'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['String'];
};


export type MutationEditCenterArgs = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<CenterContactInput>>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  languages?: InputMaybe<Array<Languages>>;
  name?: InputMaybe<Scalars['String']>;
  nature?: InputMaybe<CenterNature>;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<CenterActivityType>>;
};


export type MutationEditCenterContactArgs = {
  email?: InputMaybe<Scalars['String']>;
  idCenter: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  originEmail: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationEditGroupArgs = {
  center?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  instructors?: InputMaybe<Array<Scalars['String']>>;
  modality?: InputMaybe<GroupModality>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  timetable?: InputMaybe<Array<TimetableInput>>;
  type?: InputMaybe<GroupType>;
};


export type MutationEditInstructorArgs = {
  areas?: InputMaybe<Array<Scalars['String']>>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  corporateEmail?: InputMaybe<Scalars['String']>;
  enrolled?: InputMaybe<Scalars['Boolean']>;
  geographicalAvailability?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  knowledge?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<Languages>>;
  materialsExperience?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  personalEmail?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  platformEducationExperience?: InputMaybe<Array<Scalars['String']>>;
  previousExperience?: InputMaybe<PreviousExperienceInstructor>;
  programmingExperience?: InputMaybe<Scalars['Boolean']>;
  summerAvailability?: InputMaybe<SummerAvailabilityInstructor>;
  training?: InputMaybe<TrainingInstructorInput>;
  urlCV?: InputMaybe<Scalars['String']>;
  vehicle?: InputMaybe<TypeVehicleInstructor>;
};


export type MutationEditStudentArgs = {
  allergies?: InputMaybe<Scalars['Boolean']>;
  birthDate?: InputMaybe<Scalars['String']>;
  collectionPermit?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<StudentContactInput>>;
  course?: InputMaybe<Scalars['String']>;
  descriptionAllergy?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  imageAuthorisation?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  oldStudent?: InputMaybe<Scalars['Boolean']>;
  registrationDate?: InputMaybe<Scalars['String']>;
  signedMandate?: InputMaybe<Scalars['Boolean']>;
};


export type MutationEditStudentContactArgs = {
  email?: InputMaybe<Scalars['String']>;
  idStudent: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  originEmail: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  send_info?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSetActiveCenterArgs = {
  active: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationSetStatusStudentArgs = {
  enrolled: Scalars['Boolean'];
  id: Scalars['String'];
};

export enum OrderFilterCenter {
  City = 'city',
  Languages = 'languages',
  Name = 'name',
  Nature = 'nature',
  Type = 'type'
}

export enum OrderFilterGroup {
  Center = 'center',
  Course = 'course',
  End = 'end',
  IdDay = 'id_day',
  IdGroup = 'id_group',
  Instructors = 'instructors',
  Modality = 'modality',
  Start = 'start'
}

export enum OrderFilterInstructor {
  Areas = 'areas',
  Center = 'center',
  IdDay = 'id_day',
  IdGroup = 'id_group',
  Languages = 'languages',
  Name = 'name',
  State = 'state',
  SummerAvailability = 'summerAvailability',
  Vehicle = 'vehicle'
}

export enum OrderFilterStudent {
  Center = 'center',
  Course = 'course',
  Group = 'group',
  Name = 'name',
  State = 'state'
}

export type PaginatedCenters = {
  __typename?: 'PaginatedCenters';
  data: Array<Center>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalNumber: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PaginatedGroups = {
  __typename?: 'PaginatedGroups';
  data: Array<Group>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalNumber: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PaginatedInstructors = {
  __typename?: 'PaginatedInstructors';
  data: Array<Instructor>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalNumber: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PaginatedStudents = {
  __typename?: 'PaginatedStudents';
  data: Array<Student>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  totalNumber: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  checkCorporateEmail: Scalars['String'];
  getCenter: CenterInfo;
  getCenters: PaginatedCenters;
  getGroup: GroupInfo;
  getGroups: PaginatedGroups;
  getInstructor: Instructor;
  getInstructors: PaginatedInstructors;
  getStudent: Student;
  getStudents: PaginatedStudents;
};


export type QueryCheckCorporateEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetCenterArgs = {
  id: Scalars['String'];
};


export type QueryGetCentersArgs = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterCenter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};


export type QueryGetGroupArgs = {
  id: Scalars['String'];
};


export type QueryGetGroupsArgs = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterGroup>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};


export type QueryGetInstructorArgs = {
  id: Scalars['String'];
};


export type QueryGetInstructorsArgs = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterInstructor>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};


export type QueryGetStudentArgs = {
  id: Scalars['String'];
};


export type QueryGetStudentsArgs = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterStudent>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  active: Scalars['Boolean'];
  allergies?: Maybe<Scalars['Boolean']>;
  birthDate?: Maybe<Scalars['String']>;
  collectionPermit?: Maybe<Scalars['String']>;
  contacts?: Maybe<Array<StudentContact>>;
  course: Scalars['String'];
  descriptionAllergy?: Maybe<Scalars['String']>;
  enrolled: Scalars['Boolean'];
  goesAlone?: Maybe<Scalars['Boolean']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  imageAuthorisation?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  oldStudent?: Maybe<Scalars['Boolean']>;
  registrationDate?: Maybe<Scalars['String']>;
  signedMandate?: Maybe<Scalars['Boolean']>;
};

export type StudentContact = {
  __typename?: 'StudentContact';
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  send_info: Scalars['Boolean'];
};

export type StudentContactInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  send_info: Scalars['Boolean'];
};

export type Timetable = {
  __typename?: 'Timetable';
  day: Days;
  end: Scalars['String'];
  id_day: Scalars['Number'];
  start: Scalars['String'];
};

export type TimetableInput = {
  day: Days;
  end: Scalars['String'];
  start: Scalars['String'];
};

export enum TypeVehicleInstructor {
  Own = 'OWN',
  PublicTransport = 'PUBLIC_TRANSPORT'
}

export enum PreviousExperienceInstructor {
  No = 'NO',
  NoButInterested = 'NO_BUT_INTERESTED',
  Yes = 'YES'
}

export enum SummerAvailabilityInstructor {
  ExtracurricularsOnly = 'EXTRACURRICULARS_ONLY',
  No = 'NO',
  Yes = 'YES'
}

export type TrainingInstructor = {
  __typename?: 'trainingInstructor';
  careerInEducation?: Maybe<Scalars['Boolean']>;
  technicalCareer?: Maybe<Scalars['Boolean']>;
};

export type TrainingInstructorInput = {
  careerInEducation?: InputMaybe<Scalars['Boolean']>;
  technicalCareer?: InputMaybe<Scalars['Boolean']>;
};

export type CreateCenterMutationVariables = Exact<{
  name: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  type: Array<CenterActivityType> | CenterActivityType;
  nature: CenterNature;
  languages: Array<Languages> | Languages;
  phone?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  contacts: Array<CenterContactInput> | CenterContactInput;
}>;


export type CreateCenterMutation = { __typename?: 'Mutation', createCenter: { __typename?: 'Center', id: string } };

export type SetActiveCenterMutationVariables = Exact<{
  setActiveCenterId: Scalars['String'];
  active: Scalars['Boolean'];
}>;


export type SetActiveCenterMutation = { __typename?: 'Mutation', setActiveCenter: { __typename?: 'Center', id: string } };

export type GetCentersFQueryVariables = Exact<{
  searchText?: InputMaybe<Scalars['String']>;
  orderFilter?: InputMaybe<OrderFilterCenter>;
  order?: InputMaybe<Scalars['Number']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type GetCentersFQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', page: number, pageSize: number, totalPages: number, totalNumber: number, data: Array<{ __typename?: 'Center', id: string, name: string, languages: Array<Languages>, city: string, nature: CenterNature, type: Array<CenterActivityType>, active: boolean }> } };

export type DeleteCenterMutationVariables = Exact<{
  deleteCenterId: Scalars['String'];
}>;


export type DeleteCenterMutation = { __typename?: 'Mutation', deleteCenter: { __typename?: 'Center', id: string } };

export type EditCenterMutationVariables = Exact<{
  editCenterId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<CenterActivityType> | CenterActivityType>;
  nature?: InputMaybe<CenterNature>;
  languages?: InputMaybe<Array<Languages> | Languages>;
  contacts?: InputMaybe<Array<CenterContactInput> | CenterContactInput>;
  notes?: InputMaybe<Scalars['String']>;
}>;


export type EditCenterMutation = { __typename?: 'Mutation', editCenter: { __typename?: 'Center', id: string } };

export type EditGroupMutationVariables = Exact<{
  editGroupId: Scalars['String'];
  instructors?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  center?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  timetable?: InputMaybe<Array<TimetableInput> | TimetableInput>;
  type?: InputMaybe<GroupType>;
  modality?: InputMaybe<GroupModality>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type EditGroupMutation = { __typename?: 'Mutation', editGroup: { __typename?: 'Group', id: string } };

export type GetCenterQueryVariables = Exact<{
  getCenterId: Scalars['String'];
}>;


export type GetCenterQuery = { __typename?: 'Query', getCenter: { __typename?: 'CenterInfo', totalStudents: any, totalGroups: any, center: { __typename?: 'Center', id: string, active: boolean, type: Array<CenterActivityType>, nature: CenterNature, languages: Array<Languages>, name: string, address: string, city: string, phone?: string | null, email?: string | null, notes?: string | null, createdAt: string, contacts?: Array<{ __typename?: 'CenterContact', name: string, email: string, phone: string }> | null } } };

export type GetGroupQueryVariables = Exact<{
  getGroupId: Scalars['String'];
}>;


export type GetGroupQuery = { __typename?: 'Query', getGroup: { __typename?: 'GroupInfo', totalStudents: any, group: { __typename?: 'Group', name: string, modality: GroupModality, type: GroupType, notes?: string | null, createdAt: string, course: { __typename?: 'Course', EPO: Array<string>, ESO: Array<string> }, center?: { __typename?: 'Center', id: string, name: string } | null, instructors: Array<{ __typename?: 'Instructor', name: string, id: string }>, timetable: Array<{ __typename?: 'Timetable', id_day: any, day: Days, start: string, end: string }> } } };

export type CreateGroupMutationVariables = Exact<{
  idCenter: Scalars['String'];
  name: Scalars['String'];
  modality: GroupModality;
  type: GroupType;
  timetable: Array<TimetableInput> | TimetableInput;
  instructors?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', name: string, id_group: any } };

export type GetGroupsQueryVariables = Exact<{
  searchText?: InputMaybe<Scalars['String']>;
  orderFilter?: InputMaybe<OrderFilterGroup>;
  order?: InputMaybe<Scalars['Number']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type GetGroupsQuery = { __typename?: 'Query', getGroups: { __typename?: 'PaginatedGroups', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, active: boolean, timetable: Array<{ __typename?: 'Timetable', day: Days, id_day: any, start: string, end: string }>, center?: { __typename?: 'Center', name: string } | null, instructors: Array<{ __typename?: 'Instructor', name: string }> }> } };

export type CreateInstructorMutationVariables = Exact<{
  name: Scalars['String'];
  corporateEmail: Scalars['String'];
  personalEmail: Scalars['String'];
  phone: Scalars['String'];
  enrolled: Scalars['Boolean'];
  training: TrainingInstructorInput;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars['Boolean'];
  knowledge: Scalars['String'];
  urlCv: Scalars['String'];
  materialsExperience: Array<Scalars['String']> | Scalars['String'];
  platformEducationExperience: Array<Scalars['String']> | Scalars['String'];
  languages: Array<Languages> | Languages;
  availability: Array<AvailabilityInput> | AvailabilityInput;
  summerAvailability: SummerAvailabilityInstructor;
  vehicle: TypeVehicleInstructor;
  geographicalAvailability: Scalars['String'];
  areas: Array<Scalars['String']> | Scalars['String'];
  groups: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateInstructorMutation = { __typename?: 'Mutation', createInstructor: { __typename?: 'Instructor', name: string, id: string } };

export type GetInstructorsQueryVariables = Exact<{
  searchText?: InputMaybe<Scalars['String']>;
  orderFilter?: InputMaybe<OrderFilterInstructor>;
  order?: InputMaybe<Scalars['Number']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type GetInstructorsQuery = { __typename?: 'Query', getInstructors: { __typename?: 'PaginatedInstructors', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Instructor', id: string, name: string, geographicalAvailability: string, enrolled: boolean, active: boolean, vehicle: TypeVehicleInstructor, languages?: Array<Languages> | null, summerAvailability?: SummerAvailabilityInstructor | null, areas: Array<string>, availability: Array<{ __typename?: 'Availability', day: Days }>, groups: Array<{ __typename?: 'Group', name: string, id: string, id_group: any }> }> } };

export type SimpleCentersNameQueryVariables = Exact<{ [key: string]: never; }>;


export type SimpleCentersNameQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', data: Array<{ __typename?: 'Center', name: string, id: string, active: boolean }> } };

export type SimpleGroupsNameQueryVariables = Exact<{ [key: string]: never; }>;


export type SimpleGroupsNameQuery = { __typename?: 'Query', getGroups: { __typename?: 'PaginatedGroups', data: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, center?: { __typename?: 'Center', id: string } | null }> } };

export type SimpleInstructorsNameQueryVariables = Exact<{ [key: string]: never; }>;


export type SimpleInstructorsNameQuery = { __typename?: 'Query', getInstructors: { __typename?: 'PaginatedInstructors', data: Array<{ __typename?: 'Instructor', name: string, id: string }> } };

export type CreateStudentMutationVariables = Exact<{
  name: Scalars['String'];
  birthDate: Scalars['String'];
  course: Scalars['String'];
  allergies: Scalars['Boolean'];
  oldStudent: Scalars['Boolean'];
  signedMandate: Scalars['Boolean'];
  imageAuthorisation: Scalars['Boolean'];
  collectionPermit: Scalars['String'];
  goesAlone: Scalars['Boolean'];
  contacts: Array<StudentContactInput> | StudentContactInput;
  descriptionAllergy?: InputMaybe<Scalars['String']>;
  registrationDate: Scalars['String'];
  idGroups: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', name: string, id: string } };

export type GetStudentsQueryVariables = Exact<{
  searchText?: InputMaybe<Scalars['String']>;
  orderFilter?: InputMaybe<OrderFilterStudent>;
  order?: InputMaybe<Scalars['Number']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type GetStudentsQuery = { __typename?: 'Query', getStudents: { __typename?: 'PaginatedStudents', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Student', id: string, name: string, active: boolean, course: string, enrolled: boolean, groups: Array<{ __typename?: 'Group', name: string, id: string }> }> } };


export const CreateCenterDocument = gql`
    mutation CreateCenter($name: String!, $address: String!, $city: String!, $type: [CenterActivityType!]!, $nature: CenterNature!, $languages: [Languages!]!, $phone: String, $email: String, $contacts: [CenterContactInput!]!) {
  createCenter(
    name: $name
    address: $address
    city: $city
    type: $type
    nature: $nature
    languages: $languages
    phone: $phone
    email: $email
    contacts: $contacts
  ) {
    id
  }
}
    `;
export type CreateCenterMutationFn = Apollo.MutationFunction<CreateCenterMutation, CreateCenterMutationVariables>;

/**
 * __useCreateCenterMutation__
 *
 * To run a mutation, you first call `useCreateCenterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCenterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCenterMutation, { data, loading, error }] = useCreateCenterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      type: // value for 'type'
 *      nature: // value for 'nature'
 *      languages: // value for 'languages'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      contacts: // value for 'contacts'
 *   },
 * });
 */
export function useCreateCenterMutation(baseOptions?: Apollo.MutationHookOptions<CreateCenterMutation, CreateCenterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCenterMutation, CreateCenterMutationVariables>(CreateCenterDocument, options);
      }
export type CreateCenterMutationHookResult = ReturnType<typeof useCreateCenterMutation>;
export type CreateCenterMutationResult = Apollo.MutationResult<CreateCenterMutation>;
export type CreateCenterMutationOptions = Apollo.BaseMutationOptions<CreateCenterMutation, CreateCenterMutationVariables>;
export const SetActiveCenterDocument = gql`
    mutation SetActiveCenter($setActiveCenterId: String!, $active: Boolean!) {
  setActiveCenter(id: $setActiveCenterId, active: $active) {
    id
  }
}
    `;
export type SetActiveCenterMutationFn = Apollo.MutationFunction<SetActiveCenterMutation, SetActiveCenterMutationVariables>;

/**
 * __useSetActiveCenterMutation__
 *
 * To run a mutation, you first call `useSetActiveCenterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetActiveCenterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setActiveCenterMutation, { data, loading, error }] = useSetActiveCenterMutation({
 *   variables: {
 *      setActiveCenterId: // value for 'setActiveCenterId'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useSetActiveCenterMutation(baseOptions?: Apollo.MutationHookOptions<SetActiveCenterMutation, SetActiveCenterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetActiveCenterMutation, SetActiveCenterMutationVariables>(SetActiveCenterDocument, options);
      }
export type SetActiveCenterMutationHookResult = ReturnType<typeof useSetActiveCenterMutation>;
export type SetActiveCenterMutationResult = Apollo.MutationResult<SetActiveCenterMutation>;
export type SetActiveCenterMutationOptions = Apollo.BaseMutationOptions<SetActiveCenterMutation, SetActiveCenterMutationVariables>;
export const GetCentersFDocument = gql`
    query GetCentersF($searchText: String, $orderFilter: OrderFilterCenter, $order: Number, $page: Int, $pageSize: Int) {
  getCenters(
    searchText: $searchText
    orderFilter: $orderFilter
    order: $order
    page: $page
    pageSize: $pageSize
  ) {
    page
    pageSize
    totalPages
    totalNumber
    data {
      id
      name
      languages
      city
      nature
      type
      active
    }
  }
}
    `;

/**
 * __useGetCentersFQuery__
 *
 * To run a query within a React component, call `useGetCentersFQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCentersFQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCentersFQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      orderFilter: // value for 'orderFilter'
 *      order: // value for 'order'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetCentersFQuery(baseOptions?: Apollo.QueryHookOptions<GetCentersFQuery, GetCentersFQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCentersFQuery, GetCentersFQueryVariables>(GetCentersFDocument, options);
      }
export function useGetCentersFLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCentersFQuery, GetCentersFQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCentersFQuery, GetCentersFQueryVariables>(GetCentersFDocument, options);
        }
export type GetCentersFQueryHookResult = ReturnType<typeof useGetCentersFQuery>;
export type GetCentersFLazyQueryHookResult = ReturnType<typeof useGetCentersFLazyQuery>;
export type GetCentersFQueryResult = Apollo.QueryResult<GetCentersFQuery, GetCentersFQueryVariables>;
export const DeleteCenterDocument = gql`
    mutation DeleteCenter($deleteCenterId: String!) {
  deleteCenter(id: $deleteCenterId) {
    id
  }
}
    `;
export type DeleteCenterMutationFn = Apollo.MutationFunction<DeleteCenterMutation, DeleteCenterMutationVariables>;

/**
 * __useDeleteCenterMutation__
 *
 * To run a mutation, you first call `useDeleteCenterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCenterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCenterMutation, { data, loading, error }] = useDeleteCenterMutation({
 *   variables: {
 *      deleteCenterId: // value for 'deleteCenterId'
 *   },
 * });
 */
export function useDeleteCenterMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCenterMutation, DeleteCenterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCenterMutation, DeleteCenterMutationVariables>(DeleteCenterDocument, options);
      }
export type DeleteCenterMutationHookResult = ReturnType<typeof useDeleteCenterMutation>;
export type DeleteCenterMutationResult = Apollo.MutationResult<DeleteCenterMutation>;
export type DeleteCenterMutationOptions = Apollo.BaseMutationOptions<DeleteCenterMutation, DeleteCenterMutationVariables>;
export const EditCenterDocument = gql`
    mutation EditCenter($editCenterId: String!, $name: String, $address: String, $city: String, $phone: String, $email: String, $type: [CenterActivityType!], $nature: CenterNature, $languages: [Languages!], $contacts: [CenterContactInput!], $notes: String) {
  editCenter(
    id: $editCenterId
    name: $name
    address: $address
    city: $city
    phone: $phone
    email: $email
    type: $type
    nature: $nature
    languages: $languages
    contacts: $contacts
    notes: $notes
  ) {
    id
  }
}
    `;
export type EditCenterMutationFn = Apollo.MutationFunction<EditCenterMutation, EditCenterMutationVariables>;

/**
 * __useEditCenterMutation__
 *
 * To run a mutation, you first call `useEditCenterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCenterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCenterMutation, { data, loading, error }] = useEditCenterMutation({
 *   variables: {
 *      editCenterId: // value for 'editCenterId'
 *      name: // value for 'name'
 *      address: // value for 'address'
 *      city: // value for 'city'
 *      phone: // value for 'phone'
 *      email: // value for 'email'
 *      type: // value for 'type'
 *      nature: // value for 'nature'
 *      languages: // value for 'languages'
 *      contacts: // value for 'contacts'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useEditCenterMutation(baseOptions?: Apollo.MutationHookOptions<EditCenterMutation, EditCenterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCenterMutation, EditCenterMutationVariables>(EditCenterDocument, options);
      }
export type EditCenterMutationHookResult = ReturnType<typeof useEditCenterMutation>;
export type EditCenterMutationResult = Apollo.MutationResult<EditCenterMutation>;
export type EditCenterMutationOptions = Apollo.BaseMutationOptions<EditCenterMutation, EditCenterMutationVariables>;
export const EditGroupDocument = gql`
    mutation EditGroup($editGroupId: String!, $instructors: [String!], $center: String, $notes: String, $timetable: [TimetableInput!], $type: GroupType, $modality: GroupModality, $name: String) {
  editGroup(
    id: $editGroupId
    instructors: $instructors
    center: $center
    notes: $notes
    timetable: $timetable
    type: $type
    modality: $modality
    name: $name
  ) {
    id
  }
}
    `;
export type EditGroupMutationFn = Apollo.MutationFunction<EditGroupMutation, EditGroupMutationVariables>;

/**
 * __useEditGroupMutation__
 *
 * To run a mutation, you first call `useEditGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editGroupMutation, { data, loading, error }] = useEditGroupMutation({
 *   variables: {
 *      editGroupId: // value for 'editGroupId'
 *      instructors: // value for 'instructors'
 *      center: // value for 'center'
 *      notes: // value for 'notes'
 *      timetable: // value for 'timetable'
 *      type: // value for 'type'
 *      modality: // value for 'modality'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEditGroupMutation(baseOptions?: Apollo.MutationHookOptions<EditGroupMutation, EditGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditGroupMutation, EditGroupMutationVariables>(EditGroupDocument, options);
      }
export type EditGroupMutationHookResult = ReturnType<typeof useEditGroupMutation>;
export type EditGroupMutationResult = Apollo.MutationResult<EditGroupMutation>;
export type EditGroupMutationOptions = Apollo.BaseMutationOptions<EditGroupMutation, EditGroupMutationVariables>;
export const GetCenterDocument = gql`
    query GetCenter($getCenterId: String!) {
  getCenter(id: $getCenterId) {
    center {
      id
      active
      type
      nature
      languages
      name
      address
      city
      phone
      email
      contacts {
        name
        email
        phone
      }
      notes
      createdAt
    }
    totalStudents
    totalGroups
  }
}
    `;

/**
 * __useGetCenterQuery__
 *
 * To run a query within a React component, call `useGetCenterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCenterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCenterQuery({
 *   variables: {
 *      getCenterId: // value for 'getCenterId'
 *   },
 * });
 */
export function useGetCenterQuery(baseOptions: Apollo.QueryHookOptions<GetCenterQuery, GetCenterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCenterQuery, GetCenterQueryVariables>(GetCenterDocument, options);
      }
export function useGetCenterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCenterQuery, GetCenterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCenterQuery, GetCenterQueryVariables>(GetCenterDocument, options);
        }
export type GetCenterQueryHookResult = ReturnType<typeof useGetCenterQuery>;
export type GetCenterLazyQueryHookResult = ReturnType<typeof useGetCenterLazyQuery>;
export type GetCenterQueryResult = Apollo.QueryResult<GetCenterQuery, GetCenterQueryVariables>;
export const GetGroupDocument = gql`
    query GetGroup($getGroupId: String!) {
  getGroup(id: $getGroupId) {
    group {
      course {
        EPO
        ESO
      }
      center {
        id
        name
      }
      name
      modality
      type
      instructors {
        name
        id
      }
      notes
      createdAt
      timetable {
        id_day
        day
        start
        end
      }
    }
    totalStudents
  }
}
    `;

/**
 * __useGetGroupQuery__
 *
 * To run a query within a React component, call `useGetGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupQuery({
 *   variables: {
 *      getGroupId: // value for 'getGroupId'
 *   },
 * });
 */
export function useGetGroupQuery(baseOptions: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
      }
export function useGetGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
        }
export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>;
export type GetGroupLazyQueryHookResult = ReturnType<typeof useGetGroupLazyQuery>;
export type GetGroupQueryResult = Apollo.QueryResult<GetGroupQuery, GetGroupQueryVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($idCenter: String!, $name: String!, $modality: GroupModality!, $type: GroupType!, $timetable: [TimetableInput!]!, $instructors: [String!]) {
  createGroup(
    idCenter: $idCenter
    name: $name
    modality: $modality
    type: $type
    timetable: $timetable
    instructors: $instructors
  ) {
    name
    id_group
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      idCenter: // value for 'idCenter'
 *      name: // value for 'name'
 *      modality: // value for 'modality'
 *      type: // value for 'type'
 *      timetable: // value for 'timetable'
 *      instructors: // value for 'instructors'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const GetGroupsDocument = gql`
    query GetGroups($searchText: String, $orderFilter: OrderFilterGroup, $order: Number, $page: Int, $pageSize: Int) {
  getGroups(
    searchText: $searchText
    orderFilter: $orderFilter
    order: $order
    page: $page
    pageSize: $pageSize
  ) {
    page
    totalPages
    totalNumber
    pageSize
    data {
      id
      id_group
      name
      active
      timetable {
        day
        id_day
        start
        end
      }
      center {
        name
      }
      instructors {
        name
      }
    }
  }
}
    `;

/**
 * __useGetGroupsQuery__
 *
 * To run a query within a React component, call `useGetGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupsQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      orderFilter: // value for 'orderFilter'
 *      order: // value for 'order'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupsQuery, GetGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument, options);
      }
export function useGetGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupsQuery, GetGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument, options);
        }
export type GetGroupsQueryHookResult = ReturnType<typeof useGetGroupsQuery>;
export type GetGroupsLazyQueryHookResult = ReturnType<typeof useGetGroupsLazyQuery>;
export type GetGroupsQueryResult = Apollo.QueryResult<GetGroupsQuery, GetGroupsQueryVariables>;
export const CreateInstructorDocument = gql`
    mutation CreateInstructor($name: String!, $corporateEmail: String!, $personalEmail: String!, $phone: String!, $enrolled: Boolean!, $training: trainingInstructorInput!, $previousExperience: previousExperienceInstructor!, $programmingExperience: Boolean!, $knowledge: String!, $urlCv: String!, $materialsExperience: [String!]!, $platformEducationExperience: [String!]!, $languages: [Languages!]!, $availability: [AvailabilityInput!]!, $summerAvailability: summerAvailabilityInstructor!, $vehicle: TypeVehicleInstructor!, $geographicalAvailability: String!, $areas: [String!]!, $groups: [String!]!) {
  createInstructor(
    name: $name
    corporateEmail: $corporateEmail
    personalEmail: $personalEmail
    phone: $phone
    enrolled: $enrolled
    training: $training
    previousExperience: $previousExperience
    programmingExperience: $programmingExperience
    knowledge: $knowledge
    urlCV: $urlCv
    materialsExperience: $materialsExperience
    platformEducationExperience: $platformEducationExperience
    languages: $languages
    availability: $availability
    summerAvailability: $summerAvailability
    vehicle: $vehicle
    geographicalAvailability: $geographicalAvailability
    areas: $areas
    groups: $groups
  ) {
    name
    id
  }
}
    `;
export type CreateInstructorMutationFn = Apollo.MutationFunction<CreateInstructorMutation, CreateInstructorMutationVariables>;

/**
 * __useCreateInstructorMutation__
 *
 * To run a mutation, you first call `useCreateInstructorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInstructorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInstructorMutation, { data, loading, error }] = useCreateInstructorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      corporateEmail: // value for 'corporateEmail'
 *      personalEmail: // value for 'personalEmail'
 *      phone: // value for 'phone'
 *      enrolled: // value for 'enrolled'
 *      training: // value for 'training'
 *      previousExperience: // value for 'previousExperience'
 *      programmingExperience: // value for 'programmingExperience'
 *      knowledge: // value for 'knowledge'
 *      urlCv: // value for 'urlCv'
 *      materialsExperience: // value for 'materialsExperience'
 *      platformEducationExperience: // value for 'platformEducationExperience'
 *      languages: // value for 'languages'
 *      availability: // value for 'availability'
 *      summerAvailability: // value for 'summerAvailability'
 *      vehicle: // value for 'vehicle'
 *      geographicalAvailability: // value for 'geographicalAvailability'
 *      areas: // value for 'areas'
 *      groups: // value for 'groups'
 *   },
 * });
 */
export function useCreateInstructorMutation(baseOptions?: Apollo.MutationHookOptions<CreateInstructorMutation, CreateInstructorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInstructorMutation, CreateInstructorMutationVariables>(CreateInstructorDocument, options);
      }
export type CreateInstructorMutationHookResult = ReturnType<typeof useCreateInstructorMutation>;
export type CreateInstructorMutationResult = Apollo.MutationResult<CreateInstructorMutation>;
export type CreateInstructorMutationOptions = Apollo.BaseMutationOptions<CreateInstructorMutation, CreateInstructorMutationVariables>;
export const GetInstructorsDocument = gql`
    query GetInstructors($searchText: String, $orderFilter: OrderFilterInstructor, $order: Number, $page: Int, $pageSize: Int) {
  getInstructors(
    searchText: $searchText
    orderFilter: $orderFilter
    order: $order
    page: $page
    pageSize: $pageSize
  ) {
    page
    totalPages
    totalNumber
    pageSize
    data {
      id
      name
      geographicalAvailability
      enrolled
      active
      availability {
        day
      }
      vehicle
      languages
      summerAvailability
      areas
      groups {
        name
        id
        id_group
      }
    }
  }
}
    `;

/**
 * __useGetInstructorsQuery__
 *
 * To run a query within a React component, call `useGetInstructorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInstructorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInstructorsQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      orderFilter: // value for 'orderFilter'
 *      order: // value for 'order'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetInstructorsQuery(baseOptions?: Apollo.QueryHookOptions<GetInstructorsQuery, GetInstructorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInstructorsQuery, GetInstructorsQueryVariables>(GetInstructorsDocument, options);
      }
export function useGetInstructorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInstructorsQuery, GetInstructorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInstructorsQuery, GetInstructorsQueryVariables>(GetInstructorsDocument, options);
        }
export type GetInstructorsQueryHookResult = ReturnType<typeof useGetInstructorsQuery>;
export type GetInstructorsLazyQueryHookResult = ReturnType<typeof useGetInstructorsLazyQuery>;
export type GetInstructorsQueryResult = Apollo.QueryResult<GetInstructorsQuery, GetInstructorsQueryVariables>;
export const SimpleCentersNameDocument = gql`
    query SimpleCentersName {
  getCenters {
    data {
      name
      id
      active
    }
  }
}
    `;

/**
 * __useSimpleCentersNameQuery__
 *
 * To run a query within a React component, call `useSimpleCentersNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleCentersNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleCentersNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimpleCentersNameQuery(baseOptions?: Apollo.QueryHookOptions<SimpleCentersNameQuery, SimpleCentersNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SimpleCentersNameQuery, SimpleCentersNameQueryVariables>(SimpleCentersNameDocument, options);
      }
export function useSimpleCentersNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimpleCentersNameQuery, SimpleCentersNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SimpleCentersNameQuery, SimpleCentersNameQueryVariables>(SimpleCentersNameDocument, options);
        }
export type SimpleCentersNameQueryHookResult = ReturnType<typeof useSimpleCentersNameQuery>;
export type SimpleCentersNameLazyQueryHookResult = ReturnType<typeof useSimpleCentersNameLazyQuery>;
export type SimpleCentersNameQueryResult = Apollo.QueryResult<SimpleCentersNameQuery, SimpleCentersNameQueryVariables>;
export const SimpleGroupsNameDocument = gql`
    query simpleGroupsName {
  getGroups {
    data {
      center {
        id
      }
      id
      id_group
      name
    }
  }
}
    `;

/**
 * __useSimpleGroupsNameQuery__
 *
 * To run a query within a React component, call `useSimpleGroupsNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleGroupsNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleGroupsNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimpleGroupsNameQuery(baseOptions?: Apollo.QueryHookOptions<SimpleGroupsNameQuery, SimpleGroupsNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SimpleGroupsNameQuery, SimpleGroupsNameQueryVariables>(SimpleGroupsNameDocument, options);
      }
export function useSimpleGroupsNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimpleGroupsNameQuery, SimpleGroupsNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SimpleGroupsNameQuery, SimpleGroupsNameQueryVariables>(SimpleGroupsNameDocument, options);
        }
export type SimpleGroupsNameQueryHookResult = ReturnType<typeof useSimpleGroupsNameQuery>;
export type SimpleGroupsNameLazyQueryHookResult = ReturnType<typeof useSimpleGroupsNameLazyQuery>;
export type SimpleGroupsNameQueryResult = Apollo.QueryResult<SimpleGroupsNameQuery, SimpleGroupsNameQueryVariables>;
export const SimpleInstructorsNameDocument = gql`
    query SimpleInstructorsName {
  getInstructors {
    data {
      name
      id
    }
  }
}
    `;

/**
 * __useSimpleInstructorsNameQuery__
 *
 * To run a query within a React component, call `useSimpleInstructorsNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleInstructorsNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleInstructorsNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimpleInstructorsNameQuery(baseOptions?: Apollo.QueryHookOptions<SimpleInstructorsNameQuery, SimpleInstructorsNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SimpleInstructorsNameQuery, SimpleInstructorsNameQueryVariables>(SimpleInstructorsNameDocument, options);
      }
export function useSimpleInstructorsNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimpleInstructorsNameQuery, SimpleInstructorsNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SimpleInstructorsNameQuery, SimpleInstructorsNameQueryVariables>(SimpleInstructorsNameDocument, options);
        }
export type SimpleInstructorsNameQueryHookResult = ReturnType<typeof useSimpleInstructorsNameQuery>;
export type SimpleInstructorsNameLazyQueryHookResult = ReturnType<typeof useSimpleInstructorsNameLazyQuery>;
export type SimpleInstructorsNameQueryResult = Apollo.QueryResult<SimpleInstructorsNameQuery, SimpleInstructorsNameQueryVariables>;
export const CreateStudentDocument = gql`
    mutation CreateStudent($name: String!, $birthDate: String!, $course: String!, $allergies: Boolean!, $oldStudent: Boolean!, $signedMandate: Boolean!, $imageAuthorisation: Boolean!, $collectionPermit: String!, $goesAlone: Boolean!, $contacts: [StudentContactInput!]!, $descriptionAllergy: String, $registrationDate: String!, $idGroups: [String!]!) {
  createStudent(
    name: $name
    birthDate: $birthDate
    course: $course
    allergies: $allergies
    oldStudent: $oldStudent
    signedMandate: $signedMandate
    imageAuthorisation: $imageAuthorisation
    collectionPermit: $collectionPermit
    goesAlone: $goesAlone
    contacts: $contacts
    descriptionAllergy: $descriptionAllergy
    registrationDate: $registrationDate
    idGroups: $idGroups
  ) {
    name
    id
  }
}
    `;
export type CreateStudentMutationFn = Apollo.MutationFunction<CreateStudentMutation, CreateStudentMutationVariables>;

/**
 * __useCreateStudentMutation__
 *
 * To run a mutation, you first call `useCreateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentMutation, { data, loading, error }] = useCreateStudentMutation({
 *   variables: {
 *      name: // value for 'name'
 *      birthDate: // value for 'birthDate'
 *      course: // value for 'course'
 *      allergies: // value for 'allergies'
 *      oldStudent: // value for 'oldStudent'
 *      signedMandate: // value for 'signedMandate'
 *      imageAuthorisation: // value for 'imageAuthorisation'
 *      collectionPermit: // value for 'collectionPermit'
 *      goesAlone: // value for 'goesAlone'
 *      contacts: // value for 'contacts'
 *      descriptionAllergy: // value for 'descriptionAllergy'
 *      registrationDate: // value for 'registrationDate'
 *      idGroups: // value for 'idGroups'
 *   },
 * });
 */
export function useCreateStudentMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudentMutation, CreateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, options);
      }
export type CreateStudentMutationHookResult = ReturnType<typeof useCreateStudentMutation>;
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>;
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<CreateStudentMutation, CreateStudentMutationVariables>;
export const GetStudentsDocument = gql`
    query GetStudents($searchText: String, $orderFilter: OrderFilterStudent, $order: Number, $page: Int, $pageSize: Int) {
  getStudents(
    searchText: $searchText
    orderFilter: $orderFilter
    order: $order
    page: $page
    pageSize: $pageSize
  ) {
    data {
      id
      name
      active
      groups {
        name
        id
      }
      course
      enrolled
    }
    page
    totalPages
    totalNumber
    pageSize
  }
}
    `;

/**
 * __useGetStudentsQuery__
 *
 * To run a query within a React component, call `useGetStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStudentsQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      orderFilter: // value for 'orderFilter'
 *      order: // value for 'order'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetStudentsQuery(baseOptions?: Apollo.QueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentsQuery, GetStudentsQueryVariables>(GetStudentsDocument, options);
      }
export function useGetStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentsQuery, GetStudentsQueryVariables>(GetStudentsDocument, options);
        }
export type GetStudentsQueryHookResult = ReturnType<typeof useGetStudentsQuery>;
export type GetStudentsLazyQueryHookResult = ReturnType<typeof useGetStudentsLazyQuery>;
export type GetStudentsQueryResult = Apollo.QueryResult<GetStudentsQuery, GetStudentsQueryVariables>;