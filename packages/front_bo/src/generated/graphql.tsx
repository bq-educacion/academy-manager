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

export type Area = {
  __typename?: 'Area';
  id: Scalars['ID'];
  name: Scalars['String'];
  region: Region;
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

export type CreateCenterInput = {
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

export type CreateGroupInput = {
  instructors?: InputMaybe<Array<Scalars['String']>>;
  modality: GroupModality;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  timetable: Array<TimetableInput>;
  type: GroupType;
};

export type CreateInstructorInput = {
  areas: Array<Scalars['String']>;
  availability: Array<AvailabilityInput>;
  corporateEmail?: InputMaybe<Scalars['String']>;
  enrolled: Scalars['Boolean'];
  geographicalAvailability: Array<Region>;
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

export type CreateStudentInput = {
  allergies?: InputMaybe<Scalars['Boolean']>;
  birthDate?: InputMaybe<Scalars['String']>;
  collectionPermit?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<StudentContactInput>>;
  course: Scalars['String'];
  descriptionAllergy?: InputMaybe<Scalars['String']>;
  goesAlone?: InputMaybe<Scalars['Boolean']>;
  imageAuthorisation?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  oldStudent?: InputMaybe<Scalars['Boolean']>;
  registrationDate?: InputMaybe<Scalars['String']>;
  signedMandate?: InputMaybe<Scalars['Boolean']>;
};

export enum Days {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type EditCenterContactInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type EditCenterInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<CenterContactInput>>;
  email?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<Languages>>;
  name?: InputMaybe<Scalars['String']>;
  nature?: InputMaybe<CenterNature>;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<CenterActivityType>>;
};

export type EditGroupInput = {
  center?: InputMaybe<Scalars['String']>;
  instructors?: InputMaybe<Array<Scalars['String']>>;
  modality?: InputMaybe<GroupModality>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  timetable?: InputMaybe<Array<TimetableInput>>;
  type?: InputMaybe<GroupType>;
};

export type EditInstructorInput = {
  areas?: InputMaybe<Array<Scalars['String']>>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  corporateEmail?: InputMaybe<Scalars['String']>;
  geographicalAvailability?: InputMaybe<Array<Region>>;
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

export type EditStudentContactInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  send_info?: InputMaybe<Scalars['Boolean']>;
};

export type EditStudentInput = {
  allergies?: InputMaybe<Scalars['Boolean']>;
  birthDate?: InputMaybe<Scalars['String']>;
  collectionPermit?: InputMaybe<Scalars['String']>;
  contacts?: InputMaybe<Array<StudentContactInput>>;
  course?: InputMaybe<Scalars['String']>;
  descriptionAllergy?: InputMaybe<Scalars['String']>;
  goesAlone?: InputMaybe<Scalars['Boolean']>;
  imageAuthorisation?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  oldStudent?: InputMaybe<Scalars['Boolean']>;
  registrationDate?: InputMaybe<Scalars['String']>;
  signedMandate?: InputMaybe<Scalars['Boolean']>;
};

export type GetCentersInput = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterCenter>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type GetGroupsInput = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterGroup>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type GetInstructorsInput = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterInstructor>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};

export type GetStudentsInput = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilterStudent>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchText?: InputMaybe<Scalars['String']>;
};

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
  geographicalAvailability: Array<Region>;
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
  createArea: Area;
  createCenter: Center;
  createGroup: Group;
  createInstructor: Instructor;
  createStudent: Student;
  deleteArea: Area;
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
  login: Scalars['String'];
  setActiveCenter: Center;
  setStatusInstructor: Instructor;
  setStatusStudent: Student;
};


export type MutationAddCenterContactArgs = {
  contact: CenterContactInput;
  idCenter: Scalars['String'];
};


export type MutationAddStudentContactArgs = {
  contact: StudentContactInput;
  idStudent: Scalars['String'];
};


export type MutationCreateAreaArgs = {
  name: Scalars['String'];
  region: Region;
};


export type MutationCreateCenterArgs = {
  center: CreateCenterInput;
};


export type MutationCreateGroupArgs = {
  group: CreateGroupInput;
  idCenter: Scalars['String'];
};


export type MutationCreateInstructorArgs = {
  idGroups: Array<Scalars['String']>;
  instructor: CreateInstructorInput;
};


