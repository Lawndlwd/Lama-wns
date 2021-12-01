// /* eslint-disable no-underscore-dangle */
// /* eslint-disable no-shadow */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable react/button-has-type */
// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-param-reassign */
// /* eslint-disable jsx-a11y/label-has-associated-control */

import React from "react";
// import { useForm } from "react-hook-form";
// import { useHistory, useParams } from "react-router-dom";
// import Tiptap from "../components/Tiptap";
// import {
//   useGetOneCourseQuery,
//   useUpdateCourseMutation,
// } from "../graphql/generated/graphql";

// type ClassParams = {
//   course_id: string;
//   step: string;
//   class_id: string;
// };
// export type ICourse = {
//   contentMd: string;
//   step: number;
//   title: string;
//   next: number | null;
//   prev: number | null;
//   contentHtml: string;
// };
export const UpdateCourse = (): JSX.Element => {
  return <div>update</div>;
  //   const history = useHistory();
  //   const { course_id, class_id } = useParams<ClassParams>();

  //   const initialValue = (stepId) =>
  //     localStorage.getItem(`content-${stepId}`) ||
  //     JSON.stringify({
  //       type: "doc",
  //       content: [
  //         {
  //           type: "heading",
  //           attrs: {
  //             textAlign: "left",
  //             level: 1,
  //           },
  //           content: [
  //             {
  //               type: "text",
  //               text: "hello",
  //             },
  //           ],
  //         },
  //         {
  //           type: "paragraph",
  //           attrs: {
  //             textAlign: "left",
  //           },
  //         },
  //         {
  //           type: "paragraph",
  //           attrs: {
  //             textAlign: "left",
  //           },
  //         },
  //         {
  //           type: "paragraph",
  //           attrs: {
  //             textAlign: "left",
  //           },
  //         },
  //         {
  //           type: "paragraph",
  //           attrs: {
  //             textAlign: "left",
  //           },
  //         },
  //       ],
  //     });
  //   const initialSteps =
  //     localStorage.getItem(`steps`) ||
  //     JSON.stringify([
  //       {
  //         contentMd: initialValue(1),
  //         step: 1,
  //         title: "",
  //         next: null,
  //         prev: null,
  //         contentHtml: "",
  //       },
  //     ]);
  //   const [steps, setSteps] = useState<Array<any>>(JSON.parse(initialSteps));
  //   const [title, setTitle] = useState("");
  //   const { loading, error, data } = useGetOneCourseQuery({
  //     variables: { id: course_id },
  //   });

  //   React.useEffect(() => {
  //     if (data) {
  //       const stepCopy = JSON.parse(JSON.stringify(data.getOneCourse.steps));
  //       stepCopy.forEach((e) => delete e.__typename);
  //       console.log(stepCopy);
  //       setSteps(stepCopy);
  //       setTitle(data.getOneCourse.title);
  //     }
  //   }, [data]);

  //   const onAddStep = () => {
  //     setSteps([
  //       ...steps,
  //       {
  //         contentMd: initialValue(steps.length + 1),
  //         step: steps.length + 1,
  //         title: "",
  //         next: null,
  //         prev: steps.length,
  //         contentHtml: "",
  //       },
  //     ]);
  //   };

  //   const onRemoveStep = (i: number) => {
  //     console.log(i);
  //     const stepsCopy = JSON.parse(JSON.stringify(steps));
  //     const deleted = stepsCopy.splice(i, 1);
  //     console.log(deleted, stepsCopy);
  //     localStorage.setItem(`steps`, JSON.stringify(stepsCopy));
  //     setSteps(stepsCopy);
  //   };

  //   const onChangeStepsTitle = (i) => (e: React.FormEvent<HTMLInputElement>) => {
  //     const stepsCopy = JSON.parse(JSON.stringify(steps));
  //     stepsCopy[i].title = e.currentTarget.value;
  //     setSteps(stepsCopy);
  //   };
  //   const onChangeStepsContent = (i) => (data: Array<any>) => {
  //     const stepsCopy = JSON.parse(JSON.stringify(steps));
  //     const content = JSON.stringify(data);
  //     stepsCopy[i].contentMd = content;
  //     setSteps(stepsCopy);
  //     console.log(steps === stepsCopy, steps);
  //   };

  //   const { handleSubmit } = useForm({ mode: "onTouched" });

  //   const [updateCourse] = useUpdateCourseMutation({
  //     refetchQueries: ["getOneClassRoom"],
  //   });

  //   const onSubmit = handleSubmit(async () => {
  //     console.log(steps);
  //     try {
  //       await updateCourse({
  //         variables: {
  //           data: {
  //             _id: course_id,
  //             steps,
  //             title,
  //           },
  //         },
  //       });
  //       localStorage.removeItem(`steps`);
  //       history.push(`/class-room/${class_id}`);
  //       window.scrollTo(0, 0);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });

  //   return (
  //     <>
  //       <div className="w-9/12 mx-auto">
  //         <form onSubmit={onSubmit} className=" flex flex-col  pt-6 pb-8 mb-4">
  //           <div className="flex justify-between items-center mb-3 ">
  //             <div className="w-1/4 ">
  //               <div className="form-control">
  //                 <input
  //                   id="form-title"
  //                   type="text"
  //                   placeholder="Course Title"
  //                   className="input input-primary input-bordered"
  //                   value={title}
  //                   onChange={(e) => setTitle(e.target.value)}
  //                 />
  //               </div>
  //             </div>
  //             <button
  //               onClick={onAddStep}
  //               type="button"
  //               className="btn btn-primary"
  //             >
  //               add another step
  //             </button>
  //           </div>
  //           {data &&
  //             steps.map((step, i) => (
  //               <div key={step.step} className="w-full">
  //                 <div
  //                   id="markdown"
  //                   className="border-2 border-purple-500 p-3 mb-2 "
  //                 >
  //                   {steps[steps.length - 1] === steps[i] && i > 0 && (
  //                     <div className=" flex justify-end mb-2">
  //                       <div className="btn " onClick={() => onRemoveStep(i)}>
  //                         X
  //                       </div>
  //                     </div>
  //                   )}
  //                   <Tiptap
  //                     stepTitle={step.title}
  //                     onStepTitleChange={onChangeStepsTitle(i)}
  //                     editable
  //                     content={JSON.parse(step.contentMd)}
  //                     onChange={(data) => {
  //                       onChangeStepsContent(i);
  //                       const stepsCopy = JSON.parse(JSON.stringify(steps));
  //                       const content = JSON.stringify(data);
  //                       stepsCopy[i].contentMd = content;
  //                       console.log(stepsCopy);
  //                       localStorage.setItem(`steps`, JSON.stringify(stepsCopy));
  //                     }}
  //                   />
  //                 </div>
  //               </div>
  //             ))}
  //           <div className="mt-5 mx-auto">
  //             <button type="submit" className="btn btn-primary ">
  //               submit
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </>
  //   );
};
