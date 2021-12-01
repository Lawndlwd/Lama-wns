/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { FieldError } from "react-hook-form";
import { v4 } from "uuid";

export const Input = ({
  label,
  placeHolder,
  type,
  error,
  register,
  inputName,
}: {
  label: string;
  placeHolder: string;
  type: string;
  error: FieldError | undefined;
  register: any;
  inputName: string | undefined;
}): JSX.Element => {
  const uid = v4();
  return (
    <>
      <div className="form-control w-full mb-1">
        <label className="label" htmlFor={`form-${label}--${uid}`}>
          <span className="label-text">{label}</span>
        </label>
        <input
          className="input input-primary input-bordered"
          id={`form-${label}--${uid}`}
          type={type}
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
