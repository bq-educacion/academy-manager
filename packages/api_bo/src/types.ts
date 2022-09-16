import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> =
  & Omit<T, K>
  & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Number: number;
};

export type Area = {
  __typename?: "Area";
  id: Scalars["ID"];
  name: Scalars["String"];
  region: Region;
};

export type Availability = {
  __typename?: "Availability";
  day: Days;
  hours: Array<Scalars["String"]>;
  id_day: Scalars["Number"];
};

export type AvailabilityInput = {
  day: Days;
  hours: Array<Scalars["String"]>;
};

export type Center = {
  __typename?: "Center";
  active: Scalars["Boolean"];
  address: Scalars["String"];
  city: Scalars["String"];
  contacts?: Maybe<Array<CenterContact>>;
  createdAt: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  groups: Array<Group>;
  id: Scalars["ID"];
  languages: Array<Languages>;
  name: Scalars["String"];
  nature: CenterNature;
  notes?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  type: Array<CenterActivityType>;
};

export enum CenterActivityType {
  Academy = "ACADEMY",
  Campus = "CAMPUS",
  NoAcademy = "NO_ACADEMY",
  Others = "OTHERS",
}

export type CenterContact = {
  __typename?: "CenterContact";
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
};

export type CenterContactInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
};

export type CenterInfo = {
  __typename?: "CenterInfo";
  center: Center;
  totalGroups: Scalars["Number"];
  totalStudents: Scalars["Number"];
};

