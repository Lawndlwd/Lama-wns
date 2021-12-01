/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateCommentMutation } from "../graphql/generated/graphql";
import { CommentChild } from "./CommentChild";

type FormValues = {
  comment: string;
};
export const Comments = ({
  comments,
  course,
  step,
  classRoom,
  onChangeOpen,
}: {
  comments;
  course;
  step;
  classRoom;
  onChangeOpen;
}): JSX.Element => {
  const [parentComment, parentCommentSet] = React.useState<string | null>(null);
  const [textAreaComment, textAreaCommentSet] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });
  const [createComment] = useCreateCommentMutation({
    refetchQueries: ["getComments", "getChildComments"],
  });

  React.useEffect(() => {
    const commentsContianer = document.getElementById("comments");
    commentsContianer?.scrollTo(0, commentsContianer.scrollHeight);
  });

  const onSubmit = handleSubmit(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await createComment({
        variables: {
          data: {
            content: textAreaComment,
            course,
            step,
            parent: parentComment,
            classRoom,
          },
        },
      });
      // eslint-disable-next-line no-param-reassign
      parentCommentSet(null);
      textAreaCommentSet("");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });
  const receiveChildValue = (comment) => {
    parentCommentSet(comment._id);
    textAreaCommentSet(`To @${comment.commenter.name}`);
  };
  return (
    <>
      <div className="w-full content-start mx-auto z-20  fixed top-0 right-0 h-screen  ">
        <div className="flex  justify-between items-center ">
          <p className=" p-4 mr-3">Comments</p>
          <p
            onClick={onChangeOpen}
            className="cursor-pointer text-3xl p-4 mr-3"
          >
            X
          </p>
        </div>
        <div
          className=" overflow-y-scroll comments bg-gray-300   "
          id="comments"
          style={{ height: `calc(100% - 225px)` }}
        >
          {comments &&
            comments.map((comment) => {
              return (
                <CommentChild
                  key={comment._id}
                  comment={comment}
                  fromChildToParentCallback={receiveChildValue}
                />
              );
            })}
        </div>
        <form
          onSubmit={onSubmit}
          className="mx-auto   flex flex-col justify-end items-center bg-gray-800 shadow-md rounded px-3 py-4    "
        >
          <div className="w-full ">
            <textarea
              onChange={(evt) => textAreaCommentSet(evt.target.value)}
              value={textAreaComment}
              className="appearance-none block w-full bg-gray-700 text-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-xl   focus:bg-gray-900 "
              {...register}
              placeholder="Ask a question"
              name="comment"
            />
            {errors.comment ? (
              <p className="text-red-500 text-xs italic">
                {" "}
                {errors.comment.message}{" "}
              </p>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </form>
      </div>
    </>
  );
};
