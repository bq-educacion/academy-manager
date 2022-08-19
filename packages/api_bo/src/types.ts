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
  address: Scalars["String"];
  contacts: Array<CenterContact>;
  createdAt: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  groups: Array<Group>;
  id: Scalars["ID"];
  languages: Array<Scalars["String"]>;
  name: Scalars["String"];
  nature: CenterNature;
  notes?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  population: Scalars["String"];
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

export enum CenterNature {
  Concertado = "CONCERTADO",
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export enum Days {
  Friday = "FRIDAY",
  Monday = "MONDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
  Thursday = "THURSDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
}

export type Group = {
  __typename?: "Group";
  center: Center;
  course: Scalars["String"];
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
  areas: Array<Scalars["String"]>;
  availability: Array<Availability>;
  center: Center;
  corporateEmail: Scalars["String"];
  geographicalAvailability: Scalars["String"];
  groups: Array<Group>;
  id: Scalars["ID"];
  knowledge: Scalars["String"];
  languages: Array<Scalars["String"]>;
  materialsExperience: Array<Scalars["String"]>;
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  personalEmail: Scalars["String"];
  phone: Scalars["String"];
  platformEducationExperience: Array<Scalars["String"]>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars["Boolean"];
  state: StateInstructor;
  summerAvailability: SummerAvailabilityInstructor;
  training: TrainingInstructor;
  urlCV: Scalars["String"];
  vehicle: TypeVehicleInstructor;
};

export type Mutation = {
  __typename?: "Mutation";
  addCenterContact: CenterContact;
  addStudentContact: StudentContact;
  createCenter: Center;
  createGroup: Group;
  createInstructor: Instructor;
  createStudent: Student;
  editCenter: Center;
  editCenterContacts: CenterContact;
  editGroup: Group;
  editStudent: Student;
  editStudentContacts: StudentContact;
};

export type MutationAddCenterContactArgs = {
  email: Scalars["String"];
  idCenter: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
};

export type MutationAddStudentContactArgs = {
  email: Scalars["String"];
  idStudent: Scalars["String"];
  name: Scalars["String"];
  notes?: InputMaybe<Scalars["String"]>;
  phone: Scalars["String"];
  send_info: Scalars["Boolean"];
};

export type MutationCreateCenterArgs = {
  address: Scalars["String"];
  contacts: Array<CenterContactInput>;
  email?: InputMaybe<Scalars["String"]>;
  languages: Array<Scalars["String"]>;
  name: Scalars["String"];
  nature: CenterNature;
  notes?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  population: Scalars["String"];
  type: Array<CenterActivityType>;
};

export type MutationCreateGroupArgs = {
  course: Scalars["String"];
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
  center: Scalars["String"];
  corporateEmail: Scalars["String"];
  geographicalAvailability: Scalars["String"];
  groups: Array<Scalars["String"]>;
  knowledge: Scalars["String"];
  languages: Array<Scalars["String"]>;
  materialsExperience: Array<Scalars["String"]>;
  name: Scalars["String"];
  notes?: InputMaybe<Scalars["String"]>;
  personalEmail: Scalars["String"];
  phone: Scalars["String"];
  platformEducationExperience: Array<Scalars["String"]>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars["Boolean"];
  state: StateInstructor;
  summerAvailability: SummerAvailabilityInstructor;
  training: TrainingInstructor;
  urlCV: Scalars["String"];
  vehicle: TypeVehicleInstructor;
};

export type MutationCreateStudentArgs = {
  alergies: Scalars["Boolean"];
  birthDate: Scalars["String"];
  collectionPermit: Scalars["String"];
  contacts: Array<StudentContactInput>;
  course: Scalars["String"];
  descriptionAllergy?: InputMaybe<Scalars["String"]>;
  goesAlone: Scalars["Boolean"];
  idCenter: Scalars["String"];
  idGroup: Scalars["String"];
  imageAuthorisation: Scalars["Boolean"];
  name: Scalars["String"];
  notes?: InputMaybe<Scalars["String"]>;
  oldStudent: Scalars["Boolean"];
  signedMandate: Scalars["Boolean"];
};

export type MutationEditCenterArgs = {
  address?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  languages?: InputMaybe<Array<Scalars["String"]>>;
  name?: InputMaybe<Scalars["String"]>;
  nature?: InputMaybe<CenterNature>;
  notes?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  population?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Array<CenterActivityType>>;
};

export type MutationEditCenterContactsArgs = {
  email?: InputMaybe<Scalars["String"]>;
  idCenter: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  originEmail: Scalars["String"];
  phone?: InputMaybe<Scalars["String"]>;
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

export type MutationEditStudentArgs = {
  alergies?: InputMaybe<Scalars["Boolean"]>;
  birthDate?: InputMaybe<Scalars["String"]>;
  collectionPermit?: InputMaybe<Scalars["String"]>;
  course?: InputMaybe<Scalars["String"]>;
  descriptionAllergy?: InputMaybe<Scalars["String"]>;
  group?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  imageAuthorisation?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  notes?: InputMaybe<Scalars["String"]>;
  oldStudent?: InputMaybe<Scalars["Boolean"]>;
  registrationDate?: InputMaybe<Scalars["String"]>;
  signedMandate?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationEditStudentContactsArgs = {
  email?: InputMaybe<Scalars["String"]>;
  idStudent: Scalars["String"];
  name?: InputMaybe<Scalars["String"]>;
  notes?: InputMaybe<Scalars["String"]>;
  originEmail: Scalars["String"];
  phone?: InputMaybe<Scalars["String"]>;
  send_info?: InputMaybe<Scalars["Boolean"]>;
};

export enum OrderFilter {
  Languages = "languages",
  Name = "name",
  Nature = "nature",
  Population = "population",
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
  getCenter: Center;
  getCenters: PaginatedCenters;
  getGroup: Group;
  getGroups: PaginatedGroups;
  getInstructor: Instructor;
  getInstructors: Array<Instructor>;
  getStudent: Student;
  getStudents: PaginatedStudents;
};

export type QueryGetCenterArgs = {
  id: Scalars["String"];
};

export type QueryGetCentersArgs = {
  order?: InputMaybe<Scalars["Number"]>;
  orderFilter?: InputMaybe<OrderFilter>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  searchText?: InputMaybe<Scalars["String"]>;
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

export enum StateInstructor {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export type Student = {
  __typename?: "Student";
  alergies: Scalars["Boolean"];
  birthDate: Scalars["String"];
  center: Center;
  collectionPermit: Scalars["String"];
  contacts: Array<StudentContact>;
  course: Scalars["String"];
  descriptionAllergy?: Maybe<Scalars["String"]>;
  goesAlone: Scalars["Boolean"];
  group: Group;
  id: Scalars["ID"];
  imageAuthorisation: Scalars["Boolean"];
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  oldStudent: Scalars["Boolean"];
  registrationDate: Scalars["String"];
  signedMandate: Scalars["Boolean"];
  state: StudentState;
};

export type StudentContact = {
  __typename?: "StudentContact";
  email: Scalars["String"];
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  phone: Scalars["String"];
  send_info: Scalars["Boolean"];
};

export type StudentContactInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  notes?: InputMaybe<Scalars["String"]>;
  phone: Scalars["String"];
  send_info: Scalars["Boolean"];
};

export enum StudentState {
  Active = "ACTIVE",
  Withdrawn = "WITHDRAWN",
}

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

export enum TrainingInstructor {
  CareerInEducation = "CAREER_IN_EDUCATION",
  TechnicalCareer = "TECHNICAL_CAREER",
}

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
  Availability: ResolverTypeWrapper<Availability>;
  AvailabilityInput: AvailabilityInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Center: ResolverTypeWrapper<Center>;
  CenterActivityType: CenterActivityType;
  CenterContact: ResolverTypeWrapper<CenterContact>;
  CenterContactInput: CenterContactInput;
  CenterNature: CenterNature;
  Days: Days;
  Group: ResolverTypeWrapper<Group>;
  GroupModality: GroupModality;
  GroupType: GroupType;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Instructor: ResolverTypeWrapper<Instructor>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Number: ResolverTypeWrapper<Scalars["Number"]>;
  OrderFilter: OrderFilter;
  OrderFilterGroup: OrderFilterGroup;
  OrderFilterStudent: OrderFilterStudent;
  PaginatedCenters: ResolverTypeWrapper<PaginatedCenters>;
  PaginatedGroups: ResolverTypeWrapper<PaginatedGroups>;
  PaginatedStudents: ResolverTypeWrapper<PaginatedStudents>;
  Query: ResolverTypeWrapper<{}>;
  StateInstructor: StateInstructor;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Student: ResolverTypeWrapper<Student>;
  StudentContact: ResolverTypeWrapper<StudentContact>;
  StudentContactInput: StudentContactInput;
  StudentState: StudentState;
  Timetable: ResolverTypeWrapper<Timetable>;
  TimetableInput: TimetableInput;
  TypeVehicleInstructor: TypeVehicleInstructor;
  previousExperienceInstructor: PreviousExperienceInstructor;
  summerAvailabilityInstructor: SummerAvailabilityInstructor;
  trainingInstructor: TrainingInstructor;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Availability: Availability;
  AvailabilityInput: AvailabilityInput;
  Boolean: Scalars["Boolean"];
  Center: Center;
  CenterContact: CenterContact;
  CenterContactInput: CenterContactInput;
  Group: Group;
  ID: Scalars["ID"];
  Instructor: Instructor;
  Int: Scalars["Int"];
  Mutation: {};
  Number: Scalars["Number"];
  PaginatedCenters: PaginatedCenters;
  PaginatedGroups: PaginatedGroups;
  PaginatedStudents: PaginatedStudents;
  Query: {};
  String: Scalars["String"];
  Student: Student;
  StudentContact: StudentContact;
  StudentContactInput: StudentContactInput;
  Timetable: Timetable;
  TimetableInput: TimetableInput;
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
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  contacts?: Resolver<
    Array<ResolversTypes["CenterContact"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  languages?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nature?: Resolver<ResolversTypes["CenterNature"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  population?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type GroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Group"] =
    ResolversParentTypes["Group"],
> = ResolversObject<{
  center?: Resolver<ResolversTypes["Center"], ParentType, ContextType>;
  course?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type InstructorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Instructor"] =
    ResolversParentTypes["Instructor"],
> = ResolversObject<{
  areas?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  availability?: Resolver<
    Array<ResolversTypes["Availability"]>,
    ParentType,
    ContextType
  >;
  center?: Resolver<ResolversTypes["Center"], ParentType, ContextType>;
  corporateEmail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  geographicalAvailability?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  knowledge?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  languages?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  materialsExperience?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  personalEmail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  platformEducationExperience?: Resolver<
    Array<ResolversTypes["String"]>,
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
  state?: Resolver<ResolversTypes["StateInstructor"], ParentType, ContextType>;
  summerAvailability?: Resolver<
    ResolversTypes["summerAvailabilityInstructor"],
    ParentType,
    ContextType
  >;
  training?: Resolver<
    ResolversTypes["trainingInstructor"],
    ParentType,
    ContextType
  >;
  urlCV?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
    RequireFields<
      MutationAddCenterContactArgs,
      "email" | "idCenter" | "name" | "phone"
    >
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
  createCenter?: Resolver<
    ResolversTypes["Center"],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateCenterArgs,
      | "address"
      | "contacts"
      | "languages"
      | "name"
      | "nature"
      | "population"
      | "type"
    >
  >;
  createGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateGroupArgs,
      "course" | "idCenter" | "modality" | "name" | "timetable" | "type"
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
      | "center"
      | "corporateEmail"
      | "geographicalAvailability"
      | "groups"
      | "knowledge"
      | "languages"
      | "materialsExperience"
      | "name"
      | "personalEmail"
      | "phone"
      | "platformEducationExperience"
      | "previousExperience"
      | "programmingExperience"
      | "state"
      | "summerAvailability"
      | "training"
      | "urlCV"
      | "vehicle"
    >
  >;
  createStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateStudentArgs,
      | "alergies"
      | "birthDate"
      | "collectionPermit"
      | "contacts"
      | "course"
      | "goesAlone"
      | "idCenter"
      | "idGroup"
      | "imageAuthorisation"
      | "name"
      | "oldStudent"
      | "signedMandate"
    >
  >;
  editCenter?: Resolver<
    ResolversTypes["Center"],
    ParentType,
    ContextType,
    RequireFields<MutationEditCenterArgs, "id">
  >;
  editCenterContacts?: Resolver<
    ResolversTypes["CenterContact"],
    ParentType,
    ContextType,
    RequireFields<MutationEditCenterContactsArgs, "idCenter" | "originEmail">
  >;
  editGroup?: Resolver<
    ResolversTypes["Group"],
    ParentType,
    ContextType,
    RequireFields<MutationEditGroupArgs, "id">
  >;
  editStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    RequireFields<MutationEditStudentArgs, "id">
  >;
  editStudentContacts?: Resolver<
    ResolversTypes["StudentContact"],
    ParentType,
    ContextType,
    RequireFields<MutationEditStudentContactsArgs, "idStudent" | "originEmail">
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
  getCenter?: Resolver<
    ResolversTypes["Center"],
    ParentType,
    ContextType,
    RequireFields<QueryGetCenterArgs, "id">
  >;
  getCenters?: Resolver<
    ResolversTypes["PaginatedCenters"],
    ParentType,
    ContextType,
    Partial<QueryGetCentersArgs>
  >;
  getGroup?: Resolver<
    ResolversTypes["Group"],
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
    Array<ResolversTypes["Instructor"]>,
    ParentType,
    ContextType
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
  alergies?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  birthDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  center?: Resolver<ResolversTypes["Center"], ParentType, ContextType>;
  collectionPermit?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  contacts?: Resolver<
    Array<ResolversTypes["StudentContact"]>,
    ParentType,
    ContextType
  >;
  course?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  descriptionAllergy?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  goesAlone?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  group?: Resolver<ResolversTypes["Group"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  imageAuthorisation?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  oldStudent?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  registrationDate?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  signedMandate?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  state?: Resolver<ResolversTypes["StudentState"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StudentContactResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StudentContact"] =
    ResolversParentTypes["StudentContact"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = ResolversObject<{
  Availability?: AvailabilityResolvers<ContextType>;
  Center?: CenterResolvers<ContextType>;
  CenterContact?: CenterContactResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Instructor?: InstructorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Number?: GraphQLScalarType;
  PaginatedCenters?: PaginatedCentersResolvers<ContextType>;
  PaginatedGroups?: PaginatedGroupsResolvers<ContextType>;
  PaginatedStudents?: PaginatedStudentsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  StudentContact?: StudentContactResolvers<ContextType>;
  Timetable?: TimetableResolvers<ContextType>;
}>;
