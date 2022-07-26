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

export type Center = {
  __typename?: "Center";
  address: Scalars["String"];
  contacts?: Maybe<Array<Maybe<ContactCenter>>>;
  course: Scalars["String"];
  createdAt: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  groups?: Maybe<Array<Maybe<Group>>>;
  id: Scalars["ID"];
  languages: Array<Scalars["String"]>;
  modality: ModalityCenter;
  name: Scalars["String"];
  nature: NatureCenter;
  notes?: Maybe<Scalars["String"]>;
  phone: Scalars["String"];
  population: Scalars["String"];
  type: TypeCenter;
  typeActivities: TypeActivities;
};

export type ContactCenter = {
  __typename?: "ContactCenter";
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  surname: Scalars["String"];
};

export type ContactStudent = {
  __typename?: "ContactStudent";
  email: Scalars["String"];
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  phone: Scalars["String"];
  send_info: Scalars["Boolean"];
  surname: Scalars["String"];
};

export type Group = {
  __typename?: "Group";
  center: Center;
  course: Scalars["String"];
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  id_group?: Maybe<Scalars["Number"]>;
  instructors?: Maybe<Array<Maybe<Instructor>>>;
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  students?: Maybe<Array<Maybe<Student>>>;
  timetable?: Maybe<Array<Maybe<Scalars["String"]>>>;
  type: TypeGroup;
};

export type Instructor = {
  __typename?: "Instructor";
  availability?: Maybe<Array<Maybe<Scalars["String"]>>>;
  center: Center;
  corporateEmail: Scalars["String"];
  expertise: Scalars["String"];
  formation: Scalars["String"];
  geographicalAvailability?: Maybe<Array<Maybe<Scalars["String"]>>>;
  groups?: Maybe<Array<Maybe<Group>>>;
  id: Scalars["ID"];
  languages: Array<Scalars["String"]>;
  materialExperience?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  personalEmail: Scalars["String"];
  phone: Scalars["String"];
  platformEducationExperience?: Maybe<Array<Maybe<Scalars["String"]>>>;
  previousExperience: Scalars["String"];
  programmingExperience: Scalars["Boolean"];
  state: State;
  summerAvailability: Scalars["String"];
  surname: Scalars["String"];
  typeVehicle: TypeVehicle;
  vehicle: Scalars["Boolean"];
};

export enum ModalityCenter {
  Online = "ONLINE",
  Presential = "PRESENTIAL",
  SemiPresential = "SEMI_PRESENTIAL",
}

export type Mutation = {
  __typename?: "Mutation";
  addContactCenter: Scalars["String"];
  createCenter: Scalars["String"];
};

export type MutationAddContactCenterArgs = {
  email: Scalars["String"];
  idCenter: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  surname: Scalars["String"];
};

export type MutationCreateCenterArgs = {
  address: Scalars["String"];
  course: Scalars["String"];
  email: Scalars["String"];
  languages: Array<Scalars["String"]>;
  modality: ModalityCenter;
  name: Scalars["String"];
  nature: NatureCenter;
  notes?: InputMaybe<Scalars["String"]>;
  phone: Scalars["String"];
  population: Scalars["String"];
  type: TypeCenter;
  typeActivities: TypeActivities;
};

