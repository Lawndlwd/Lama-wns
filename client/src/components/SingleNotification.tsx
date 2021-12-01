/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useHistory } from "react-router-dom";
import { useGetOneCommentQuery } from "../graphql/generated/graphql";

export const SingleNotification = ({
  notification,
}: {
  notification;
}): JSX.Element => {
  const history = useHistory();
  const { data: comments } = useGetOneCommentQuery({
    variables: {
      id: notification._id,
    },
  });
  return (
    <>
      <div
        className="flex max-w-md  rounded-lg overflow-hidden mb-1 hover:bg-gray-800  cursor-pointer  "
        onClick={() =>
          history.push(
            `/class-room/${notification.classRoom}/course/${notification.course}/${notification.step}`
          )
        }
      >
        <div className="flex items-center px-2 py-3">
          <div
            className="  rounded-full w-6 h-6 sm:w-8 sm:leading-8  sm:h-8 bg-purple-700 text-center leading-6 uppercase"
            id="profileImage"
          >
            {comments?.getOneComment.commenter.name.charAt(0)}
          </div>
          <div className="mx-3">
            <p className="text-gray-200">
              <strong>{comments?.getOneComment.commenter.name}</strong> was
              replied on a comment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
