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
  address: Scalars['String'];
  city: Scalars['String'];
  contacts: Array<CenterContact>;
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  languages: Array<Scalars['String']>;
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

export enum CenterNature {
  Concertado = 'CONCERTADO',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
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
  center: Center;
  course: Scalars['String'];
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
  areas: Array<Scalars['String']>;
  availability: Array<Availability>;
  center: Center;
  corporateEmail: Scalars['String'];
  geographicalAvailability: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['ID'];
  knowledge: Scalars['String'];
  languages: Array<Scalars['String']>;
  materialsExperience: Array<Scalars['String']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  personalEmail: Scalars['String'];
  phone: Scalars['String'];
  platformEducationExperience: Array<Scalars['String']>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars['Boolean'];
  state: StateInstructor;
  summerAvailability: SummerAvailabilityInstructor;
  training: TrainingInstructor;
  urlCV: Scalars['String'];
  vehicle: TypeVehicleInstructor;
};

export type Mutation = {
  __typename?: 'Mutation';
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
  email: Scalars['String'];
  idCenter: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationAddStudentContactArgs = {
  email: Scalars['String'];
  idStudent: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  send_info: Scalars['Boolean'];
};


export type MutationCreateCenterArgs = {
  address: Scalars['String'];
  city: Scalars['String'];
  contacts: Array<CenterContactInput>;
  email?: InputMaybe<Scalars['String']>;
  languages: Array<Scalars['String']>;
  name: Scalars['String'];
  nature: CenterNature;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type: Array<CenterActivityType>;
};


export type MutationCreateGroupArgs = {
  course: Scalars['String'];
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
  center: Scalars['String'];
  corporateEmail: Scalars['String'];
  geographicalAvailability: Scalars['String'];
  groups: Array<Scalars['String']>;
  knowledge: Scalars['String'];
  languages: Array<Scalars['String']>;
  materialsExperience: Array<Scalars['String']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  personalEmail: Scalars['String'];
  phone: Scalars['String'];
  platformEducationExperience: Array<Scalars['String']>;
  previousExperience: PreviousExperienceInstructor;
  programmingExperience: Scalars['Boolean'];
  state: StateInstructor;
  summerAvailability: SummerAvailabilityInstructor;
  training: TrainingInstructor;
  urlCV: Scalars['String'];
  vehicle: TypeVehicleInstructor;
};


export type MutationCreateStudentArgs = {
  alergies: Scalars['Boolean'];
  birthDate: Scalars['String'];
  collectionPermit: Scalars['String'];
  contacts: Array<StudentContactInput>;
  course: Scalars['String'];
  descriptionAllergy?: InputMaybe<Scalars['String']>;
  goesAlone: Scalars['Boolean'];
  idCenter: Scalars['String'];
  idGroup: Scalars['String'];
  imageAuthorisation: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  oldStudent: Scalars['Boolean'];
  signedMandate: Scalars['Boolean'];
};


export type MutationEditCenterArgs = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  languages?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  nature?: InputMaybe<CenterNature>;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<CenterActivityType>>;
};


