/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { ClassRoom, User, Course } from "../graphql/generated/graphql";

export type IClassRoomState = { __typename?: "ClassRoom" } & Pick<
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
    owner: { __typename?: "User" } & Pick<User, "_id" | "name">;
    course: Array<
      { __typename?: "Course" } & Pick<
        Course,
        "_id" | "title" | "updatedAt" | "rating"
      >
    >;
    members: Array<{ __typename?: "User" } & Pick<User, "_id">>;
  };
export const initialClassRoomState: Array<IClassRoomState> = [];
export interface IClassRoomContext {
  classRooms: Array<IClassRoomState>;
  updateClassRooms: (classRoom: Array<IClassRoomState> | []) => void;
}

const classRoomContext = createContext<IClassRoomContext>({
  classRooms: initialClassRoomState,
  updateClassRooms: (classRoom: Array<IClassRoomState> | []) => [],
});
export const ClassRoomContextConsumer = classRoomContext.Consumer;
export const ClassRoomContextProvider = classRoomContext.Provider;
export default classRoomContext;
