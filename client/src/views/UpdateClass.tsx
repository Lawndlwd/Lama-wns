/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// import { Link, Redirect } from "react-router-dom";
import { Input } from "../components/Input";
import { TagInput } from "../components/tagInput";
import { TextArea } from "../components/TextArea";
import {
  useGetOneClassRoomQuery,
  useUpdateClassMutation,
} from "../graphql/generated/graphql";
import { ClassParams } from "./ClassRoom";

type FormValues = {
  name: string;
  state: string;
  image: string;
  desc: string;
};
export const UpdateClassRoom = (): JSX.Element => {
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const { id } = useParams<ClassParams>();

  const [tags, setTags] = useState<Array<string>>([]);
  const [updateClass] = useUpdateClassMutation({
    refetchQueries: ["getClasses"],
  });
  const { data } = useGetOneClassRoomQuery({
    variables: { id },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });
  React.useEffect(() => {
    if (data) {
      setValue("name", data.getOneClassRoom.name);
      setValue("state", data.getOneClassRoom.state);
      setValue("desc", data.getOneClassRoom.desc);
      setValue("image", data.getOneClassRoom.image);
      setTags(data.getOneClassRoom.tags);
    }
  }, [data, setValue]);
  const onSubmit = handleSubmit(async (form) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await updateClass({
        variables: {
          data: {
            _id: id,
            name: form.name,
            state: form.state,
            desc: form.desc,
            tags,
            image: form.image,
          },
        },
      });
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
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};
