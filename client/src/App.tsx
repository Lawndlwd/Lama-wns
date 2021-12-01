/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavMenu/NavBar";
import { Register } from "./views/Register";
import { getCurrentUser } from "./utils/auth";
import { UserContextProvider, UserState } from "./store/userContext";
import { ClassRoomContextProvider, IClassRoomState } from "./store/classRoom";

import { Login } from "./views/Login";
import { Landing } from "./views/Landing";
import { Dashboard } from "./views/Dashboard";
import { ClassRoom } from "./views/ClassRoom";
import { Course } from "./views/Course";
import { CreateCourse } from "./views/CreateCourse";
import { CreateClassRoom } from "./views/CreateClassRoom";
import { useGetClassesQuery } from "./graphql/generated/graphql";
import { CourseContextProvider, ICourseState } from "./store/course";
import { PrivateRoute } from "./components/ProtectedRoute";
import { JoinClass } from "./views/JoinClass";
import { UpdateClassRoom } from "./views/UpdateClass";

export type ClassParams = {
  id: string;
};
function App(): JSX.Element {
  const [user, userSet] = useState<UserState | null>(null);

  const updateUser = (_user: UserState | null) => userSet(_user);
  useEffect(() => {
    const userLocal = getCurrentUser();
    if (!user && userLocal) {
      userSet(userLocal);
    }
  }, [user]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [classRooms, classRoomsSet] = useState<Array<IClassRoomState> | []>([]);
  const updateClassRooms = (_classRoom: Array<IClassRoomState> | []) =>
    classRoomsSet(_classRoom);
  const { data } = useGetClassesQuery();
  useEffect(() => {
    if (data && data.getClasses) {
      updateClassRooms(data.getClasses);
    }
  }, [data]);

  const [courses, coursesSet] = React.useState<ICourseState | null>(null);
  const updateCourses = (_course: ICourseState | null) => coursesSet(_course);

  return (
    <UserContextProvider value={{ user, updateUser }}>
      <ClassRoomContextProvider value={{ classRooms, updateClassRooms }}>
        <Router>
          <div className="App relative">
            <NavBar />

            <section>
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => {
                    return user ? (
                      <Redirect to="/dashboard" />
                    ) : (
                      <Redirect to="/landing" />
                    );
                  }}
                />
                <Route path="/login" exact component={Login} />
                <Route path="/landing" exact component={Landing} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute
                  isAuthenticated={!!user}
                  path="/dashboard"
                  exact
                  component={Dashboard}
                />

                <CourseContextProvider value={{ courses, updateCourses }}>
                  <PrivateRoute
                    isAuthenticated={!!user}
                    path="/join-class/:id"
                    exact
                    component={JoinClass}
                  />
                  <PrivateRoute
                    isAuthenticated={!!user}
                    path="/class-room/:id"
                    exact
                    component={ClassRoom}
                  />
                  <PrivateRoute
                    isAuthenticated={!!user}
                    path="/class-room/:id/create-course"
                    exact
                    component={CreateCourse}
                  />

                  <PrivateRoute
                    isAuthenticated={!!user}
                    path="/class-room/:id/update-course"
                    exact
                    component={UpdateClassRoom}
                  />
                  <PrivateRoute
                    isAuthenticated={!!user}
                    path="/class-room/:class_id/course/:course_id/:step"
                    exact
                    component={Course}
                  />
                  <PrivateRoute
                    isAuthenticated={!!user}
                    path="/create-class-room"
                    exact
                    component={CreateClassRoom}
                  />
                </CourseContextProvider>
              </Switch>
            </section>
          </div>
        </Router>
        {/* <ul className="circles">
          <li>
            <span className=" text-9xl text-gray-600 opacity-10">
              &#10096;div&#10097;
            </span>
          </li>
          <li>
            <span className=" text-9xl text-gray-600 opacity-10">
              &#10100;&#10101;
            </span>
          </li>
          <li>
            <span className=" text-9xl text-gray-600 opacity-10">
              &#10090;&#10091;
            </span>
          </li>

          <li>
            <span className=" text-9xl text-gray-600 opacity-10">
              &#10096;li&#10097;
            </span>
          </li>
          <li>
            <span className=" text-9xl text-gray-600 opacity-10">
              &#10100;&#10101;
            </span>
          </li>
          <li>
            <span className=" text-9xl text-gray-600 opacity-10">
              &#10090;&#10091;
            </span>
          </li>

          <li className="bg-gray-900" />
          <li className="bg-blue-300" />
          <li className="border-purple-300" />
          <li />
        </ul> */}
      </ClassRoomContextProvider>
    </UserContextProvider>
  );
}

export default App;

// TODO
/**
 * add update & delete on class & course & comment
 * refacoring the code dont repeat your self
 * adding profile edit delete page(bio , photo ...etc)
 * notification on comment  to course owner or to parent comment
 * notification on join class
 * join class
 * add underscore if name is tow part
 * beter input on create course
 * better ui on notification
 * shared code room ?
 * add rating page at the end of course
 * Fix cant resolve Slate point done
 * Fix rerndring course page on open comments done
 * use tiptop done
 * code highlight problem done
 */
