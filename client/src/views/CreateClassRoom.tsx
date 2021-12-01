/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Link, Redirect } from "react-router-dom";
import { Input } from "../components/Input";
import { TagInput } from "../components/tagInput";
import { TextArea } from "../components/TextArea";
import { useCreateClassMutation } from "../graphql/generated/graphql";

type FormValues = {
  name: string;
  state: string;
  image: string;
  desc: string;
};
export const CreateClassRoom = (): JSX.Element => {
  const [secret, secretSet] = useState("");
  const [showCopyAlert, showCopyAlertSet] = useState(false);
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const [tags, setTags] = useState<Array<string>>([]);
  const [createClass] = useCreateClassMutation({
    refetchQueries: ["getClasses"],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });
  const onSubmit = handleSubmit(async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await createClass({
        variables: {
          data: {
            name: data.name,
            state: data.state,
            desc: data.desc,
            tags,
            image: data.image,
          },
        },
      });
      secretSet(res.data?.createClass.inviteSecret as string);
    } catch (error) {
      console.log(error);
    }
  });
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) ||
      (key === "Enter" &&
        trimmedInput.length &&
        !tags.includes(trimmedInput)) ||
      (key === " " && trimmedInput.length && !tags.includes(trimmedInput))
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop() as string;
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <div className="w-11/12 mx-auto mt-5">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-4/6 flex flex-col justify-center items-center bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <Input
          label="Name"
          inputName="name"
          placeHolder="Class name"
          type="text"
          error={errors.name}
          register={register("name", {
            required: "name is required",
            min: 2,
          })}
        />
        <Input
          label="Class image"
          inputName="image"
          placeHolder="https//:..."
          type="text"
          error={errors.image}
          register={register("image", {
            required: "image is required",
            min: 15,
          })}
        />
        <TextArea
          label="Description"
          inputName="desc"
          placeHolder="..."
          error={errors.desc}
          register={register("desc", {
            required: "desc is required",
            min: 2,
          })}
        />

        <TagInput
          input={input}
          tags={tags}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          deleteTag={deleteTag}
        />
        <div className="w-full ">
          <div className="mt-4">
            <span className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Status
            </span>
            <div className="mt-2">
              <div className="form-control">
                <label className="cursor-pointer label gap-3 justify-start">
                  <input
                    type="radio"
                    value="PRIVATE"
                    {...register("state")}
                    checked
                    className="radio radio-primary"
                  />
                  <span className="label-text">private</span>
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label gap-3 justify-start">
                  <input
                    type="radio"
                    value="PUBLIC"
                    {...register("state")}
                    checked
                    className="radio radio-primary"
                  />
                  <span className="label-text">public</span>
                </label>
              </div>
              {/* <label className="inline-flex items-center ml-6">
                <input
                  className="form-radio"
                  type="radio"
                  value="PUBLIC"
                  {...register("state")}
                />
                <span className="ml-2">public</span>
              </label> */}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {secret !== "" ? (
          <>
            <p>
              Invite your audince with this invation link it will expire in 48
              hours but you can regenerate new one
            </p>
            <div
              className="bg-gray-800 w-3/6  h-12 py-3 px-5 rounded-3xl  mx-auto my-10  cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(secret);
                showCopyAlertSet(true);
                setTimeout(() => {
                  showCopyAlertSet(false);
                }, 5000);
              }}
            >
              <p className="font-bold ">
                {secret}
                <svg
                  className="ml-3 inline float-right "
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#aaa"
                >
                  <path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" />
                </svg>
              </p>
              {showCopyAlert ? (
                <div className="bg-gray-800 w-4/12  h-12 py-3 px-5 rounded-3xl  mx-auto my-2 cursor-pointer flex gap-2">
                  <span> copied </span>
                  <svg
                    className="ml-3 inline float-right "
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#5EBA7D"
                  >
                    <path d="M0 11.386l1.17-1.206c1.951.522 5.313 1.731 8.33 3.597 3.175-4.177 9.582-9.398 13.456-11.777l1.044 1.073-14 18.927-10-10.614z" />
                  </svg>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
};
