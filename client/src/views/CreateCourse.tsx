/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Tiptap from "../components/Tiptap";
import { useCreateCourseMutation } from "../graphql/generated/graphql";

type ClassParams = {
  id: string;
  stepId: string;
};
export type ICourse = {
  contentMd: string;
  step: number;
  title: string;
  next: number | null;
  prev: number | null;
  contentHtml: string;
};
export const CreateCourse = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<ClassParams>();

  const initialValue = (stepId) =>
    localStorage.getItem(`content-${stepId}`) ||
    JSON.stringify({
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            textAlign: "left",
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "What's the title ?",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
      ],
    });
  const initialSteps =
    localStorage.getItem(`steps`) ||
    JSON.stringify([
      {
        contentMd: initialValue(1),
        step: 1,
        title: "",
        next: null,
        prev: null,
        contentHtml: "",
      },
    ]);
  const [steps, setSteps] = useState<Array<ICourse>>(JSON.parse(initialSteps));
  const [title, setTitle] = useState("");

  const onAddStep = () => {
    const stepsCopy = [...steps];
    stepsCopy.forEach((step) => {
      step.next = step.step + 1;
    });
    setSteps([
      ...steps,
      {
        contentMd: initialValue(steps.length + 1),
        step: steps.length + 1,
        title: "",
        next: null,
        prev: steps.length,
        contentHtml: "",
      },
    ]);
  };

  const onRemoveStep = (i: number) => {
    console.log(i);
    const stepsCopy = [...steps];
    const deleted = stepsCopy.splice(i, 1);
    console.log(deleted, stepsCopy);
    localStorage.setItem(`steps`, JSON.stringify(stepsCopy));
    setSteps(stepsCopy);
  };

  const onChangeStepsTitle = (i) => (e: React.FormEvent<HTMLInputElement>) => {
    const stepsCopy = [...steps];
    stepsCopy[i].title = e.currentTarget.value;
    setSteps(stepsCopy);
  };
  const onChangeStepsContent = (i) => (data: Array<any>) => {
    const stepsCopy = [...steps];
    const content = JSON.stringify(data);
    stepsCopy[i].contentMd = content;
    setSteps(stepsCopy);
  };

  const { handleSubmit } = useForm({ mode: "onTouched" });

  const [createCourse] = useCreateCourseMutation({
    refetchQueries: ["getOneClassRoom"],
  });

  const onSubmit = handleSubmit(async () => {
    try {
      await createCourse({
        variables: {
          data: {
            steps,
            classRoom: id,
            title,
          },
        },
      });
      localStorage.removeItem(`steps`);
      history.push(`/class-room/${id}`);
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <div className="w-9/12 mx-auto">
        <form onSubmit={onSubmit} className=" flex flex-col  pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-3 ">
            <div className="w-1/4 ">
              <div className="form-control">
                <input
                  id="form-title"
                  type="text"
                  placeholder="Course Title"
                  className="input input-primary input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={onAddStep}
              type="button"
              className="btn btn-primary"
            >
              add another step
            </button>
          </div>
          {steps.map((step, i) => (
            <div key={step.step} className="w-full">
              <div
                id="markdown"
                className="border-2 border-purple-500 p-3 mb-2 "
              >
                {steps[steps.length - 1] === steps[i] && i > 0 && (
                  <div className=" flex justify-end mb-2">
                    <div className="btn " onClick={() => onRemoveStep(i)}>
                      X
                    </div>
                  </div>
                )}
                <Tiptap
                  stepTitle={step.title}
                  onStepTitleChange={onChangeStepsTitle(i)}
                  editable
                  content={JSON.parse(step.contentMd)}
                  onChange={(data) => {
                    onChangeStepsContent(i);
                    const stepsCopy = [...steps];
                    const content = JSON.stringify(data);
                    stepsCopy[i].contentMd = content;
                    localStorage.setItem(`steps`, JSON.stringify(stepsCopy));
                  }}
                />
              </div>
            </div>
          ))}
          <div className="mt-5 mx-auto">
            <button type="submit" className="btn btn-primary ">
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
