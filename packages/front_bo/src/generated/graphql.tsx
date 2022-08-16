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

export type Center = {
  __typename?: 'Center';
  activityTypes: CenterActivityTypes;
  address: Scalars['String'];
  contacts: Array<CenterContact>;
  course: Scalars['String'];
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  languages: Array<Scalars['String']>;
  modality: CenterModality;
  name: Scalars['String'];
  nature: CenterNature;
  notes?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  population: Scalars['String'];
  type: CenterType;
};

export enum CenterActivityTypes {
  Extracurricular = 'EXTRACURRICULAR',
  Others = 'OTHERS',
  Workshops = 'WORKSHOPS'
}

export type CenterContact = {
  __typename?: 'CenterContact';
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  surname: Scalars['String'];
};

export enum CenterModality {
  Online = 'ONLINE',
  Presential = 'PRESENTIAL',
  SemiPresential = 'SEMI_PRESENTIAL'
}

export enum CenterNature {
  Concerted = 'CONCERTED',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export enum CenterType {
  Academy = 'ACADEMY',
  Campus = 'CAMPUS',
  NoAcademy = 'NO_ACADEMY'
}

export type ContactStudent = {
  __typename?: 'ContactStudent';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  send_info?: Maybe<Scalars['Boolean']>;
  surname?: Maybe<Scalars['String']>;
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

export type Group = {
  __typename?: 'Group';
  center: Center;
  course: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  id_group: Scalars['Number'];
  instructors: Array<Instructor>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  students: Array<Student>;
  timetable: Array<Timetable>;
  type: GroupType;
};

export enum GroupType {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

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

export type Mutation = {
  __typename?: 'Mutation';
  addCenterContact: CenterContact;
  createCenter: Center;
  createGroup: Group;
  editCenter: Center;
  editCenterContacts: CenterContact;
};


export type MutationAddCenterContactArgs = {
  email: Scalars['String'];
  idCenter: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  surname: Scalars['String'];
};


export type MutationCreateCenterArgs = {
  activityTypes: CenterActivityTypes;
  address: Scalars['String'];
  course: Scalars['String'];
  email: Scalars['String'];
  languages: Array<Scalars['String']>;
  modality: CenterModality;
  name: Scalars['String'];
  nature: CenterNature;
  notes?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  population: Scalars['String'];
  type: CenterType;
};


export type MutationCreateGroupArgs = {
  course: Scalars['String'];
  idCenter: Scalars['String'];
  instructors?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  timetable: Array<TimetableInput>;
  type: GroupType;
};


export type MutationEditCenterArgs = {
  activityTypes?: InputMaybe<CenterActivityTypes>;
  address?: InputMaybe<Scalars['String']>;
  course?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  languages?: InputMaybe<Array<Scalars['String']>>;
  modality?: InputMaybe<CenterModality>;
  name?: InputMaybe<Scalars['String']>;
  nature?: InputMaybe<CenterNature>;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  population?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<CenterType>;
};


export type MutationEditCenterContactsArgs = {
  email?: InputMaybe<Scalars['String']>;
  idCenter: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  originEmail: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export enum OrderFilter {
  Languages = 'languages',
  Modality = 'modality',
  Name = 'name',
  Population = 'population',
  Type = 'type'
}

export enum OrderFilterGroup {
  Center = 'center',
  End = 'end',
  IdGroup = 'id_group',
  Instructors = 'instructors',
  Start = 'start'
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

export type Query = {
  __typename?: 'Query';
  getCenter: Center;
  getCenters: PaginatedCenters;
  getGroup: Group;
  getGroups: PaginatedGroups;
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

export type Timetable = {
  __typename?: 'Timetable';
  day: Days;
  end: Scalars['String'];
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

export type GetCentersQueryVariables = Exact<{
  searchText?: InputMaybe<Scalars['String']>;
  orderFilter?: InputMaybe<OrderFilter>;
  order?: InputMaybe<Scalars['Number']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type GetCentersQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', page: number, totalPages: number, totalNumber: number, pageSize: number, data: Array<{ __typename?: 'Center', id: string, name: string, address: string, population: string, phone: string, email?: string | null, type: CenterType, activityTypes: CenterActivityTypes, modality: CenterModality, nature: CenterNature, course: string, languages: Array<string>, notes?: string | null, createdAt: string, contacts: Array<{ __typename?: 'CenterContact', phone: string, email: string, surname: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, id_group: any, name: string, type: GroupType, createdAt: string, course: string, timetable: Array<{ __typename?: 'Timetable', day: Days }> }> }> } };

export type GetCentersFQueryVariables = Exact<{
  searchText?: InputMaybe<Scalars['String']>;
  orderFilter?: InputMaybe<OrderFilter>;
  order?: InputMaybe<Scalars['Number']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type GetCentersFQuery = { __typename?: 'Query', getCenters: { __typename?: 'PaginatedCenters', page: number, pageSize: number, totalPages: number, totalNumber: number, data: Array<{ __typename?: 'Center', id: string, name: string, languages: Array<string>, population: string, modality: CenterModality, type: CenterType }> } };


export const GetCentersDocument = gql`
    query GetCenters($searchText: String, $orderFilter: OrderFilter, $order: Number, $page: Int, $pageSize: Int) {
  getCenters(
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
      address
      population
      phone
      email
      type
      activityTypes
      modality
      nature
      course
      languages
      notes
      createdAt
      contacts {
        phone
        email
        surname
        name
      }
      groups {
        id
        id_group
        name
        type
        createdAt
        course
        timetable {
          day
        }
      }
    }
  }
}
    `;

/**
 * __useGetCentersQuery__
 *
 * To run a query within a React component, call `useGetCentersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCentersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCentersQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      orderFilter: // value for 'orderFilter'
 *      order: // value for 'order'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetCentersQuery(baseOptions?: Apollo.QueryHookOptions<GetCentersQuery, GetCentersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCentersQuery, GetCentersQueryVariables>(GetCentersDocument, options);
      }
export function useGetCentersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCentersQuery, GetCentersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCentersQuery, GetCentersQueryVariables>(GetCentersDocument, options);
        }
export type GetCentersQueryHookResult = ReturnType<typeof useGetCentersQuery>;
export type GetCentersLazyQueryHookResult = ReturnType<typeof useGetCentersLazyQuery>;
export type GetCentersQueryResult = Apollo.QueryResult<GetCentersQuery, GetCentersQueryVariables>;
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
      modality
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