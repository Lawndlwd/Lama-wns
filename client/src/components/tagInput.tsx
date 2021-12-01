/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

export const TagInput = ({
  input,
  onKeyDown,
  onChange,
  tags,
  onKeyUp,
  deleteTag,
}: {
  input;
  onKeyDown;
  onChange;
  tags;
  onKeyUp;
  deleteTag;
}): JSX.Element => {
  return (
    <>
      <div className="w-full form-control mb-1">
        <label className="label" htmlFor="form-tag">
          <span className="label-text">Tags</span>
        </label>
        <div className=" overflow-hidden ">
          <div className="px-6 pt-4 pb-2 flex flex-wrap ">
            {tags.map((tag, index) => (
              <span
                key={index}
                className=" flex flex-row   gap-2 justify-betweeninline-block bg-gray-900 hover:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2"
              >
                #{tag}
                <button onClick={() => deleteTag(index)}>x</button>
              </span>
            ))}
          </div>
          <input
            id="form-tag"
            type="text"
            className="input input-primary input-bordered    w-11/12 leading-tight my-2 mx-2 outline-none"
            value={input}
            placeholder="Enter a tag"
            onKeyDown={onKeyDown}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        </div>
      </div>
    </>
  );
};