export type MutationCreateStudentArgs = {
  idGroups: Array<Scalars['String']>;
  student: CreateStudentInput;
};


export type MutationDeleteAreaArgs = {
  id: Scalars['String'];
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
  center: EditCenterInput;
  id: Scalars['String'];
};


export type MutationEditCenterContactArgs = {
  contact: EditCenterContactInput;
  idCenter: Scalars['String'];
  originEmail: Scalars['String'];
};


export type MutationEditGroupArgs = {
  group: EditGroupInput;
  id: Scalars['String'];
};


export type MutationEditInstructorArgs = {
  id: Scalars['String'];
  idGroups?: InputMaybe<Array<Scalars['String']>>;
  instructor: EditInstructorInput;
};


export type MutationEditStudentArgs = {
  id: Scalars['String'];
  idGroups?: InputMaybe<Array<Scalars['String']>>;
  student: EditStudentInput;
};


export type MutationEditStudentContactArgs = {
  contact: EditStudentContactInput;
  idStudent: Scalars['String'];
  originEmail: Scalars['String'];
};


export type MutationLoginArgs = {
  token: Scalars['String'];
};


export type MutationSetActiveCenterArgs = {
  active: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationSetStatusInstructorArgs = {
  enrolled: Scalars['Boolean'];
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
  getArea: Area;
  getAreas: Array<Area>;
  getCenter: CenterInfo;
  getCenters: PaginatedCenters;
  getGroup: GroupInfo;
  getGroups: PaginatedGroups;
  getInstructor: Instructor;
  getInstructors: PaginatedInstructors;
  getStudent: Student;
  getStudents: PaginatedStudents;
  getUser: User;
  getUsers: Array<User>;
};


export type QueryCheckCorporateEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetAreaArgs = {
  id: Scalars['String'];
};


export type QueryGetAreasArgs = {
  regions: Array<Region>;
};


export type QueryGetCenterArgs = {
  id: Scalars['String'];
};


export type QueryGetCentersArgs = {
  centers: GetCentersInput;
};


export type QueryGetGroupArgs = {
  id: Scalars['String'];
};


export type QueryGetGroupsArgs = {
  groups: GetGroupsInput;
};


export type QueryGetInstructorArgs = {
  id: Scalars['String'];
};


export type QueryGetInstructorsArgs = {
  instructors: GetInstructorsInput;
};


export type QueryGetStudentArgs = {
  id: Scalars['String'];
};


export type QueryGetStudentsArgs = {
  students: GetStudentsInput;
};

export enum Region {
  Andalucia = 'Andalucia',
  Aragon = 'Aragon',
  Asturias = 'Asturias',
  Baleares = 'Baleares',
  Canarias = 'Canarias',
  Cantabria = 'Cantabria',
  CastillaLaMancha = 'CastillaLaMancha',
  CastillaYLeon = 'CastillaYLeon',
  Cataluna = 'Cataluna',
  Ceuta = 'Ceuta',
  ComunidadValenciana = 'ComunidadValenciana',
  Extremadura = 'Extremadura',
  Galicia = 'Galicia',
  LaRioja = 'LaRioja',
  Madrid = 'Madrid',
  Melilla = 'Melilla',
  Murcia = 'Murcia',
  Navarra = 'Navarra',
  PaisVasco = 'PaisVasco'
}

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

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

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
  center: CreateCenterInput;
}>;


export type CreateCenterMutation = { __typename?: 'Mutation', createCenter: { __typename?: 'Center', id: string } };

export type SetActiveCenterMutationVariables = Exact<{
  setActiveCenterId: Scalars['String'];
  active: Scalars['Boolean'];
}>;


export type SetActiveCenterMutation = { __typename?: 'Mutation', setActiveCenter: { __typename?: 'Center', id: string } };

export type GetCentersFQueryVariables = Exact<{
  centers: GetCentersInput;
}>;


export type GetCentersFQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', page: number, pageSize: number, totalPages: number, totalNumber: number, data: Array<{ __typename?: 'Center', id: string, name: string, languages: Array<Languages>, city: string, nature: CenterNature, type: Array<CenterActivityType>, active: boolean }> } };

