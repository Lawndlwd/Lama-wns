/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useGetChildCommentsQuery } from "../graphql/generated/graphql";
import { timeDifference } from "../utils/date";

export const CommentChild = ({
  comment,
  fromChildToParentCallback,
}: {
  comment;
  fromChildToParentCallback;
}): JSX.Element => {
  const { data: childComment } = useGetChildCommentsQuery({
    variables: { id: comment._id },
  });
  return (
    <>
      <div className="mx-auto  w-full   " key={comment._id}>
        <div className="text-gray-900">
          <div className="flex">
            <div className="flex-shrink-0 mx-3">
              <div
                className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:leading-8  sm:h-8 bg-purple-700 text-center leading-6 uppercase"
                id="profileImage"
              >
                {comment.commenter.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1 rounded-lg px-1 py-2  leading-relaxed">
              <div className="flex justify-between items-center">
                <strong className="text-sm">{comment.commenter.name}</strong>{" "}
                <span className="text-xs text-gray-600">
                  {timeDifference(new Date(comment.createdAt).getTime())}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
              <h4
                className="my-3 uppercase tracking-wide text-gray-600 font-bold text-xs cursor-pointer"
                onClick={() => fromChildToParentCallback(comment)}
              >
                Replies
              </h4>

              {childComment?.getChildComments &&
                childComment?.getChildComments.map((child) => (
                  <div className="flex ml-4 mb-2" key={child._id}>
                    <div className="flex-shrink-0 mr-3">
                      <div
                        className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:leading-8  sm:h-8 bg-purple-700 text-center leading-6 uppercase"
                        id="profileImage"
                      >
                        {child.commenter.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-1 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <div className="flex justify-between items-center">
                        <strong className="text-sm">
                          {child.commenter.name}
                        </strong>{" "}
                        <span className="text-xs text-gray-600">
                          {timeDifference(new Date(child.createdAt).getTime())}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm">{child.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