export enum CenterNature {
  Concertado = "CONCERTADO",
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type Course = {
  __typename?: "Course";
  EPO: Array<Scalars["String"]>;
  ESO: Array<Scalars["String"]>;
};

export enum CourseType {
  Epo = "EPO",
  Eso = "ESO",
}

export type CreateCenterInput = {
  address: Scalars["String"];
  city: Scalars["String"];
  contacts?: InputMaybe<Array<CenterContactInput>>;
  email?: InputMaybe<Scalars["String"]>;
  languages: Array<Languages>;
  name: Scalars["String"];
  nature: CenterNature;
  notes?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  type: Array<CenterActivityType>;
};

export enum Days {
  Friday = "FRIDAY",
  Monday = "MONDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
  Thursday = "THURSDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
}

export type EditCenterContactInput = {
  email?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
};

export type EditCenterInput = {
  address?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  contacts?: InputMaybe<Array<CenterContactInput>>;
  email?: InputMaybe<Scalars["String"]>;
  languages?: InputMaybe<Array<Languages>>;
  name?: InputMaybe<Scalars["String"]>;
  nature?: InputMaybe<CenterNature>;
  notes?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Array<CenterActivityType>>;
};

export type GetCenterInput = {
  order?: InputMaybe<Scalars["Number"]>;
  orderFilter?: InputMaybe<OrderFilterCenter>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchText?: InputMaybe<Scalars["String"]>;
};

export type Group = {
  __typename?: "Group";
  active: Scalars["Boolean"];
  center?: Maybe<Center>;
  course: Course;
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  id_group: Scalars["Number"];
  instructors: Array<Instructor>;
  modality: GroupModality;
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  students: Array<Student>;
  timetable: Array<Timetable>;
  type: GroupType;
};

export type GroupInfo = {
  __typename?: "GroupInfo";
  group: Group;
  totalStudents: Scalars["Number"];
};

export enum GroupModality {
  Online = "ONLINE",
  OnSite = "ON_SITE",
  SemiPresential = "SEMI_PRESENTIAL",
}

export enum GroupType {
  External = "EXTERNAL",
  Internal = "INTERNAL",
}

export type Instructor = {
  __typename?: "Instructor";
  active: Scalars["Boolean"];
  areas: Array<Scalars["String"]>;
  availability: Array<Availability>;
  corporateEmail?: Maybe<Scalars["String"]>;
  enrolled: Scalars["Boolean"];
  geographicalAvailability: Array<Region>;
  groups: Array<Group>;
  id: Scalars["ID"];
  knowledge?: Maybe<Scalars["String"]>;
  languages?: Maybe<Array<Languages>>;
  materialsExperience?: Maybe<Array<Scalars["String"]>>;
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  personalEmail?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  platformEducationExperience?: Maybe<Array<Scalars["String"]>>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars["Boolean"];
  summerAvailability?: Maybe<SummerAvailabilityInstructor>;
  training: TrainingInstructor;
  urlCV?: Maybe<Scalars["String"]>;
  vehicle: TypeVehicleInstructor;
};

export enum Languages {
  English = "English",
  Spanish = "Spanish",
}

export type Mutation = {
  __typename?: "Mutation";
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
  setActiveCenter: Center;
  setStatusInstructor: Instructor;
  setStatusStudent: Student;
};

export type MutationAddCenterContactArgs = {
  contact: CenterContactInput;
  idCenter: Scalars["String"];
};

export type MutationAddStudentContactArgs = {
  email: Scalars["String"];
  idStudent: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  send_info: Scalars["Boolean"];
};

export type MutationCreateAreaArgs = {
  name: Scalars["String"];
  region: Region;
};

export type MutationCreateCenterArgs = {
  center: CreateCenterInput;
};

export type MutationCreateGroupArgs = {
  idCenter: Scalars["String"];
  instructors?: InputMaybe<Array<Scalars["String"]>>;
  modality: GroupModality;
  name: Scalars["String"];
  notes?: InputMaybe<Scalars["String"]>;
  timetable: Array<TimetableInput>;
  type: GroupType;
};

export type MutationCreateInstructorArgs = {
  areas: Array<Scalars["String"]>;
  availability: Array<AvailabilityInput>;
  corporateEmail?: InputMaybe<Scalars["String"]>;
  enrolled: Scalars["Boolean"];
  geographicalAvailability: Array<Region>;
  groups: Array<Scalars["String"]>;
  knowledge?: InputMaybe<Scalars["String"]>;
  languages?: InputMaybe<Array<Languages>>;
  materialsExperience?: InputMaybe<Array<Scalars["String"]>>;
  name: Scalars["String"];
  notes?: InputMaybe<Scalars["String"]>;
  personalEmail?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  platformEducationExperience?: InputMaybe<Array<Scalars["String"]>>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars["Boolean"];
  summerAvailability?: InputMaybe<SummerAvailabilityInstructor>;
  training: TrainingInstructorInput;
  urlCV?: InputMaybe<Scalars["String"]>;
  vehicle: TypeVehicleInstructor;
};

export type MutationCreateStudentArgs = {
  allergies?: InputMaybe<Scalars["Boolean"]>;
  birthDate?: InputMaybe<Scalars["String"]>;
  collectionPermit?: InputMaybe<Scalars["String"]>;
  contacts?: InputMaybe<Array<StudentContactInput>>;
  course: Scalars["String"];
  descriptionAllergy?: InputMaybe<Scalars["String"]>;
  goesAlone?: InputMaybe<Scalars["Boolean"]>;
  idGroups: Array<Scalars["String"]>;
  imageAuthorisation?: InputMaybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  notes?: InputMaybe<Scalars["String"]>;
  oldStudent?: InputMaybe<Scalars["Boolean"]>;
  registrationDate?: InputMaybe<Scalars["String"]>;
  signedMandate?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationDeleteAreaArgs = {
  id: Scalars["String"];
};

export type MutationDeleteCenterArgs = {
  id: Scalars["String"];
};

export type MutationDeleteGroupArgs = {
  id: Scalars["String"];
};

export type MutationDeleteInstructorArgs = {
  id: Scalars["String"];
};

export type MutationDeleteStudentArgs = {
  id: Scalars["String"];
};

export type MutationEditCenterArgs = {
  center: EditCenterInput;
  id: Scalars["String"];
};

export type MutationEditCenterContactArgs = {
  contact: EditCenterContactInput;
  idCenter: Scalars["String"];
  originEmail: Scalars["String"];
};

export type MutationEditGroupArgs = {
  center?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  instructors?: InputMaybe<Array<Scalars["String"]>>;
  modality?: InputMaybe<GroupModality>;
  name?: InputMaybe<Scalars["String"]>;
  notes?: InputMaybe<Scalars["String"]>;
  timetable?: InputMaybe<Array<TimetableInput>>;
  type?: InputMaybe<GroupType>;
};

export type MutationEditInstructorArgs = {
  areas?: InputMaybe<Array<Scalars["String"]>>;
  availability?: InputMaybe<Array<AvailabilityInput>>;
  corporateEmail?: InputMaybe<Scalars["String"]>;
  geographicalAvailability?: InputMaybe<Array<Region>>;
  groups?: InputMaybe<Array<Scalars["String"]>>;
  id: Scalars["String"];
  knowledge?: InputMaybe<Scalars["String"]>;
  languages?: InputMaybe<Array<Languages>>;
  materialsExperience?: InputMaybe<Array<Scalars["String"]>>;
  name?: InputMaybe<Scalars["String"]>;
  notes?: InputMaybe<Scalars["String"]>;
  personalEmail?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  platformEducationExperience?: InputMaybe<Array<Scalars["String"]>>;
  previousExperience?: InputMaybe<PreviousExperienceInstructor>;
  programmingExperience?: InputMaybe<Scalars["Boolean"]>;
  summerAvailability?: InputMaybe<SummerAvailabilityInstructor>;
  training?: InputMaybe<TrainingInstructorInput>;
  urlCV?: InputMaybe<Scalars["String"]>;
  vehicle?: InputMaybe<TypeVehicleInstructor>;
};

export type MutationEditStudentArgs = {
  allergies?: InputMaybe<Scalars["Boolean"]>;
  birthDate?: InputMaybe<Scalars["String"]>;
  collectionPermit?: InputMaybe<Scalars["String"]>;
  contacts?: InputMaybe<Array<StudentContactInput>>;
  course?: InputMaybe<Scalars["String"]>;
  descriptionAllergy?: InputMaybe<Scalars["String"]>;
  groups?: InputMaybe<Array<Scalars["String"]>>;
  id: Scalars["String"];
  imageAuthorisation?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  notes?: InputMaybe<Scalars["String"]>;
  oldStudent?: InputMaybe<Scalars["Boolean"]>;
  registrationDate?: InputMaybe<Scalars["String"]>;
  signedMandate?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationEditStudentContactArgs = {
  email?: InputMaybe<Scalars["String"]>;
  idStudent: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  originEmail: Scalars["String"];
  phone?: InputMaybe<Scalars["String"]>;
  send_info?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationSetActiveCenterArgs = {
  active: Scalars["Boolean"];
  id: Scalars["String"];
};

export type MutationSetStatusInstructorArgs = {
  enrolled: Scalars["Boolean"];
  id: Scalars["String"];
};

export type MutationSetStatusStudentArgs = {
  enrolled: Scalars["Boolean"];
  id: Scalars["String"];
};

export enum OrderFilterCenter {
  City = "city",
  Languages = "languages",
  Name = "name",
  Nature = "nature",
  Type = "type",
}

export enum OrderFilterGroup {
  Center = "center",
  Course = "course",
  End = "end",
  IdDay = "id_day",
  IdGroup = "id_group",
  Instructors = "instructors",
  Modality = "modality",
  Start = "start",
}

export enum OrderFilterInstructor {
  Areas = "areas",
  Center = "center",
  IdDay = "id_day",
  IdGroup = "id_group",
  Languages = "languages",
  Name = "name",
  State = "state",
  SummerAvailability = "summerAvailability",
  Vehicle = "vehicle",
}

export enum OrderFilterStudent {
  Center = "center",
  Course = "course",
  Group = "group",
  Name = "name",
  State = "state",
}

export type PaginatedCenters = {
  __typename?: "PaginatedCenters";
  data: Array<Center>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  totalNumber: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type PaginatedGroups = {
  __typename?: "PaginatedGroups";
  data: Array<Group>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  totalNumber: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type PaginatedInstructors = {
  __typename?: "PaginatedInstructors";
  data: Array<Instructor>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  totalNumber: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type PaginatedStudents = {
  __typename?: "PaginatedStudents";
  data: Array<Student>;
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  totalNumber: Scalars["Int"];
  totalPages: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  checkCorporateEmail: Scalars["String"];
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
};

export type QueryCheckCorporateEmailArgs = {
  email: Scalars["String"];
};

export type QueryGetAreaArgs = {
  id: Scalars["String"];
};

export type QueryGetAreasArgs = {
  regions: Array<Region>;
};

export type QueryGetCenterArgs = {
  id: Scalars["String"];
};

export type QueryGetCentersArgs = {
  center: GetCenterInput;
};

export type QueryGetGroupArgs = {
  id: Scalars["String"];
};

export type QueryGetGroupsArgs = {
  order?: InputMaybe<Scalars["Number"]>;
  orderFilter?: InputMaybe<OrderFilterGroup>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchText?: InputMaybe<Scalars["String"]>;
};

export type QueryGetInstructorArgs = {
  id: Scalars["String"];
};

export type QueryGetInstructorsArgs = {
  order?: InputMaybe<Scalars["Number"]>;
  orderFilter?: InputMaybe<OrderFilterInstructor>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchText?: InputMaybe<Scalars["String"]>;
};

export type QueryGetStudentArgs = {
  id: Scalars["String"];
};

export type QueryGetStudentsArgs = {
  order?: InputMaybe<Scalars["Number"]>;
  orderFilter?: InputMaybe<OrderFilterStudent>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchText?: InputMaybe<Scalars["String"]>;
};

export enum Region {
  Andalucia = "Andalucia",
  Aragon = "Aragon",
  Asturias = "Asturias",
  Baleares = "Baleares",
  Canarias = "Canarias",
  Cantabria = "Cantabria",
  CastillaLaMancha = "CastillaLaMancha",
  CastillaYLeon = "CastillaYLeon",
  Cataluna = "Cataluna",
  Ceuta = "Ceuta",
  ComunidadValenciana = "ComunidadValenciana",
  Extremadura = "Extremadura",
  Galicia = "Galicia",
  LaRioja = "LaRioja",
  Madrid = "Madrid",
  Melilla = "Melilla",
  Murcia = "Murcia",
  Navarra = "Navarra",
  PaisVasco = "PaisVasco",
}

export type Student = {
  __typename?: "Student";
  active: Scalars["Boolean"];
  allergies?: Maybe<Scalars["Boolean"]>;
  birthDate?: Maybe<Scalars["String"]>;
  collectionPermit?: Maybe<Scalars["String"]>;
  contacts?: Maybe<Array<StudentContact>>;
  course: Scalars["String"];
  descriptionAllergy?: Maybe<Scalars["String"]>;
  enrolled: Scalars["Boolean"];
  goesAlone?: Maybe<Scalars["Boolean"]>;
  groups: Array<Group>;
  id: Scalars["ID"];
  imageAuthorisation?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  oldStudent?: Maybe<Scalars["Boolean"]>;
  registrationDate?: Maybe<Scalars["String"]>;
  signedMandate?: Maybe<Scalars["Boolean"]>;
};

export type StudentContact = {
  __typename?: "StudentContact";
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  send_info: Scalars["Boolean"];
};

export type StudentContactInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  send_info: Scalars["Boolean"];
};

export type Timetable = {
  __typename?: "Timetable";
  day: Days;
  end: Scalars["String"];
  id_day: Scalars["Number"];
  start: Scalars["String"];
};

export type TimetableInput = {
  day: Days;
  end: Scalars["String"];
  start: Scalars["String"];
};

export enum TypeVehicleInstructor {
  Own = "OWN",
  PublicTransport = "PUBLIC_TRANSPORT",
}

export enum PreviousExperienceInstructor {
  No = "NO",
  NoButInterested = "NO_BUT_INTERESTED",
  Yes = "YES",
}

export enum SummerAvailabilityInstructor {
  ExtracurricularsOnly = "EXTRACURRICULARS_ONLY",
  No = "NO",
  Yes = "YES",
}

export type TrainingInstructor = {
  __typename?: "trainingInstructor";
  careerInEducation?: Maybe<Scalars["Boolean"]>;
  technicalCareer?: Maybe<Scalars["Boolean"]>;
};

export type TrainingInstructorInput = {
  careerInEducation?: InputMaybe<Scalars["Boolean"]>;
  technicalCareer?: InputMaybe<Scalars["Boolean"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
    ...args: any[]
  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Area: ResolverTypeWrapper<Area>;
  Availability: ResolverTypeWrapper<Availability>;
  AvailabilityInput: AvailabilityInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Center: ResolverTypeWrapper<Center>;
  CenterActivityType: CenterActivityType;
  CenterContact: ResolverTypeWrapper<CenterContact>;
  CenterContactInput: CenterContactInput;
  CenterInfo: ResolverTypeWrapper<CenterInfo>;
  CenterNature: CenterNature;
  Course: ResolverTypeWrapper<Course>;
  CourseType: CourseType;
  CreateCenterInput: CreateCenterInput;
  Days: Days;
  EditCenterContactInput: EditCenterContactInput;
  EditCenterInput: EditCenterInput;
  GetCenterInput: GetCenterInput;
  Group: ResolverTypeWrapper<Group>;
  GroupInfo: ResolverTypeWrapper<GroupInfo>;
  GroupModality: GroupModality;
  GroupType: GroupType;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Instructor: ResolverTypeWrapper<Instructor>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Languages: Languages;
  Mutation: ResolverTypeWrapper<{}>;
  Number: ResolverTypeWrapper<Scalars["Number"]>;
  OrderFilterCenter: OrderFilterCenter;
  OrderFilterGroup: OrderFilterGroup;
  OrderFilterInstructor: OrderFilterInstructor;
  OrderFilterStudent: OrderFilterStudent;
  PaginatedCenters: ResolverTypeWrapper<PaginatedCenters>;
  PaginatedGroups: ResolverTypeWrapper<PaginatedGroups>;
  PaginatedInstructors: ResolverTypeWrapper<PaginatedInstructors>;
  PaginatedStudents: ResolverTypeWrapper<PaginatedStudents>;
  Query: ResolverTypeWrapper<{}>;
  Region: Region;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Student: ResolverTypeWrapper<Student>;
  StudentContact: ResolverTypeWrapper<StudentContact>;
  StudentContactInput: StudentContactInput;
  Timetable: ResolverTypeWrapper<Timetable>;
  TimetableInput: TimetableInput;
  TypeVehicleInstructor: TypeVehicleInstructor;
  previousExperienceInstructor: PreviousExperienceInstructor;
  summerAvailabilityInstructor: SummerAvailabilityInstructor;
  trainingInstructor: ResolverTypeWrapper<TrainingInstructor>;
  trainingInstructorInput: TrainingInstructorInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Area: Area;
  Availability: Availability;
  AvailabilityInput: AvailabilityInput;
  Boolean: Scalars["Boolean"];
  Center: Center;
  CenterContact: CenterContact;
  CenterContactInput: CenterContactInput;
  CenterInfo: CenterInfo;
  Course: Course;
  CreateCenterInput: CreateCenterInput;
  EditCenterContactInput: EditCenterContactInput;
  EditCenterInput: EditCenterInput;
  GetCenterInput: GetCenterInput;
  Group: Group;
  GroupInfo: GroupInfo;
  ID: Scalars["ID"];
  Instructor: Instructor;
  Int: Scalars["Int"];
  Mutation: {};
  Number: Scalars["Number"];
  PaginatedCenters: PaginatedCenters;
  PaginatedGroups: PaginatedGroups;
  PaginatedInstructors: PaginatedInstructors;
  PaginatedStudents: PaginatedStudents;
  Query: {};
  String: Scalars["String"];
  Student: Student;
  StudentContact: StudentContact;
  StudentContactInput: StudentContactInput;
  Timetable: Timetable;
  TimetableInput: TimetableInput;
  trainingInstructor: TrainingInstructor;
  trainingInstructorInput: TrainingInstructorInput;
}>;

export type AreaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Area"] =
    ResolversParentTypes["Area"],
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  region?: Resolver<ResolversTypes["Region"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AvailabilityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Availability"] =
    ResolversParentTypes["Availability"],
> = ResolversObject<{
  day?: Resolver<ResolversTypes["Days"], ParentType, ContextType>;
  hours?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  id_day?: Resolver<ResolversTypes["Number"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CenterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Center"] =
    ResolversParentTypes["Center"],
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  city?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  contacts?: Resolver<
    Maybe<Array<ResolversTypes["CenterContact"]>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  languages?: Resolver<
    Array<ResolversTypes["Languages"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nature?: Resolver<ResolversTypes["CenterNature"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  type?: Resolver<
    Array<ResolversTypes["CenterActivityType"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CenterContactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CenterContact"] =
    ResolversParentTypes["CenterContact"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CenterInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CenterInfo"] =
    ResolversParentTypes["CenterInfo"],
> = ResolversObject<{
  center?: Resolver<ResolversTypes["Center"], ParentType, ContextType>;
  totalGroups?: Resolver<ResolversTypes["Number"], ParentType, ContextType>;
  totalStudents?: Resolver<ResolversTypes["Number"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Course"] =
    ResolversParentTypes["Course"],
> = ResolversObject<{
  EPO?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  ESO?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Group"] =
    ResolversParentTypes["Group"],
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  center?: Resolver<Maybe<ResolversTypes["Center"]>, ParentType, ContextType>;
  course?: Resolver<ResolversTypes["Course"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  id_group?: Resolver<ResolversTypes["Number"], ParentType, ContextType>;
  instructors?: Resolver<
    Array<ResolversTypes["Instructor"]>,
    ParentType,
    ContextType
  >;
  modality?: Resolver<ResolversTypes["GroupModality"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  students?: Resolver<
    Array<ResolversTypes["Student"]>,
    ParentType,
    ContextType
  >;
  timetable?: Resolver<
    Array<ResolversTypes["Timetable"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes["GroupType"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GroupInfo"] =
    ResolversParentTypes["GroupInfo"],
> = ResolversObject<{
  group?: Resolver<ResolversTypes["Group"], ParentType, ContextType>;
  totalStudents?: Resolver<ResolversTypes["Number"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InstructorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Instructor"] =
    ResolversParentTypes["Instructor"],
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  areas?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  availability?: Resolver<
    Array<ResolversTypes["Availability"]>,
    ParentType,
    ContextType
  >;
  corporateEmail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  enrolled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  geographicalAvailability?: Resolver<
    Array<ResolversTypes["Region"]>,
    ParentType,
    ContextType
  >;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  knowledge?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  languages?: Resolver<
    Maybe<Array<ResolversTypes["Languages"]>>,
    ParentType,
    ContextType
  >;
  materialsExperience?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  personalEmail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  platformEducationExperience?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  previousExperience?: Resolver<
    ResolversTypes["previousExperienceInstructor"],
    ParentType,
    ContextType
  >;
  programmingExperience?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  summerAvailability?: Resolver<
    Maybe<ResolversTypes["summerAvailabilityInstructor"]>,
    ParentType,
    ContextType
  >;
  training?: Resolver<
    ResolversTypes["trainingInstructor"],
    ParentType,
    ContextType
  >;
  urlCV?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  vehicle?: Resolver<
    ResolversTypes["TypeVehicleInstructor"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] =
    ResolversParentTypes["Mutation"],
> = ResolversObject<{
  addCenterContact?: Resolver<
    ResolversTypes["CenterContact"],
    ParentType,
    ContextType,
    RequireFields<MutationAddCenterContactArgs, "contact" | "idCenter">
  >;
  addStudentContact?: Resolver<
    ResolversTypes["StudentContact"],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddStudentContactArgs,
      "email" | "idStudent" | "name" | "phone" | "send_info"
    >
  >;
  createArea?: Resolver<
    ResolversTypes["Area"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAreaArgs, "name" | "region">
  >;
  createCenter?: Resolver<
    ResolversTypes["Center"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCenterArgs, "center">
  >;
  createGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateGroupArgs,
      "idCenter" | "modality" | "name" | "timetable" | "type"
    >
  >;
  createInstructor?: Resolver<
    ResolversTypes["Instructor"],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateInstructorArgs,
      | "areas"
      | "availability"
      | "enrolled"
      | "geographicalAvailability"
      | "groups"
      | "name"
      | "previousExperience"
      | "programmingExperience"
      | "training"
      | "vehicle"
    >
  >;
  createStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateStudentArgs, "course" | "idGroups" | "name">
  >;
  deleteArea?: Resolver<
    ResolversTypes["Area"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteAreaArgs, "id">
  >;
  deleteCenter?: Resolver<
    ResolversTypes["Center"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCenterArgs, "id">
  >;
  deleteGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteGroupArgs, "id">
  >;
  deleteInstructor?: Resolver<
    ResolversTypes["Instructor"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteInstructorArgs, "id">
  >;
  deleteStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteStudentArgs, "id">
  >;
  editCenter?: Resolver<
    ResolversTypes["Center"],
    ParentType,
    ContextType,
    RequireFields<MutationEditCenterArgs, "center" | "id">
  >;
  editCenterContact?: Resolver<
    ResolversTypes["CenterContact"],
    ParentType,
    ContextType,
    RequireFields<
      MutationEditCenterContactArgs,
      "contact" | "idCenter" | "originEmail"
    >
  >;
  editGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<MutationEditGroupArgs, "id">
  >;
  editInstructor?: Resolver<
    ResolversTypes["Instructor"],
    ParentType,
    ContextType,
    RequireFields<MutationEditInstructorArgs, "id">
  >;
  editStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    RequireFields<MutationEditStudentArgs, "id">
  >;
  editStudentContact?: Resolver<
    ResolversTypes["StudentContact"],
    ParentType,
    ContextType,
    RequireFields<MutationEditStudentContactArgs, "idStudent" | "originEmail">
  >;
  setActiveCenter?: Resolver<
    ResolversTypes["Center"],
    ParentType,
    ContextType,
    RequireFields<MutationSetActiveCenterArgs, "active" | "id">
  >;
  setStatusInstructor?: Resolver<
    ResolversTypes["Instructor"],
    ParentType,
    ContextType,
    RequireFields<MutationSetStatusInstructorArgs, "enrolled" | "id">
  >;
  setStatusStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    RequireFields<MutationSetStatusStudentArgs, "enrolled" | "id">
  >;
}>;

export interface NumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Number"], any> {
  name: "Number";
}

export type PaginatedCentersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedCenters"] =
    ResolversParentTypes["PaginatedCenters"],
> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes["Center"]>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedGroupsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedGroups"] =
    ResolversParentTypes["PaginatedGroups"],
> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedInstructorsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedInstructors"] =
    ResolversParentTypes["PaginatedInstructors"],
> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes["Instructor"]>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedStudentsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PaginatedStudents"] =
    ResolversParentTypes["PaginatedStudents"],
> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes["Student"]>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] =
    ResolversParentTypes["Query"],
> = ResolversObject<{
  checkCorporateEmail?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<QueryCheckCorporateEmailArgs, "email">
  >;
  getArea?: Resolver<
    ResolversTypes["Area"],
    ParentType,
    ContextType,
    RequireFields<QueryGetAreaArgs, "id">
  >;
  getAreas?: Resolver<
    Array<ResolversTypes["Area"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAreasArgs, "regions">
  >;
  getCenter?: Resolver<
    ResolversTypes["CenterInfo"],
    ParentType,
    ContextType,
    RequireFields<QueryGetCenterArgs, "id">
  >;
  getCenters?: Resolver<
    ResolversTypes["PaginatedCenters"],
    ParentType,
    ContextType,
    RequireFields<QueryGetCentersArgs, "center">
  >;
  getGroup?: Resolver<
    ResolversTypes["GroupInfo"],
    ParentType,
    ContextType,
    RequireFields<QueryGetGroupArgs, "id">
  >;
  getGroups?: Resolver<
    ResolversTypes["PaginatedGroups"],
    ParentType,
    ContextType,
    Partial<QueryGetGroupsArgs>
  >;
  getInstructor?: Resolver<
    ResolversTypes["Instructor"],
    ParentType,
    ContextType,
    RequireFields<QueryGetInstructorArgs, "id">
  >;
  getInstructors?: Resolver<
    ResolversTypes["PaginatedInstructors"],
    ParentType,
    ContextType,
    Partial<QueryGetInstructorsArgs>
  >;
  getStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    RequireFields<QueryGetStudentArgs, "id">
  >;
  getStudents?: Resolver<
    ResolversTypes["PaginatedStudents"],
    ParentType,
    ContextType,
    Partial<QueryGetStudentsArgs>
  >;
}>;

export type StudentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Student"] =
    ResolversParentTypes["Student"],
> = ResolversObject<{
  active?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  allergies?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  birthDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  collectionPermit?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  contacts?: Resolver<
    Maybe<Array<ResolversTypes["StudentContact"]>>,
    ParentType,
    ContextType
  >;
  course?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  descriptionAllergy?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  enrolled?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  goesAlone?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  imageAuthorisation?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  oldStudent?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  registrationDate?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  signedMandate?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StudentContactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StudentContact"] =
    ResolversParentTypes["StudentContact"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  send_info?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimetableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Timetable"] =
    ResolversParentTypes["Timetable"],
> = ResolversObject<{
  day?: Resolver<ResolversTypes["Days"], ParentType, ContextType>;
  end?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id_day?: Resolver<ResolversTypes["Number"], ParentType, ContextType>;
  start?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrainingInstructorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["trainingInstructor"] =
    ResolversParentTypes["trainingInstructor"],
> = ResolversObject<{
  careerInEducation?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  technicalCareer?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Area?: AreaResolvers<ContextType>;
  Availability?: AvailabilityResolvers<ContextType>;
  Center?: CenterResolvers<ContextType>;
  CenterContact?: CenterContactResolvers<ContextType>;
  CenterInfo?: CenterInfoResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  GroupInfo?: GroupInfoResolvers<ContextType>;
  Instructor?: InstructorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Number?: GraphQLScalarType;
  PaginatedCenters?: PaginatedCentersResolvers<ContextType>;
  PaginatedGroups?: PaginatedGroupsResolvers<ContextType>;
  PaginatedInstructors?: PaginatedInstructorsResolvers<ContextType>;
  PaginatedStudents?: PaginatedStudentsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  StudentContact?: StudentContactResolvers<ContextType>;
  Timetable?: TimetableResolvers<ContextType>;
  trainingInstructor?: TrainingInstructorResolvers<ContextType>;
}>;
