/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ClassRoom = {
  __typename?: "ClassRoom";
  _id: Scalars["ID"];
  name: Scalars["String"];
  tags: Array<Scalars["String"]>;
  desc: Scalars["String"];
  image: Scalars["String"];
  inviteSecret: Scalars["String"];
  inviteSecretTmp: Scalars["Float"];
  owner: User;
  rate: Scalars["Float"];
  state: Scalars["String"];
  course: Array<Course>;
  members: Array<User>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type ClassRoomInput = {
  name: Scalars["String"];
  course?: Maybe<Array<Scalars["String"]>>;
  tags?: Maybe<Array<Scalars["String"]>>;
  desc: Scalars["String"];
  image: Scalars["String"];
  members?: Maybe<Array<Scalars["String"]>>;
  state?: Maybe<Scalars["String"]>;
};

export type ClassRoomUpdateInput = {
  _id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  desc?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  rate?: Maybe<Scalars["Float"]>;
  state?: Maybe<Scalars["String"]>;
  course?: Maybe<Array<Scalars["String"]>>;
  members?: Maybe<Array<Scalars["String"]>>;
};

export type Comment = {
  __typename?: "Comment";
  _id: Scalars["ID"];
  commenter: User;
  parent?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  step: Scalars["String"];
  course: Scalars["String"];
  classRoom: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type CommentInput = {
  content: Scalars["String"];
  step: Scalars["String"];
  parent?: Maybe<Scalars["String"]>;
  course: Scalars["String"];
  classRoom: Scalars["String"];
};

export type CommentUpdateInput = {
  _id: Scalars["ID"];
  content: Scalars["String"];
};

export type Course = {
  __typename?: "Course";
  _id: Scalars["ID"];
  title: Scalars["String"];
  steps: Array<Steps>;
  rating: Scalars["Float"];
  localRate: Scalars["Float"];
  classRoom: ClassRoom;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type CourseInput = {
  title: Scalars["String"];
  steps: Array<StepsInput>;
  classRoom: Scalars["String"];
};

export type CourseUpdateInput = {
  _id: Scalars["ID"];
  title: Scalars["String"];
  steps: Array<StepsInput>;
};

export type Ilama_Response = {
  __typename?: "ILAMA_Response";
  ok: Scalars["Boolean"];
  message: Scalars["String"];
  user: User;
};

export type IdeleteResponse = {
  __typename?: "IdeleteResponse";
  n: Scalars["Float"];
  ok: Scalars["Float"];
  deletedCount: Scalars["Float"];
};

export type Mutation = {
  __typename?: "Mutation";
  createCourse: Course;
  updateCourse: Course;
  deleteCourse: Scalars["Boolean"];
  createComment: Comment;
  updateComment: Comment;
  deleteComment: IdeleteResponse;
  Register: RigesterResponse;
  UpdateUser: Ilama_Response;
  Login: RigesterResponse;
  createClass: ClassRoom;
  updateClass: ClassRoom;
  joinClass: ClassRoom;
  deleteClass: IdeleteResponse;
};

export type MutationCreateCourseArgs = {
  data: CourseInput;
};

export type MutationUpdateCourseArgs = {
  data: CourseUpdateInput;
};

export type MutationDeleteCourseArgs = {
  id: Scalars["String"];
};

export type MutationCreateCommentArgs = {
  data: CommentInput;
};

export type MutationUpdateCommentArgs = {
  data: CommentUpdateInput;
};

export type MutationDeleteCommentArgs = {
  id: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: UserInput;
};

export type MutationUpdateUserArgs = {
  email: Scalars["String"];
  name: Scalars["String"];
};

export type MutationLoginArgs = {
  data: UserLoginInput;
};

export type MutationCreateClassArgs = {
  data: ClassRoomInput;
};

export type MutationUpdateClassArgs = {
  data: ClassRoomUpdateInput;
};

export type MutationJoinClassArgs = {
  memberId: Scalars["String"];
  invite: Scalars["String"];
  data: ClassRoomUpdateInput;
};

export type MutationDeleteClassArgs = {
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getCourses: Array<Course>;
  getOneCourse: Course;
  getComments: Array<Comment>;
  getChildComments: Array<Comment>;
  getOneComment: Comment;
  getUser?: Maybe<User>;
  getMyClasses: Array<ClassRoom>;
  isJoined: Scalars["Boolean"];
  getClasses: Array<ClassRoom>;
  getOneClassRoom: ClassRoom;
  getFilteredClass: ClassRoom;
};

export type QueryGetOneCourseArgs = {
  id: Scalars["String"];
};

export type QueryGetCommentsArgs = {
  course: Scalars["String"];
  step: Scalars["String"];
};

export type QueryGetChildCommentsArgs = {
  id: Scalars["String"];
};

export type QueryGetOneCommentArgs = {
  id: Scalars["String"];
};

export type QueryIsJoinedArgs = {
  id: Scalars["String"];
};

export type QueryGetOneClassRoomArgs = {
  id: Scalars["String"];
};

export type QueryGetFilteredClassArgs = {
  invite: Scalars["String"];
};

export type RigesterResponse = {
  __typename?: "RigesterResponse";
  accessToken: Scalars["String"];
  Ok: Scalars["Boolean"];
  message: Scalars["String"];
};

export type Steps = {
  __typename?: "Steps";
  title: Scalars["String"];
  next?: Maybe<Scalars["Float"]>;
  step: Scalars["Float"];
  prev?: Maybe<Scalars["Float"]>;
  contentMd: Scalars["String"];
  contentHtml: Scalars["String"];
};

export type StepsInput = {
  title: Scalars["String"];
  next?: Maybe<Scalars["Float"]>;
  step: Scalars["Float"];
  prev?: Maybe<Scalars["Float"]>;
  contentMd: Scalars["String"];
  contentHtml: Scalars["String"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UserInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UserLoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = { __typename?: "Query" } & {
  getUser?: Maybe<{ __typename?: "User" } & Pick<User, "name" | "email">>;
};

export type GetCoursesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCoursesQuery = { __typename?: "Query" } & {
  getCourses: Array<
    { __typename?: "Course" } & Pick<
      Course,
      "title" | "createdAt" | "updatedAt" | "rating" | "localRate"
    > & {
        steps: Array<
          { __typename?: "Steps" } & Pick<
            Steps,
            "title" | "next" | "step" | "prev" | "contentMd" | "contentHtml"
          >
        >;
        classRoom: { __typename?: "ClassRoom" } & Pick<ClassRoom, "name">;
      }
  >;
};

export type GetOneCourseQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetOneCourseQuery = { __typename?: "Query" } & {
  getOneCourse: { __typename?: "Course" } & Pick<
    Course,
    "title" | "createdAt" | "updatedAt" | "rating" | "localRate"
  > & {
      steps: Array<
        { __typename?: "Steps" } & Pick<
          Steps,
          "title" | "next" | "step" | "prev" | "contentMd" | "contentHtml"
        >
      >;
      classRoom: { __typename?: "ClassRoom" } & Pick<ClassRoom, "name">;
    };
};

export type CreateCourseMutationVariables = Exact<{
  data: CourseInput;
}>;

export type CreateCourseMutation = { __typename?: "Mutation" } & {
  createCourse: { __typename?: "Course" } & Pick<
    Course,
    "title" | "createdAt" | "updatedAt" | "rating" | "localRate"
  > & {
      steps: Array<{ __typename?: "Steps" } & Pick<Steps, "title" | "step">>;
    };
};

export type UpdateCourseMutationVariables = Exact<{
  data: CourseUpdateInput;
}>;

export type UpdateCourseMutation = { __typename?: "Mutation" } & {
  updateCourse: { __typename?: "Course" } & Pick<
    Course,
    "title" | "createdAt" | "updatedAt" | "rating" | "localRate"
  > & {
      steps: Array<{ __typename?: "Steps" } & Pick<Steps, "title" | "step">>;
    };
};

export type RegisterMutationVariables = Exact<{
  data: UserInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  Register: { __typename?: "RigesterResponse" } & Pick<
    RigesterResponse,
    "accessToken" | "Ok" | "message"
  >;
};

export type LoginMutationVariables = Exact<{
  data: UserLoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  Login: { __typename?: "RigesterResponse" } & Pick<
    RigesterResponse,
    "accessToken" | "Ok" | "message"
  >;
};

export type CreateClassMutationVariables = Exact<{
  data: ClassRoomInput;
}>;

export type CreateClassMutation = { __typename?: "Mutation" } & {
  createClass: { __typename?: "ClassRoom" } & Pick<
    ClassRoom,
    "_id" | "inviteSecret" | "name" | "state"
  >;
};

export type UpdateClassMutationVariables = Exact<{
  data: ClassRoomUpdateInput;
}>;

export type UpdateClassMutation = { __typename?: "Mutation" } & {
  updateClass: { __typename?: "ClassRoom" } & Pick<
    ClassRoom,
    "_id" | "name" | "state"
  >;
};

export type GetFilteredClassQueryVariables = Exact<{
  invite: Scalars["String"];
}>;

export type GetFilteredClassQuery = { __typename?: "Query" } & {
  getFilteredClass: { __typename?: "ClassRoom" } & Pick<
    ClassRoom,
    | "_id"
    | "name"
    | "rate"
    | "state"
    | "createdAt"
    | "updatedAt"
    | "tags"
    | "image"
    | "desc"
  > & {
      owner: { __typename?: "User" } & Pick<User, "_id">;
      course: Array<
        { __typename?: "Course" } & Pick<
          Course,
          "_id" | "title" | "updatedAt" | "rating"
        > & {
            steps: Array<
              { __typename?: "Steps" } & Pick<Steps, "title" | "step">
            >;
          }
      >;
      members: Array<{ __typename?: "User" } & Pick<User, "_id">>;
    };
};

export type GetClassesQueryVariables = Exact<{ [key: string]: never }>;

export type GetClassesQuery = { __typename?: "Query" } & {
  getClasses: Array<
    { __typename?: "ClassRoom" } & Pick<
      ClassRoom,
      | "_id"
      | "name"
      | "inviteSecret"
      | "inviteSecretTmp"
      | "rate"
      | "state"
      | "createdAt"
      | "updatedAt"
      | "tags"
      | "image"
      | "desc"
    > & {
        owner: { __typename?: "User" } & Pick<User, "_id" | "name">;
        course: Array<
          { __typename?: "Course" } & Pick<
            Course,
            "_id" | "title" | "updatedAt" | "rating"
          >
        >;
        members: Array<{ __typename?: "User" } & Pick<User, "_id">>;
      }
  >;
};

export type GetOneClassRoomQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetOneClassRoomQuery = { __typename?: "Query" } & {
  getOneClassRoom: { __typename?: "ClassRoom" } & Pick<
    ClassRoom,
    "_id" | "name" | "tags" | "image" | "desc" | "state"
  > & {
      course: Array<
        { __typename?: "Course" } & Pick<
          Course,
          "_id" | "title" | "rating" | "updatedAt" | "createdAt"
        > & {
            steps: Array<
              { __typename?: "Steps" } & Pick<Steps, "title" | "step">
            >;
          }
      >;
    };
};

export type DeleteClassMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteClassMutation = { __typename?: "Mutation" } & {
  deleteClass: { __typename?: "IdeleteResponse" } & Pick<
    IdeleteResponse,
    "ok" | "n" | "deletedCount"
  >;
};

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteCourseMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteCourse"
>;

export type GetCommentsQueryVariables = Exact<{
  course: Scalars["String"];
  step: Scalars["String"];
}>;

export type GetCommentsQuery = { __typename?: "Query" } & {
  getComments: Array<
    { __typename?: "Comment" } & Pick<
      Comment,
      | "content"
      | "_id"
      | "parent"
      | "course"
      | "classRoom"
      | "step"
      | "updatedAt"
      | "createdAt"
    > & { commenter: { __typename?: "User" } & Pick<User, "_id" | "name"> }
  >;
};

export type GetChildCommentsQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetChildCommentsQuery = { __typename?: "Query" } & {
  getChildComments: Array<
    { __typename?: "Comment" } & Pick<
      Comment,
      | "content"
      | "_id"
      | "parent"
      | "course"
      | "classRoom"
      | "step"
      | "updatedAt"
      | "createdAt"
    > & { commenter: { __typename?: "User" } & Pick<User, "_id" | "name"> }
  >;
};

export type CreateCommentMutationVariables = Exact<{
  data: CommentInput;
}>;

export type CreateCommentMutation = { __typename?: "Mutation" } & {
  createComment: { __typename?: "Comment" } & Pick<
    Comment,
    "content" | "_id" | "parent" | "course" | "step" | "updatedAt" | "createdAt"
  > & { commenter: { __typename?: "User" } & Pick<User, "_id" | "name"> };
};

export type GetOneCommentQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetOneCommentQuery = { __typename?: "Query" } & {
  getOneComment: { __typename?: "Comment" } & Pick<
    Comment,
    | "content"
    | "_id"
    | "parent"
    | "course"
    | "classRoom"
    | "step"
    | "updatedAt"
    | "createdAt"
  > & { commenter: { __typename?: "User" } & Pick<User, "_id" | "name"> };
};

export type IsJoinedQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type IsJoinedQuery = { __typename?: "Query" } & Pick<Query, "isJoined">;

export const GetUserDocument = gql`
  query getUser {
    getUser {
      name
      email
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const GetCoursesDocument = gql`
  query getCourses {
    getCourses {
      title
      steps {
        title
        next
        step
        prev
        contentMd
        contentHtml
      }
      classRoom {
        name
      }
      createdAt
      updatedAt
      rating
      localRate
    }
  }
`;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCoursesQuery,
    GetCoursesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(
    GetCoursesDocument,
    options
  );
}
export function useGetCoursesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCoursesQuery,
    GetCoursesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(
    GetCoursesDocument,
    options
  );
}
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<
  typeof useGetCoursesLazyQuery
>;
export type GetCoursesQueryResult = Apollo.QueryResult<
  GetCoursesQuery,
  GetCoursesQueryVariables
>;
export const GetOneCourseDocument = gql`
  query getOneCourse($id: String!) {
    getOneCourse(id: $id) {
      title
      steps {
        title
        next
        step
        prev
        contentMd
        contentHtml
      }
      classRoom {
        name
      }
      createdAt
      updatedAt
      rating
      localRate
    }
  }
`;

/**
 * __useGetOneCourseQuery__
 *
 * To run a query within a React component, call `useGetOneCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneCourseQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOneCourseQuery,
    GetOneCourseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOneCourseQuery, GetOneCourseQueryVariables>(
    GetOneCourseDocument,
    options
  );
}
export function useGetOneCourseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOneCourseQuery,
    GetOneCourseQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOneCourseQuery, GetOneCourseQueryVariables>(
    GetOneCourseDocument,
    options
  );
}
export type GetOneCourseQueryHookResult = ReturnType<
  typeof useGetOneCourseQuery
>;
export type GetOneCourseLazyQueryHookResult = ReturnType<
  typeof useGetOneCourseLazyQuery
>;
export type GetOneCourseQueryResult = Apollo.QueryResult<
  GetOneCourseQuery,
  GetOneCourseQueryVariables
>;
export const CreateCourseDocument = gql`
  mutation createCourse($data: CourseInput!) {
    createCourse(data: $data) {
      title
      steps {
        title
        step
      }
      createdAt
      updatedAt
      rating
      localRate
    }
  }
`;
export type CreateCourseMutationFn = Apollo.MutationFunction<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >(CreateCourseDocument, options);
}
export type CreateCourseMutationHookResult = ReturnType<
  typeof useCreateCourseMutation
>;
export type CreateCourseMutationResult =
  Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<
  CreateCourseMutation,
  CreateCourseMutationVariables
>;
export const UpdateCourseDocument = gql`
  mutation updateCourse($data: CourseUpdateInput!) {
    updateCourse(data: $data) {
      title
      steps {
        title
        step
      }
      createdAt
      updatedAt
      rating
      localRate
    }
  }
`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<
  UpdateCourseMutation,
  UpdateCourseMutationVariables
>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCourseMutation,
    UpdateCourseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCourseMutation,
    UpdateCourseMutationVariables
  >(UpdateCourseDocument, options);
}
export type UpdateCourseMutationHookResult = ReturnType<
  typeof useUpdateCourseMutation
>;
export type UpdateCourseMutationResult =
  Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<
  UpdateCourseMutation,
  UpdateCourseMutationVariables
>;
export const RegisterDocument = gql`
  mutation register($data: UserInput!) {
    Register(data: $data) {
      accessToken
      Ok
      message
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation login($data: UserLoginInput!) {
    Login(data: $data) {
      accessToken
      Ok
      message
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const CreateClassDocument = gql`
  mutation createClass($data: ClassRoomInput!) {
    createClass(data: $data) {
      _id
      inviteSecret
      name
      state
    }
  }
`;
export type CreateClassMutationFn = Apollo.MutationFunction<
  CreateClassMutation,
  CreateClassMutationVariables
>;

/**
 * __useCreateClassMutation__
 *
 * To run a mutation, you first call `useCreateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClassMutation, { data, loading, error }] = useCreateClassMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateClassMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateClassMutation,
    CreateClassMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateClassMutation, CreateClassMutationVariables>(
    CreateClassDocument,
    options
  );
}
export type CreateClassMutationHookResult = ReturnType<
  typeof useCreateClassMutation