export type DeleteCenterMutationVariables = Exact<{
  deleteCenterId: Scalars['String'];
}>;


export type DeleteCenterMutation = { __typename?: 'Mutation', deleteCenter: { __typename?: 'Center', id: string } };

export type DeleteGroupMutationVariables = Exact<{
  deleteGroupId: Scalars['String'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

export type DeleteStudentMutationVariables = Exact<{
  deleteStudentId: Scalars['String'];
}>;


export type DeleteStudentMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: string, name: string } };

export type EditCenterMutationVariables = Exact<{
  editCenterId: Scalars['String'];
  center: EditCenterInput;
}>;


export type EditCenterMutation = { __typename?: 'Mutation', editCenter: { __typename?: 'Center', id: string } };

export type EditGroupMutationVariables = Exact<{
  editGroupId: Scalars['String'];
  group: EditGroupInput;
}>;


export type EditGroupMutation = { __typename?: 'Mutation', editGroup: { __typename?: 'Group', id: string } };

export type EditStudentMutationVariables = Exact<{
  editStudentId: Scalars['String'];
  idGroups?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  student: EditStudentInput;
}>;


export type EditStudentMutation = { __typename?: 'Mutation', editStudent: { __typename?: 'Student', id: string, name: string } };

export type GetCenterQueryVariables = Exact<{
  getCenterId: Scalars['String'];
}>;


export type GetCenterQuery = { __typename?: 'Query', getCenter: { __typename?: 'CenterInfo', totalStudents: any, totalGroups: any, center: { __typename?: 'Center', id: string, active: boolean, type: Array<CenterActivityType>, nature: CenterNature, languages: Array<Languages>, name: string, address: string, city: string, phone?: string | null, email?: string | null, notes?: string | null, createdAt: string, contacts?: Array<{ __typename?: 'CenterContact', name: string, email: string, phone: string }> | null } } };

export type GetCenterGroupsQueryVariables = Exact<{
  getCenterId: Scalars['String'];
}>;


export type GetCenterGroupsQuery = { __typename?: 'Query', getCenter: { __typename?: 'CenterInfo', center: { __typename?: 'Center', groups: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, active: boolean, modality: GroupModality, type: GroupType, createdAt: string, notes?: string | null, course: { __typename?: 'Course', EPO: Array<string>, ESO: Array<string> }, timetable: Array<{ __typename?: 'Timetable', id_day: any, day: Days, start: string, end: string }>, center?: { __typename?: 'Center', id: string, name: string, address: string, city: string, phone?: string | null, email?: string | null, active: boolean, type: Array<CenterActivityType>, nature: CenterNature, languages: Array<Languages>, notes?: string | null, createdAt: string, contacts?: Array<{ __typename?: 'CenterContact', name: string, email: string, phone: string }> | null, groups: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, active: boolean, modality: GroupModality, type: GroupType, createdAt: string, notes?: string | null }> } | null, instructors: Array<{ __typename?: 'Instructor', id: string, name: string, corporateEmail?: string | null, personalEmail?: string | null, phone?: string | null, enrolled: boolean, active: boolean, previousExperience: PreviousExperienceInstructor, programmingExperience: boolean, knowledge?: string | null, urlCV?: string | null, materialsExperience?: Array<string> | null, platformEducationExperience?: Array<string> | null, languages?: Array<Languages> | null, summerAvailability?: SummerAvailabilityInstructor | null, vehicle: TypeVehicleInstructor, geographicalAvailability: Array<Region>, areas: Array<string>, notes?: string | null, training: { __typename?: 'trainingInstructor', careerInEducation?: boolean | null, technicalCareer?: boolean | null }, availability: Array<{ __typename?: 'Availability', id_day: any, day: Days, hours: Array<string> }> }>, students: Array<{ __typename?: 'Student', id: string, name: string, birthDate?: string | null, course: string, enrolled: boolean, active: boolean, registrationDate?: string | null, allergies?: boolean | null, descriptionAllergy?: string | null, oldStudent?: boolean | null, signedMandate?: boolean | null, imageAuthorisation?: boolean | null, collectionPermit?: string | null, goesAlone?: boolean | null, notes?: string | null, contacts?: Array<{ __typename?: 'StudentContact', name: string, email: string, phone: string, send_info: boolean }> | null }> }> } } };

