/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetOneCourseQuery,
  useGetCommentsQuery,
} from "../graphql/generated/graphql";
import { Steps } from "../components/stepper";
import { Comments } from "../components/Comments";
import Tiptap from "../components/Tiptap";

type ClassParams = {
  course_id: string;
  step: string;
  class_id: string;
};
type TypeProps = {
  open: boolean;
};
export const Course = (): JSX.Element => {
  const history = useHistory();
  const { course_id, step, class_id } = useParams<ClassParams>();
  const [open, setOpen] = React.useState(false);

  const { loading, error, data } = useGetOneCourseQuery({
    variables: { id: course_id },
  });

  const { data: comments } = useGetCommentsQuery({
    variables: {
      step,
      course: course_id,
    },
  });

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  const currentstep = data.getOneCourse.steps.find(
    (obj) => obj.step.toString() === step
  );
  const next = currentstep?.next
    ? data.getOneCourse.steps.find((obj) => obj.step === currentstep.next)
    : null;
  const prev = currentstep?.prev
    ? data.getOneCourse.steps.find((obj) => obj.step === currentstep.prev)
    : null;

  return (
    <>
      <div className="flex min-h-full gap-4  flex-col mt-6 ">
        <MenuContent
          className="bg-gray-800  fixed flex flex-col items-center  pt-10  w-4/12"
          open={open}
        >
          <Comments
            onChangeOpen={() => setOpen(!open)}
            comments={comments?.getComments}
            course={course_id}
            step={step}
            classRoom={class_id}
          />
        </MenuContent>

        <div className="  w-11/12 mx-auto ">
          <div className="flex flex-col justify-center items-center w-full">
            <div className=" py-3 px-5 rounded-3xl w-10/12">
              {currentstep && (
                <div id="markdown" className="mb-52 ">
                  <Tiptap
                    editable={false}
                    content={JSON.parse(currentstep.contentMd)}
                    onChange={(sdsd) => console.log(sdsd)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Steps
        commentCont={comments?.getComments.length}
        onChangeOpen={() => setOpen(!open)}
        stepNumberNext={next?.step.toString()}
        stepTitleNext={next?.title}
        stepTitlePrev={prev?.title}
        currentStep={currentstep?.step ? currentstep?.step.toString() : "1"}
        stepsCount={data.getOneCourse.steps.length.toString()}
        onDone={`/class-room/${class_id}`}
        onRestart={`/class-room/${class_id}/course/${course_id}/${1}`}
        onPrevClick={() => {
          prev?.step
            ? history.push(
                `/class-room/${class_id}/course/${course_id}/${prev?.step}`
              )
            : undefined;
          window.scrollTo(0, 0);
        }}
        onNextClick={() => {
          next?.step &&
            history.push(
              `/class-room/${class_id}/course/${course_id}/${next?.step}`
            );
          window.scrollTo(0, 0);
        }}
      />
    </>
  );
};
const MenuContent = styled.div<TypeProps>`
  inset: 0;
  transition: transform 0.7s ease;
  transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(-150%)")};
  z-index: 1000;
`;