>;
export type CreateClassMutationResult =
  Apollo.MutationResult<CreateClassMutation>;
export type CreateClassMutationOptions = Apollo.BaseMutationOptions<
  CreateClassMutation,
  CreateClassMutationVariables
>;
export const UpdateClassDocument = gql`
  mutation updateClass($data: ClassRoomUpdateInput!) {
    updateClass(data: $data) {
      _id
      name
      state
    }
  }
`;
export type UpdateClassMutationFn = Apollo.MutationFunction<
  UpdateClassMutation,
  UpdateClassMutationVariables
>;

/**
 * __useUpdateClassMutation__
 *
 * To run a mutation, you first call `useUpdateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClassMutation, { data, loading, error }] = useUpdateClassMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateClassMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClassMutation,
    UpdateClassMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateClassMutation, UpdateClassMutationVariables>(
    UpdateClassDocument,
    options
  );
}
export type UpdateClassMutationHookResult = ReturnType<
  typeof useUpdateClassMutation
>;
export type UpdateClassMutationResult =
  Apollo.MutationResult<UpdateClassMutation>;
export type UpdateClassMutationOptions = Apollo.BaseMutationOptions<
  UpdateClassMutation,
  UpdateClassMutationVariables
>;
export const GetFilteredClassDocument = gql`
  query getFilteredClass($invite: String!) {
    getFilteredClass(invite: $invite) {
      _id
      name
      owner {
        _id
      }
      rate
      state
      course {
        _id
        title
        steps {
          title
          step
        }
        updatedAt
        rating
      }
      members {
        _id
      }
      createdAt
      updatedAt
      tags
      image
      desc
    }
  }
`;

/**
 * __useGetFilteredClassQuery__
 *
 * To run a query within a React component, call `useGetFilteredClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredClassQuery({
 *   variables: {
 *      invite: // value for 'invite'
 *   },
 * });
 */