export type MutationEditCenterContactsArgs = {
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


export type MutationEditStudentArgs = {
  alergies?: InputMaybe<Scalars['Boolean']>;
  birthDate?: InputMaybe<Scalars['String']>;
  collectionPermit?: InputMaybe<Scalars['String']>;
  course?: InputMaybe<Scalars['String']>;
  descriptionAllergy?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  imageAuthorisation?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  oldStudent?: InputMaybe<Scalars['Boolean']>;
  registrationDate?: InputMaybe<Scalars['String']>;
  signedMandate?: InputMaybe<Scalars['Boolean']>;
};


export type MutationEditStudentContactsArgs = {
  email?: InputMaybe<Scalars['String']>;
  idStudent: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  originEmail: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  send_info?: InputMaybe<Scalars['Boolean']>;
};

export enum OrderFilter {
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
  getCenter: Center;
  getCenters: PaginatedCenters;
  getGroup: Group;
  getGroups: PaginatedGroups;
  getInstructor: Instructor;
  getInstructors: PaginatedInstructors;
  getStudent: Student;
  getStudents: PaginatedStudents;
};


export type QueryGetCenterArgs = {
  id: Scalars['String'];
};


export type QueryGetCentersArgs = {
  order?: InputMaybe<Scalars['Number']>;
  orderFilter?: InputMaybe<OrderFilter>;
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

export enum StateInstructor {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Student = {
  __typename?: 'Student';
  alergies: Scalars['Boolean'];
  birthDate: Scalars['String'];
  center: Center;
  collectionPermit: Scalars['String'];
  contacts: Array<StudentContact>;
  course: Scalars['String'];
  descriptionAllergy?: Maybe<Scalars['String']>;
  goesAlone: Scalars['Boolean'];
  group: Group;
  id: Scalars['ID'];
  imageAuthorisation: Scalars['Boolean'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  oldStudent: Scalars['Boolean'];
  registrationDate: Scalars['String'];
  signedMandate: Scalars['Boolean'];
  state: StudentState;
};

export type StudentContact = {
  __typename?: 'StudentContact';
  email: Scalars['String'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  send_info: Scalars['Boolean'];
};

export type StudentContactInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  send_info: Scalars['Boolean'];
};

export enum StudentState {
  Active = 'ACTIVE',
  Withdrawn = 'WITHDRAWN'
}

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

export enum TrainingInstructor {
  CareerInEducation = 'CAREER_IN_EDUCATION',
  TechnicalCareer = 'TECHNICAL_CAREER'
}

export type CreateCenterMutationVariables = Exact<{
  name: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  type: Array<CenterActivityType> | CenterActivityType;
  nature: CenterNature;
  languages: Array<Scalars['String']> | Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  contacts: Array<CenterContactInput> | CenterContactInput;
}>;


export type CreateCenterMutation = { __typename?: 'Mutation', createCenter: { __typename?: 'Center', id: string } };

export type GetCentersFQueryVariables = Exact<{
  searchText?: InputMaybe<Scalars['String']>;
  orderFilter?: InputMaybe<OrderFilter>;
  order?: InputMaybe<Scalars['Number']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type GetCentersFQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', page: number, pageSize: number, totalPages: number, totalNumber: number, data: Array<{ __typename?: 'Center', id: string, name: string, languages: Array<string>, city: string, nature: CenterNature, type: Array<CenterActivityType> }> } };

export type CreateGroupMutationVariables = Exact<{
  idCenter: Scalars['String'];
  name: Scalars['String'];
  modality: GroupModality;
  type: GroupType;
  course: Scalars['String'];
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


export type GetGroupsQuery = { __typename?: 'Query', getGroups: { __typename?: 'PaginatedGroups', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, course: string, timetable: Array<{ __typename?: 'Timetable', day: Days, id_day: any, start: string, end: string }>, center: { __typename?: 'Center', name: string }, instructors: Array<{ __typename?: 'Instructor', name: string }> }> } };

export type SimpleCentersNameQueryVariables = Exact<{ [key: string]: never; }>;


export type SimpleCentersNameQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', data: Array<{ __typename?: 'Center', name: string, id: string }> } };

export type SimpleInstructorsNameQueryVariables = Exact<{ [key: string]: never; }>;


export type SimpleInstructorsNameQuery = { __typename?: 'Query', getInstructors: { __typename?: 'PaginatedInstructors', data: Array<{ __typename?: 'Instructor', name: string, id: string }> } };


export const CreateCenterDocument = gql`
    mutation CreateCenter($name: String!, $address: String!, $city: String!, $type: [CenterActivityType!]!, $nature: CenterNature!, $languages: [String!]!, $phone: String, $email: String, $contacts: [CenterContactInput!]!) {
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
export const GetCentersFDocument = gql`
    query GetCentersF($searchText: String, $orderFilter: OrderFilter, $order: Number, $page: Int, $pageSize: Int) {
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
export const CreateGroupDocument = gql`
    mutation CreateGroup($idCenter: String!, $name: String!, $modality: GroupModality!, $type: GroupType!, $course: String!, $timetable: [TimetableInput!]!, $instructors: [String!]) {
  createGroup(
    idCenter: $idCenter
    name: $name
    modality: $modality
    type: $type
    course: $course
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
 *      course: // value for 'course'
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
      timetable {
        day
        id_day
        start
        end
      }
      course
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
export const SimpleCentersNameDocument = gql`
    query SimpleCentersName {
  getCenters {
    data {
      name
      id
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