/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { v4 } from "uuid";

export const Search = ({
  label,
  placeHolder,
  handleChange,
  searchTerm,
}: {
  label: string;
  placeHolder: string;
  handleChange;
  searchTerm;
}): JSX.Element => {
  const uid = v4();
  return (
    <>
      <div className="w-full ">
        <label
          className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
          htmlFor={`form-${label}--${uid}`}
        >
          {label}
        </label>
        <div className="flex items-center ">
          <input
            className="appearance-none block w-full bg-gray-700 text-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none  rounded-xl   focus:bg-gray-900 "
            id={`form-${label}--${uid}`}
            type="search"
            placeholder={placeHolder}
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