export function useGetFilteredClassQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFilteredClassQuery,
    GetFilteredClassQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFilteredClassQuery, GetFilteredClassQueryVariables>(
    GetFilteredClassDocument,
    options
  );
}
export function useGetFilteredClassLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFilteredClassQuery,
    GetFilteredClassQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFilteredClassQuery,
    GetFilteredClassQueryVariables
  >(GetFilteredClassDocument, options);
}
export type GetFilteredClassQueryHookResult = ReturnType<
  typeof useGetFilteredClassQuery
>;
export type GetFilteredClassLazyQueryHookResult = ReturnType<
  typeof useGetFilteredClassLazyQuery
>;
export type GetFilteredClassQueryResult = Apollo.QueryResult<
  GetFilteredClassQuery,
  GetFilteredClassQueryVariables
>;
export const GetClassesDocument = gql`
  query getClasses {
    getClasses {
      _id
      name
      inviteSecret
      inviteSecretTmp
      owner {
        _id
        name
      }
      rate
      state
      course {
        _id
        title
        updatedAt
        rating
      }
      members {
        _id
      }
      createdAt
      updatedAt
      tags
      image
      desc
    }
  }
`;

/**
 * __useGetClassesQuery__
 *
 * To run a query within a React component, call `useGetClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClassesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetClassesQuery,
    GetClassesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClassesQuery, GetClassesQueryVariables>(
    GetClassesDocument,
    options
  );
}
export function useGetClassesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClassesQuery,
    GetClassesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClassesQuery, GetClassesQueryVariables>(
    GetClassesDocument,
    options
  );
}
export type GetClassesQueryHookResult = ReturnType<typeof useGetClassesQuery>;
export type GetClassesLazyQueryHookResult = ReturnType<
  typeof useGetClassesLazyQuery
>;
export type GetClassesQueryResult = Apollo.QueryResult<
  GetClassesQuery,
  GetClassesQueryVariables
>;
export const GetOneClassRoomDocument = gql`
  query getOneClassRoom($id: String!) {
    getOneClassRoom(id: $id) {
      _id
      name
      tags
      image
      desc
      state
      course {
        _id
        title
        rating
        steps {
          title
          step
        }
        updatedAt
        createdAt
      }
    }
  }
`;

/**
 * __useGetOneClassRoomQuery__
 *
 * To run a query within a React component, call `useGetOneClassRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneClassRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneClassRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneClassRoomQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOneClassRoomQuery,
    GetOneClassRoomQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOneClassRoomQuery, GetOneClassRoomQueryVariables>(
    GetOneClassRoomDocument,
    options
  );
}
export function useGetOneClassRoomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOneClassRoomQuery,
    GetOneClassRoomQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOneClassRoomQuery,
    GetOneClassRoomQueryVariables
  >(GetOneClassRoomDocument, options);
}
export type GetOneClassRoomQueryHookResult = ReturnType<
  typeof useGetOneClassRoomQuery
>;
export type GetOneClassRoomLazyQueryHookResult = ReturnType<
  typeof useGetOneClassRoomLazyQuery
>;
export type GetOneClassRoomQueryResult = Apollo.QueryResult<
  GetOneClassRoomQuery,
  GetOneClassRoomQueryVariables
>;
export const DeleteClassDocument = gql`
  mutation deleteClass($id: String!) {
    deleteClass(id: $id) {
      ok
      n
      deletedCount
    }
  }
`;
export type DeleteClassMutationFn = Apollo.MutationFunction<
  DeleteClassMutation,
  DeleteClassMutationVariables
>;

/**
 * __useDeleteClassMutation__
 *
 * To run a mutation, you first call `useDeleteClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClassMutation, { data, loading, error }] = useDeleteClassMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClassMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteClassMutation,
    DeleteClassMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteClassMutation, DeleteClassMutationVariables>(
    DeleteClassDocument,
    options
  );
}
export type DeleteClassMutationHookResult = ReturnType<
  typeof useDeleteClassMutation
>;
export type DeleteClassMutationResult =
  Apollo.MutationResult<DeleteClassMutation>;
export type DeleteClassMutationOptions = Apollo.BaseMutationOptions<
  DeleteClassMutation,
  DeleteClassMutationVariables
>;
export const DeleteCourseDocument = gql`
  mutation deleteCourse($id: String!) {
    deleteCourse(id: $id)
  }
`;
export type DeleteCourseMutationFn = Apollo.MutationFunction<
  DeleteCourseMutation,
  DeleteCourseMutationVariables
>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCourseMutation,
    DeleteCourseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCourseMutation,
    DeleteCourseMutationVariables
  >(DeleteCourseDocument, options);
}
export type DeleteCourseMutationHookResult = ReturnType<
  typeof useDeleteCourseMutation
>;
export type DeleteCourseMutationResult =
  Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<
  DeleteCourseMutation,
  DeleteCourseMutationVariables
>;
export const GetCommentsDocument = gql`
  query getComments($course: String!, $step: String!) {
    getComments(course: $course, step: $step) {
      content
      _id
      parent
      commenter {
        _id
        name
      }
      course
      classRoom
      step
      updatedAt
      createdAt
    }
  }
`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      course: // value for 'course'
 *      step: // value for 'step'
 *   },
 * });
 */
