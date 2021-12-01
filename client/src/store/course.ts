/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import {
  ClassRoom,
  Course,
  GetOneClassRoomQuery,
  Steps,
} from "../graphql/generated/graphql";

export type ICourseState = GetOneClassRoomQuery;
export const initialCourseState: ICourseState | null = null;
export interface ICourseContext {
  courses: ICourseState | null;
  updateCourses: (course: ICourseState | null) => void;
}

const courseContext = createContext<ICourseContext>({
  courses: initialCourseState,
  updateCourses: (course: ICourseState | null) => null,
});
export const CourseContextConsumer = courseContext.Consumer;
export const CourseContextProvider = courseContext.Provider;
export default courseContext;
