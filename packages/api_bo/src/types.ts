import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  __typename?: 'Center';
  address?: Maybe<Scalars['String']>;
  contacts?: Maybe<Array<ContactCenter>>;
  course?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Group>>;
  id?: Maybe<Scalars['ID']>;
  languages?: Maybe<Array<Scalars['String']>>;
  modality?: Maybe<ModalityCenter>;
  name?: Maybe<Scalars['String']>;
  nature?: Maybe<NatureCenter>;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  population?: Maybe<Scalars['String']>;
  type?: Maybe<TypeCenter>;
  typeActivities?: Maybe<TypeActivitiesCenter>;
};

export type ContactCenter = {
  __typename?: 'ContactCenter';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
};

export type ContactStudent = {
  __typename?: 'ContactStudent';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  send_info?: Maybe<Scalars['Boolean']>;
  surname?: Maybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  center?: Maybe<Center>;
  course?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_group?: Maybe<Scalars['Number']>;
  instructors?: Maybe<Array<Instructor>>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  students?: Maybe<Array<Student>>;
  timetable?: Maybe<Array<Scalars['String']>>;
  type?: Maybe<TypeGroup>;
};

export type Instructor = {
  __typename?: 'Instructor';
  availability?: Maybe<Array<Scalars['String']>>;
  center?: Maybe<Center>;
  corporateEmail?: Maybe<Scalars['String']>;
  expertise?: Maybe<Scalars['String']>;
  formation?: Maybe<Scalars['String']>;
  geographicalAvailability?: Maybe<Array<Scalars['String']>>;
  id?: Maybe<Scalars['ID']>;
  languages?: Maybe<Array<Scalars['String']>>;
  materialExperience?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  personalEmail?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  platformEducationExperience?: Maybe<Array<Scalars['String']>>;
  previousExperience?: Maybe<Scalars['String']>;
  programmingExperience?: Maybe<Scalars['Boolean']>;
  state?: Maybe<StateInstructor>;
  summerAvailability?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  typeVehicle?: Maybe<TypeVehicleInstructor>;
  vehicle?: Maybe<Scalars['Boolean']>;
};

export enum ModalityCenter {
  Online = 'ONLINE',
  Presential = 'PRESENTIAL',
  SemiPresential = 'SEMI_PRESENTIAL'
}

export type Mutation = {
  __typename?: 'Mutation';
  addContactCenter: ContactCenter;
  createCenter: Center;
};


export type MutationAddContactCenterArgs = {
  email: Scalars['String'];
  idCenter: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  surname: Scalars['String'];
};


export type MutationCreateCenterArgs = {
  address: Scalars['String'];
  course: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  languages: Array<Scalars['String']>;
  modality: ModalityCenter;
  name: Scalars['String'];
  nature: NatureCenter;
  notes?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  population: Scalars['String'];
  type: TypeCenter;
  typeActivities: TypeActivitiesCenter;
};

export enum NatureCenter {
  Concerted = 'CONCERTED',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  getCenter: Center;
  getCenters?: Maybe<Array<Center>>;
};


export type QueryGetCenterArgs = {
  id: Scalars['String'];
};