export function useGetCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options
  );
}
export function useGetCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options
  );
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<
  typeof useGetCommentsLazyQuery
>;
export type GetCommentsQueryResult = Apollo.QueryResult<
  GetCommentsQuery,
  GetCommentsQueryVariables
>;
export const GetChildCommentsDocument = gql`
  query getChildComments($id: String!) {
    getChildComments(id: $id) {
      content
      _id
      parent
      commenter {
        _id
        name
      }
      course
      classRoom
      step
      updatedAt
      createdAt
    }
  }
`;

/**
 * __useGetChildCommentsQuery__
 *
 * To run a query within a React component, call `useGetChildCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChildCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChildCommentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChildCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetChildCommentsQuery,
    GetChildCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChildCommentsQuery, GetChildCommentsQueryVariables>(
    GetChildCommentsDocument,
    options
  );
}
export function useGetChildCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetChildCommentsQuery,
    GetChildCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetChildCommentsQuery,
    GetChildCommentsQueryVariables
  >(GetChildCommentsDocument, options);
}
export type GetChildCommentsQueryHookResult = ReturnType<
  typeof useGetChildCommentsQuery
>;
export type GetChildCommentsLazyQueryHookResult = ReturnType<
  typeof useGetChildCommentsLazyQuery
>;
export type GetChildCommentsQueryResult = Apollo.QueryResult<
  GetChildCommentsQuery,
  GetChildCommentsQueryVariables
>;
export const CreateCommentDocument = gql`
  mutation createComment($data: CommentInput!) {
    createComment(data: $data) {
      content
      _id
      parent
      commenter {
        _id
        name
      }
      course
      step
      updatedAt
      createdAt
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const GetOneCommentDocument = gql`
  query getOneComment($id: String!) {
    getOneComment(id: $id) {
      content
      _id
      parent
      commenter {
        _id
        name
      }
      course
      classRoom
      step
      updatedAt
      createdAt
    }
  }
`;

/**
 * __useGetOneCommentQuery__
 *
 * To run a query within a React component, call `useGetOneCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCommentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneCommentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOneCommentQuery,
    GetOneCommentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOneCommentQuery, GetOneCommentQueryVariables>(
    GetOneCommentDocument,
    options
  );
}
export function useGetOneCommentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOneCommentQuery,
    GetOneCommentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOneCommentQuery, GetOneCommentQueryVariables>(
    GetOneCommentDocument,
    options
  );
}
export type GetOneCommentQueryHookResult = ReturnType<
  typeof useGetOneCommentQuery
>;
export type GetOneCommentLazyQueryHookResult = ReturnType<
  typeof useGetOneCommentLazyQuery
>;
export type GetOneCommentQueryResult = Apollo.QueryResult<
  GetOneCommentQuery,
  GetOneCommentQueryVariables
>;
export const IsJoinedDocument = gql`
  query isJoined($id: String!) {
    isJoined(id: $id)
  }
`;

/**
 * __useIsJoinedQuery__
 *
 * To run a query within a React component, call `useIsJoinedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsJoinedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsJoinedQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIsJoinedQuery(
  baseOptions: Apollo.QueryHookOptions<IsJoinedQuery, IsJoinedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IsJoinedQuery, IsJoinedQueryVariables>(
    IsJoinedDocument,
    options
  );
}
export function useIsJoinedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsJoinedQuery,
    IsJoinedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IsJoinedQuery, IsJoinedQueryVariables>(
    IsJoinedDocument,
    options
  );
}
export type IsJoinedQueryHookResult = ReturnType<typeof useIsJoinedQuery>;
export type IsJoinedLazyQueryHookResult = ReturnType<
  typeof useIsJoinedLazyQuery
>;
export type IsJoinedQueryResult = Apollo.QueryResult<
  IsJoinedQuery,
  IsJoinedQueryVariables
>;
