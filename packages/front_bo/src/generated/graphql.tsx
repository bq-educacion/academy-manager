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
  population: Scalars['String'];
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
  contacts: Array<CenterContactInput>;
  email?: InputMaybe<Scalars['String']>;
  languages: Array<Scalars['String']>;
  name: Scalars['String'];
  nature: CenterNature;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  population: Scalars['String'];
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
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  languages?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  nature?: InputMaybe<CenterNature>;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  population?: InputMaybe<Scalars['String']>;
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
  Languages = 'languages',
  Name = 'name',
  Nature = 'nature',
  Population = 'population',
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
  getInstructors: Array<Instructor>;
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
  population: Scalars['String'];
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


export type GetCentersFQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', page: number, pageSize: number, totalPages: number, totalNumber: number, data: Array<{ __typename?: 'Center', id: string, name: string, languages: Array<string>, population: string, nature: CenterNature, type: Array<CenterActivityType> }> } };


export const CreateCenterDocument = gql`
    mutation CreateCenter($name: String!, $address: String!, $population: String!, $type: [CenterActivityType!]!, $nature: CenterNature!, $languages: [String!]!, $phone: String, $email: String, $contacts: [CenterContactInput!]!) {
  createCenter(
    name: $name
    address: $address
    population: $population
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
 *      population: // value for 'population'
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
      population
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