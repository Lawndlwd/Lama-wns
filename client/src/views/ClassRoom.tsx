/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { Model } from "../components/Model";

import {
  useDeleteCourseMutation,
  useGetOneClassRoomQuery,
  useIsJoinedQuery,
} from "../graphql/generated/graphql";
import courseContext from "../store/course";
import { timeDifference } from "../utils/date";

export type ClassParams = {
  id: string;
};
export const ClassRoom = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ClassParams>();
  const [showMenu, showMenuSet] = React.useState<{ [key: string]: boolean }>(
    {}
  );
  const [showModel, showModelSet] = React.useState(false);
  const [toDelete, toDeleteSet] = React.useState("");

  const showMenuHandler = (id: string) => {
    if (showMenu[id]) {
      const { [id]: tmp, ...rest } = showMenu;
      showMenuSet(rest);
    } else {
      showMenu[id] = true;
      showMenuSet({ [id]: true, ...showMenu });
    }
  };
  const [deleteCourse] = useDeleteCourseMutation({
    refetchQueries: ["getOneClassRoom"],
  });
  const onDelete = async () => {
    showModelSet(!showModel);
    try {
      await deleteCourse({ variables: { id: toDelete } });
    } catch (error) {
      console.log(error);
    }
  };
  const { courses, updateCourses } = useContext(courseContext);
  const { data: isJoinedData } = useIsJoinedQuery({
    variables: { id },
  });

  const { data } = useGetOneClassRoomQuery({
    variables: { id },
  });

  React.useEffect(() => {
    if (data && data.getOneClassRoom) {
      updateCourses(data);
    }
  }, [data, updateCourses, id]);
  return (
    <>
      {isJoinedData && !isJoinedData.isJoined && (
        <Redirect to={{ pathname: `/join-class/${id}` }} />
      )}
      <div className="w-11/12 mx-auto  gap-6  mt-6 flex flex-col md:flex-row justify-center md:items-start items-center ">
        <div className=" w-9/12 md:w-4/12 lg:w-3/12">
          <Link
            to={`/class-room/${id}/create-course`}
            key={Date.now() + Math.random() * 100}
            className="btn btn-primary"
          >
            <span>Create new course</span>
          </Link>
        </div>
        <div className=" grid  md:grid-cols-2  lg:grid-cols-3  grid-cols-1 w-9/12 mx-auto gap-4  justify-center items-center">
          {courses?.getOneClassRoom.course.map((c) => (
            <div
              className="bg-gray-800 p-6 hover:scale-x-125 col-span-1 rounded-lg shadow-lg cursor-pointer"
              key={c._id}
              onClick={() =>
                history.push(`/class-room/${id}/course/${c._id}/1`)
              }
            >
              <div className="flex items-baseline justify-between">
                <span className=" bg-purple-50 text-purple-700   text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                  New
                </span>

                <div
                  className="float-right  test inline relative cursor-pointer px-5 py-2  z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    showMenuHandler(c._id);
                  }}
                >
                  {showMenu[c._id] ? (
                    <div className="absolute right-1 top-4 mt-2 w-48 bg-gray-700 rounded-md overflow-hidden shadow-xl z-20">
                      <div
                        onClick={() => {
                          showModelSet(!showModel);
                          toDeleteSet(c._id);
                        }}
                        className="px-4 py-2 text-sm text-gray-200 border-b border-gray-700 hover:bg-gray-800 flex gap-4 items-center"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#108497"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" />
                        </svg>
                        <span className="text-md">Delete</span>
                      </div>
                      {/* <div
                        onClick={() =>
                          history.push(
                            `/class-room/${id}/update-course/${c._id}`
                          )
                        }
                        className=" px-4 py-2 text-sm text-gray-200 border-b border-gray-700 hover:bg-gray-800   gap-4  flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#108497"
                        >
                          <path d="M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z" />
                        </svg>

                        <span className="text-md">Edit</span>
                      </div> */}
                    </div>
                  ) : null}
                </div>
              </div>

              <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                {c.title}
              </h4>

              <div className="mt-1">
                {c.steps.length}
                <span className="text-gray-200 text-sm">
                  {" "}
                  {c.steps.length > 1 ? "parts" : "part"}
                </span>
              </div>
              <div className=" text-gray-200 text-xs  mt-4 font-semibold tracking-wider">
                {timeDifference(new Date(c.updatedAt).getTime())}
              </div>
            </div>
          ))}
        </div>
        {showModel && (
          <Model
            slot={
              <>
                <h2 className="text-lg text-warning">Warning!</h2>
                <p>Are you sure?</p>
                <div className="modal-action">
                  <label
                    htmlFor="my-modal-2"
                    className="btn btn-primary"
                    onClick={onDelete}
                  >
                    Confirm
                  </label>
                  <label
                    htmlFor="my-modal-2"
                    className="btn"
                    onClick={() => showModelSet(!showModel)}
                  >
                    Dismiss
                  </label>
                </div>
              </>
            }
            checked={showModel}
          />
        )}
      </div>
    </>
  );
};
