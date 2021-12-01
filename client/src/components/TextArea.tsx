/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { FieldError } from "react-hook-form";
import { v4 } from "uuid";

export const TextArea = ({
  label,
  placeHolder,
  error,
  register,
  inputName,
}: {
  label: string;
  placeHolder: string;
  error: FieldError | undefined;
  register: any;
  inputName: string | undefined;
}): JSX.Element => {
  const uid = v4();
  return (
    <>
      <div className="w-full form-control mb-1">
        <label className="label" htmlFor={`form-${label}--${uid}`}>
          <span className="label-text">{label}</span>
        </label>
        <textarea
          className="textarea h-24 textarea-bordered textarea-primary"
          id={`form-${label}--${uid}`}
          {...register}
          placeholder={placeHolder}
          name={inputName}
        />

        {error ? (
          <p className="text-red-500 text-xs italic"> {error.message} </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