export type GetGroupQueryVariables = Exact<{
  getGroupId: Scalars['String'];
}>;


export type GetGroupQuery = { __typename?: 'Query', getGroup: { __typename?: 'GroupInfo', totalStudents: any, group: { __typename?: 'Group', id: string, id_group: any, name: string, modality: GroupModality, type: GroupType, notes?: string | null, createdAt: string, course: { __typename?: 'Course', EPO: Array<string>, ESO: Array<string> }, center?: { __typename?: 'Center', id: string, name: string } | null, instructors: Array<{ __typename?: 'Instructor', name: string, id: string }>, timetable: Array<{ __typename?: 'Timetable', id_day: any, day: Days, start: string, end: string }> } } };

export type GetStudentQueryVariables = Exact<{
  getStudentId: Scalars['String'];
}>;


export type GetStudentQuery = { __typename?: 'Query', getStudent: { __typename?: 'Student', id: string, name: string, birthDate?: string | null, course: string, active: boolean, enrolled: boolean, registrationDate?: string | null, allergies?: boolean | null, descriptionAllergy?: string | null, signedMandate?: boolean | null, imageAuthorisation?: boolean | null, goesAlone?: boolean | null, collectionPermit?: string | null, oldStudent?: boolean | null, notes?: string | null, contacts?: Array<{ __typename?: 'StudentContact', name: string, email: string, phone: string, send_info: boolean }> | null, groups: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, center?: { __typename?: 'Center', name: string, id: string } | null, timetable: Array<{ __typename?: 'Timetable', id_day: any, day: Days, start: string, end: string }>, course: { __typename?: 'Course', EPO: Array<string>, ESO: Array<string> } }> } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, name: string, email: string } };

export type CreateGroupMutationVariables = Exact<{
  idCenter: Scalars['String'];
  group: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', name: string, id_group: any } };

export type GetGroupsQueryVariables = Exact<{
  groups: GetGroupsInput;
}>;


export type GetGroupsQuery = { __typename?: 'Query', getGroups: { __typename?: 'PaginatedGroups', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, active: boolean, timetable: Array<{ __typename?: 'Timetable', day: Days, id_day: any, start: string, end: string }>, center?: { __typename?: 'Center', name: string } | null, instructors: Array<{ __typename?: 'Instructor', name: string }> }> } };