export enum StateInstructor {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum StateStudent {
  Active = 'ACTIVE',
  Withdrawn = 'WITHDRAWN'
}

export type Student = {
  __typename?: 'Student';
  alergies?: Maybe<Scalars['Boolean']>;
  birthDate?: Maybe<Scalars['String']>;
  center?: Maybe<Center>;
  collectionAuthorisation?: Maybe<Scalars['String']>;
  contact?: Maybe<ContactStudent>;
  course?: Maybe<Scalars['String']>;
  descriptionAllergy?: Maybe<Scalars['String']>;
  goesAlone?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  imageAuthorisation?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  oldStudent?: Maybe<Scalars['Boolean']>;
  registration?: Maybe<Scalars['String']>;
  signedMandate?: Maybe<Scalars['Boolean']>;
  state?: Maybe<StateStudent>;
  surname?: Maybe<Scalars['String']>;
};

export enum TypeActivitiesCenter {
  Extracurricular = 'EXTRACURRICULAR',
  Others = 'OTHERS',
  Workshops = 'WORKSHOPS'
}

export enum TypeCenter {
  Academy = 'ACADEMY',
  Campus = 'CAMPUS',
  NoAcademy = 'NO_ACADEMY'
}

export enum TypeGroup {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export enum TypeVehicleInstructor {
  Own = 'OWN',
  PublicTransport = 'PUBLIC_TRANSPORT'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Center: ResolverTypeWrapper<Center>;
  ContactCenter: ResolverTypeWrapper<ContactCenter>;
  ContactStudent: ResolverTypeWrapper<ContactStudent>;
  Group: ResolverTypeWrapper<Group>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Instructor: ResolverTypeWrapper<Instructor>;
  ModalityCenter: ModalityCenter;
  Mutation: ResolverTypeWrapper<{}>;
  NatureCenter: NatureCenter;
  Number: ResolverTypeWrapper<Scalars['Number']>;
  Query: ResolverTypeWrapper<{}>;
  StateInstructor: StateInstructor;
  StateStudent: StateStudent;
  String: ResolverTypeWrapper<Scalars['String']>;
  Student: ResolverTypeWrapper<Student>;
  TypeActivitiesCenter: TypeActivitiesCenter;
  TypeCenter: TypeCenter;
  TypeGroup: TypeGroup;
  TypeVehicleInstructor: TypeVehicleInstructor;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Center: Center;
  ContactCenter: ContactCenter;
  ContactStudent: ContactStudent;
  Group: Group;
  ID: Scalars['ID'];
  Instructor: Instructor;
  Mutation: {};
  Number: Scalars['Number'];
  Query: {};
  String: Scalars['String'];
  Student: Student;
}>;

export type CenterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Center'] = ResolversParentTypes['Center']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<ResolversTypes['ContactCenter']>>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groups?: Resolver<Maybe<Array<ResolversTypes['Group']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  languages?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  modality?: Resolver<Maybe<ResolversTypes['ModalityCenter']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nature?: Resolver<Maybe<ResolversTypes['NatureCenter']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  population?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['TypeCenter']>, ParentType, ContextType>;
  typeActivities?: Resolver<Maybe<ResolversTypes['TypeActivitiesCenter']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactCenterResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactCenter'] = ResolversParentTypes['ContactCenter']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContactStudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactStudent'] = ResolversParentTypes['ContactStudent']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  send_info?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  center?: Resolver<Maybe<ResolversTypes['Center']>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id_group?: Resolver<Maybe<ResolversTypes['Number']>, ParentType, ContextType>;
  instructors?: Resolver<Maybe<Array<ResolversTypes['Instructor']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  students?: Resolver<Maybe<Array<ResolversTypes['Student']>>, ParentType, ContextType>;
  timetable?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['TypeGroup']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InstructorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Instructor'] = ResolversParentTypes['Instructor']> = ResolversObject<{
  availability?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  center?: Resolver<Maybe<ResolversTypes['Center']>, ParentType, ContextType>;
  corporateEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expertise?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  formation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  geographicalAvailability?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  languages?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  materialExperience?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  personalEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  platformEducationExperience?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  previousExperience?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  programmingExperience?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['StateInstructor']>, ParentType, ContextType>;
  summerAvailability?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  typeVehicle?: Resolver<Maybe<ResolversTypes['TypeVehicleInstructor']>, ParentType, ContextType>;
  vehicle?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addContactCenter?: Resolver<ResolversTypes['ContactCenter'], ParentType, ContextType, RequireFields<MutationAddContactCenterArgs, 'email' | 'idCenter' | 'name' | 'phone' | 'surname'>>;
  createCenter?: Resolver<ResolversTypes['Center'], ParentType, ContextType, RequireFields<MutationCreateCenterArgs, 'address' | 'course' | 'languages' | 'modality' | 'name' | 'nature' | 'phone' | 'population' | 'type' | 'typeActivities'>>;
}>;

export interface NumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Number'], any> {
  name: 'Number';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getCenter?: Resolver<ResolversTypes['Center'], ParentType, ContextType, RequireFields<QueryGetCenterArgs, 'id'>>;
  getCenters?: Resolver<Maybe<Array<ResolversTypes['Center']>>, ParentType, ContextType>;
}>;

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = ResolversObject<{
  alergies?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  birthDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  center?: Resolver<Maybe<ResolversTypes['Center']>, ParentType, ContextType>;
  collectionAuthorisation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['ContactStudent']>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  descriptionAllergy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  goesAlone?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageAuthorisation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  oldStudent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  registration?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signedMandate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['StateStudent']>, ParentType, ContextType>;
  surname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

