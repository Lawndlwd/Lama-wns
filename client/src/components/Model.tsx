/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import React from "react";

export const Model = ({ label, checked, ...props }: any): JSX.Element => {
  return (
    <div className="absolute w-10/12 lg:max-w-full lg:flex mb-8">
      {label && (
        <label htmlFor="my-modal-2" className="btn btn-primary modal-button">
          {label}
        </label>
      )}
      <input
        type="checkbox"
        id="my-modal-2"
        className="modal-toggle"
        checked={checked}
        onChange={console.log}
      />
      <div className="modal">
        <div className="modal-box">{props.slot}</div>
      </div>
    </div>
  );
};