export type CreateInstructorMutationVariables = Exact<{
  instructor: CreateInstructorInput;
  idGroups: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateInstructorMutation = { __typename?: 'Mutation', createInstructor: { __typename?: 'Instructor', name: string, id: string } };

export type GetInstructorsQueryVariables = Exact<{
  instructors: GetInstructorsInput;
}>;


export type GetInstructorsQuery = { __typename?: 'Query', getInstructors: { __typename?: 'PaginatedInstructors', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Instructor', id: string, name: string, geographicalAvailability: Array<Region>, enrolled: boolean, active: boolean, vehicle: TypeVehicleInstructor, languages?: Array<Languages> | null, summerAvailability?: SummerAvailabilityInstructor | null, areas: Array<string>, availability: Array<{ __typename?: 'Availability', day: Days }>, groups: Array<{ __typename?: 'Group', name: string, id: string, id_group: any }> }> } };

export type LoginMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type SimpleCentersNameQueryVariables = Exact<{
  centers: GetCentersInput;
}>;


export type SimpleCentersNameQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', data: Array<{ __typename?: 'Center', name: string, id: string, active: boolean }> } };

export type SimpleGroupsNameQueryVariables = Exact<{
  groups: GetGroupsInput;
}>;


export type SimpleGroupsNameQuery = { __typename?: 'Query', getGroups: { __typename?: 'PaginatedGroups', data: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, center?: { __typename?: 'Center', id: string } | null }> } };

export type SimpleInstructorsNameQueryVariables = Exact<{
  instructors: GetInstructorsInput;
}>;


export type SimpleInstructorsNameQuery = { __typename?: 'Query', getInstructors: { __typename?: 'PaginatedInstructors', data: Array<{ __typename?: 'Instructor', name: string, id: string }> } };

export type CreateStudentMutationVariables = Exact<{
  student: CreateStudentInput;
  idGroups: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', name: string, id: string } };

export type GetStudentsQueryVariables = Exact<{
  students: GetStudentsInput;
}>;


export type GetStudentsQuery = { __typename?: 'Query', getStudents: { __typename?: 'PaginatedStudents', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Student', id: string, name: string, active: boolean, course: string, enrolled: boolean, groups: Array<{ __typename?: 'Group', name: string, id: string }> }> } };

export type SetStatusStudentMutationVariables = Exact<{
  setStatusStudentId: Scalars['String'];
  enrolled: Scalars['Boolean'];
}>;


export type SetStatusStudentMutation = { __typename?: 'Mutation', setStatusStudent: { __typename?: 'Student', name: string, id: string } };


export const CreateCenterDocument = gql`
    mutation CreateCenter($center: CreateCenterInput!) {
  createCenter(center: $center) {
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
 *      center: // value for 'center'
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
    query GetCentersF($centers: GetCentersInput!) {
  getCenters(centers: $centers) {
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
 *      centers: // value for 'centers'
 *   },
 * });
 */
export function useGetCentersFQuery(baseOptions: Apollo.QueryHookOptions<GetCentersFQuery, GetCentersFQueryVariables>) {
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
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($deleteGroupId: String!) {
  deleteGroup(id: $deleteGroupId) {
    id
  }
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      deleteGroupId: // value for 'deleteGroupId'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const DeleteStudentDocument = gql`
    mutation DeleteStudent($deleteStudentId: String!) {
  deleteStudent(id: $deleteStudentId) {
    id
    name
  }
}
    `;
export type DeleteStudentMutationFn = Apollo.MutationFunction<DeleteStudentMutation, DeleteStudentMutationVariables>;

/**
 * __useDeleteStudentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentMutation, { data, loading, error }] = useDeleteStudentMutation({
 *   variables: {
 *      deleteStudentId: // value for 'deleteStudentId'
 *   },
 * });
 */
export function useDeleteStudentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudentMutation, DeleteStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument, options);
      }
export type DeleteStudentMutationHookResult = ReturnType<typeof useDeleteStudentMutation>;
export type DeleteStudentMutationResult = Apollo.MutationResult<DeleteStudentMutation>;
export type DeleteStudentMutationOptions = Apollo.BaseMutationOptions<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const EditCenterDocument = gql`
    mutation EditCenter($editCenterId: String!, $center: EditCenterInput!) {
  editCenter(id: $editCenterId, center: $center) {
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
 *      center: // value for 'center'
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
    mutation EditGroup($editGroupId: String!, $group: EditGroupInput!) {
  editGroup(id: $editGroupId, group: $group) {
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
 *      group: // value for 'group'
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
export const EditStudentDocument = gql`
    mutation EditStudent($editStudentId: String!, $idGroups: [String!], $student: EditStudentInput!) {
  editStudent(idGroups: $idGroups, student: $student, id: $editStudentId) {
    id
    name
  }
}
    `;
export type EditStudentMutationFn = Apollo.MutationFunction<EditStudentMutation, EditStudentMutationVariables>;

/**
 * __useEditStudentMutation__
 *
 * To run a mutation, you first call `useEditStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editStudentMutation, { data, loading, error }] = useEditStudentMutation({
 *   variables: {
 *      editStudentId: // value for 'editStudentId'
 *      idGroups: // value for 'idGroups'
 *      student: // value for 'student'
 *   },
 * });
 */
export function useEditStudentMutation(baseOptions?: Apollo.MutationHookOptions<EditStudentMutation, EditStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditStudentMutation, EditStudentMutationVariables>(EditStudentDocument, options);
      }
export type EditStudentMutationHookResult = ReturnType<typeof useEditStudentMutation>;
export type EditStudentMutationResult = Apollo.MutationResult<EditStudentMutation>;
export type EditStudentMutationOptions = Apollo.BaseMutationOptions<EditStudentMutation, EditStudentMutationVariables>;
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
export const GetCenterGroupsDocument = gql`
    query GetCenterGroups($getCenterId: String!) {
  getCenter(id: $getCenterId) {
    center {
      groups {
        id
        id_group
        name
        active
        course {
          EPO
          ESO
        }
        modality
        type
        createdAt
        timetable {
          id_day
          day
          start
          end
        }
        notes
        center {
          id
          name
          address
          city
          phone
          email
          active
          type
          nature
          languages
          notes
          createdAt
          contacts {
            name
            email
            phone
          }
          groups {
            id
            id_group
            name
            active
            modality
            type
            createdAt
            notes
          }
        }
        instructors {
          id
          name
          corporateEmail
          personalEmail
          phone
          enrolled
          active
          training {
            careerInEducation
            technicalCareer
          }
          previousExperience
          programmingExperience
          knowledge
          urlCV
          materialsExperience
          platformEducationExperience
          languages
          availability {
            id_day
            day
            hours
          }
          summerAvailability
          vehicle
          geographicalAvailability
          areas
          notes
        }
        students {
          id
          name
          birthDate
          course
          enrolled
          active
          registrationDate
          allergies
          descriptionAllergy
          oldStudent
          signedMandate
          imageAuthorisation
          collectionPermit
          goesAlone
          notes
          contacts {
            name
            email
            phone
            send_info
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetCenterGroupsQuery__
 *
 * To run a query within a React component, call `useGetCenterGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCenterGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCenterGroupsQuery({
 *   variables: {
 *      getCenterId: // value for 'getCenterId'
 *   },
 * });
 */
export function useGetCenterGroupsQuery(baseOptions: Apollo.QueryHookOptions<GetCenterGroupsQuery, GetCenterGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCenterGroupsQuery, GetCenterGroupsQueryVariables>(GetCenterGroupsDocument, options);
      }
export function useGetCenterGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCenterGroupsQuery, GetCenterGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCenterGroupsQuery, GetCenterGroupsQueryVariables>(GetCenterGroupsDocument, options);
        }
export type GetCenterGroupsQueryHookResult = ReturnType<typeof useGetCenterGroupsQuery>;
export type GetCenterGroupsLazyQueryHookResult = ReturnType<typeof useGetCenterGroupsLazyQuery>;
export type GetCenterGroupsQueryResult = Apollo.QueryResult<GetCenterGroupsQuery, GetCenterGroupsQueryVariables>;
export const GetGroupDocument = gql`
    query GetGroup($getGroupId: String!) {
  getGroup(id: $getGroupId) {
    group {
      id
      id_group
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
<<<<<<< HEAD
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    id
    name
    email
=======
export const GetStudentDocument = gql`
    query GetStudent($getStudentId: String!) {
  getStudent(id: $getStudentId) {
    id
    name
    birthDate
    course
    active
    enrolled
    registrationDate
    allergies
    descriptionAllergy
    signedMandate
    imageAuthorisation
    goesAlone
    collectionPermit
    oldStudent
    notes
    contacts {
      name
      email
      phone
      send_info
    }
    groups {
      id
      id_group
      name
      center {
        name
        id
      }
      timetable {
        id_day
        day
        start
        end
      }
      course {
        EPO
        ESO
      }
    }
>>>>>>> 4b558966bbfe544355ec1bd93627c19c9c0e76e3
  }
}
    `;

/**
<<<<<<< HEAD
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
=======
 * __useGetStudentQuery__
 *
 * To run a query within a React component, call `useGetStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
>>>>>>> 4b558966bbfe544355ec1bd93627c19c9c0e76e3
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
<<<<<<< HEAD
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
=======
 * const { data, loading, error } = useGetStudentQuery({
 *   variables: {
 *      getStudentId: // value for 'getStudentId'
 *   },
 * });
 */
export function useGetStudentQuery(baseOptions: Apollo.QueryHookOptions<GetStudentQuery, GetStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStudentQuery, GetStudentQueryVariables>(GetStudentDocument, options);
      }
export function useGetStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStudentQuery, GetStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStudentQuery, GetStudentQueryVariables>(GetStudentDocument, options);
        }
export type GetStudentQueryHookResult = ReturnType<typeof useGetStudentQuery>;
export type GetStudentLazyQueryHookResult = ReturnType<typeof useGetStudentLazyQuery>;
export type GetStudentQueryResult = Apollo.QueryResult<GetStudentQuery, GetStudentQueryVariables>;
>>>>>>> 4b558966bbfe544355ec1bd93627c19c9c0e76e3
export const CreateGroupDocument = gql`
    mutation CreateGroup($idCenter: String!, $group: CreateGroupInput!) {
  createGroup(idCenter: $idCenter, group: $group) {
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
 *      group: // value for 'group'
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
    query GetGroups($groups: GetGroupsInput!) {
  getGroups(groups: $groups) {
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
 *      groups: // value for 'groups'
 *   },
 * });
 */
export function useGetGroupsQuery(baseOptions: Apollo.QueryHookOptions<GetGroupsQuery, GetGroupsQueryVariables>) {
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
    mutation CreateInstructor($instructor: CreateInstructorInput!, $idGroups: [String!]!) {
  createInstructor(instructor: $instructor, idGroups: $idGroups) {
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
 *      instructor: // value for 'instructor'
 *      idGroups: // value for 'idGroups'
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
    query GetInstructors($instructors: GetInstructorsInput!) {
  getInstructors(instructors: $instructors) {
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
 *      instructors: // value for 'instructors'
 *   },
 * });
 */
export function useGetInstructorsQuery(baseOptions: Apollo.QueryHookOptions<GetInstructorsQuery, GetInstructorsQueryVariables>) {
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
export const LoginDocument = gql`
    mutation Login($token: String!) {
  login(token: $token)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SimpleCentersNameDocument = gql`
    query SimpleCentersName($centers: GetCentersInput!) {
  getCenters(centers: $centers) {
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
 *      centers: // value for 'centers'
 *   },
 * });
 */
export function useSimpleCentersNameQuery(baseOptions: Apollo.QueryHookOptions<SimpleCentersNameQuery, SimpleCentersNameQueryVariables>) {
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
    query simpleGroupsName($groups: GetGroupsInput!) {
  getGroups(groups: $groups) {
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
 *      groups: // value for 'groups'
 *   },
 * });
 */
export function useSimpleGroupsNameQuery(baseOptions: Apollo.QueryHookOptions<SimpleGroupsNameQuery, SimpleGroupsNameQueryVariables>) {
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
    query SimpleInstructorsName($instructors: GetInstructorsInput!) {
  getInstructors(instructors: $instructors) {
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
 *      instructors: // value for 'instructors'
 *   },
 * });
 */
export function useSimpleInstructorsNameQuery(baseOptions: Apollo.QueryHookOptions<SimpleInstructorsNameQuery, SimpleInstructorsNameQueryVariables>) {
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
    mutation CreateStudent($student: CreateStudentInput!, $idGroups: [String!]!) {
  createStudent(student: $student, idGroups: $idGroups) {
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
 *      student: // value for 'student'
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
    query GetStudents($students: GetStudentsInput!) {
  getStudents(students: $students) {
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
 *      students: // value for 'students'
 *   },
 * });
 */
export function useGetStudentsQuery(baseOptions: Apollo.QueryHookOptions<GetStudentsQuery, GetStudentsQueryVariables>) {
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
export const SetStatusStudentDocument = gql`
    mutation SetStatusStudent($setStatusStudentId: String!, $enrolled: Boolean!) {
  setStatusStudent(id: $setStatusStudentId, enrolled: $enrolled) {
    name
    id
  }
}
    `;
export type SetStatusStudentMutationFn = Apollo.MutationFunction<SetStatusStudentMutation, SetStatusStudentMutationVariables>;

/**
 * __useSetStatusStudentMutation__
 *
 * To run a mutation, you first call `useSetStatusStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStatusStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStatusStudentMutation, { data, loading, error }] = useSetStatusStudentMutation({
 *   variables: {
 *      setStatusStudentId: // value for 'setStatusStudentId'
 *      enrolled: // value for 'enrolled'
 *   },
 * });
 */
export function useSetStatusStudentMutation(baseOptions?: Apollo.MutationHookOptions<SetStatusStudentMutation, SetStatusStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetStatusStudentMutation, SetStatusStudentMutationVariables>(SetStatusStudentDocument, options);
      }
export type SetStatusStudentMutationHookResult = ReturnType<typeof useSetStatusStudentMutation>;
export type SetStatusStudentMutationResult = Apollo.MutationResult<SetStatusStudentMutation>;
export type SetStatusStudentMutationOptions = Apollo.BaseMutationOptions<SetStatusStudentMutation, SetStatusStudentMutationVariables>;