export enum NatureCenter {
  Concerted = "CONCERTED",
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type Query = {
  __typename?: "Query";
  getCenter: Center;
  getCenters: Array<Center>;
};

export type QueryGetCenterArgs = {
  id: Scalars["String"];
};

export enum State {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export type Student = {
  __typename?: "Student";
  alergies: Scalars["Boolean"];
  birthDate: Scalars["String"];
  center: Center;
  collectionAuthorisation: Scalars["String"];
  contact?: Maybe<ContactStudent>;
  course: Scalars["String"];
  descriptionAllergy?: Maybe<Scalars["String"]>;
  goesAlone: Scalars["Boolean"];
  group?: Maybe<Group>;
  id: Scalars["ID"];
  imageAuthorisation: Scalars["Boolean"];
  name: Scalars["String"];
  notes?: Maybe<Scalars["String"]>;
  oldStudent: Scalars["Boolean"];
  registration: Scalars["String"];
  signedMandate: Scalars["Boolean"];
  state: State;
  surname: Scalars["String"];
};

export enum TypeActivities {
  Extracurricular = "EXTRACURRICULAR",
  Others = "OTHERS",
  Workshops = "WORKSHOPS",
}

export enum TypeCenter {
  Academy = "ACADEMY",
  Campus = "CAMPUS",
  NoAcademy = "NO_ACADEMY",
}

export enum TypeGroup {
  External = "EXTERNAL",
  Internal = "INTERNAL",
}

export enum TypeVehicle {
  Own = "OWN",
  PublicTransport = "PUBLIC_TRANSPORT",
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
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Center: ResolverTypeWrapper<Center>;
  ContactCenter: ResolverTypeWrapper<ContactCenter>;
  ContactStudent: ResolverTypeWrapper<ContactStudent>;
  Group: ResolverTypeWrapper<Group>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Instructor: ResolverTypeWrapper<Instructor>;
  ModalityCenter: ModalityCenter;
  Mutation: ResolverTypeWrapper<{}>;
  NatureCenter: NatureCenter;
  Number: ResolverTypeWrapper<Scalars["Number"]>;
  Query: ResolverTypeWrapper<{}>;
  State: State;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Student: ResolverTypeWrapper<Student>;
  TypeActivities: TypeActivities;
  TypeCenter: TypeCenter;
  TypeGroup: TypeGroup;
  TypeVehicle: TypeVehicle;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars["Boolean"];
  Center: Center;
  ContactCenter: ContactCenter;
  ContactStudent: ContactStudent;
  Group: Group;
  ID: Scalars["ID"];
  Instructor: Instructor;
  Mutation: {};
  Number: Scalars["Number"];
  Query: {};
  String: Scalars["String"];
  Student: Student;
}>;

export type CenterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Center"] =
    ResolversParentTypes["Center"],
> = ResolversObject<{
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  contacts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ContactCenter"]>>>,
    ParentType,
    ContextType
  >;
  course?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  groups?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Group"]>>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  languages?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  modality?: Resolver<
    ResolversTypes["ModalityCenter"],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nature?: Resolver<ResolversTypes["NatureCenter"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  population?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["TypeCenter"], ParentType, ContextType>;
  typeActivities?: Resolver<
    ResolversTypes["TypeActivities"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactCenterResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ContactCenter"] =
    ResolversParentTypes["ContactCenter"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactStudentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ContactStudent"] =
    ResolversParentTypes["ContactStudent"],
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  send_info?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  id_group?: Resolver<Maybe<ResolversTypes["Number"]>, ParentType, ContextType>;
  instructors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Instructor"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  students?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Student"]>>>,
    ParentType,
    ContextType
  >;
  timetable?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes["TypeGroup"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InstructorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Instructor"] =
    ResolversParentTypes["Instructor"],
> = ResolversObject<{
  availability?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  center?: Resolver<ResolversTypes["Center"], ParentType, ContextType>;
  corporateEmail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expertise?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  formation?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  geographicalAvailability?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  groups?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Group"]>>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  languages?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  materialExperience?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  personalEmail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  platformEducationExperience?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  previousExperience?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  programmingExperience?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  state?: Resolver<ResolversTypes["State"], ParentType, ContextType>;
  summerAvailability?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  typeVehicle?: Resolver<
    ResolversTypes["TypeVehicle"],
    ParentType,
    ContextType
  >;
  vehicle?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] =
    ResolversParentTypes["Mutation"],
> = ResolversObject<{
  addContactCenter?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddContactCenterArgs,
      "email" | "idCenter" | "name" | "phone" | "surname"
    >
  >;
  createCenter?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateCenterArgs,
      | "address"
      | "course"
      | "email"
      | "languages"
      | "modality"
      | "name"
      | "nature"
      | "phone"
      | "population"
      | "type"
      | "typeActivities"
    >
  >;
}>;

export interface NumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Number"], any> {
  name: "Number";
}

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
    Array<ResolversTypes["Center"]>,
    ParentType,
    ContextType
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
  collectionAuthorisation?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  contact?: Resolver<
    Maybe<ResolversTypes["ContactStudent"]>,
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
  group?: Resolver<Maybe<ResolversTypes["Group"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  imageAuthorisation?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  oldStudent?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  registration?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  signedMandate?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  state?: Resolver<ResolversTypes["State"], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Center?: CenterResolvers<ContextType>;
  ContactCenter?: ContactCenterResolvers<ContextType>;
  ContactStudent?: ContactStudentResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  Instructor?: InstructorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Number?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
}>;
