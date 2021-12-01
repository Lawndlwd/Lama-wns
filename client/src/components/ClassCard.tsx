/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useHistory } from "react-router-dom";
import { useDeleteClassMutation } from "../graphql/generated/graphql";
import { timeDifference } from "../utils/date";
import { Model } from "./Model";

export const ClassCard = ({
  state,
  name,
  _id,
  desc,
  tags,
  image,
  owner,
  updatedAt,
  setSearchTerm,
  user,
}: {
  state;
  name;
  _id;
  desc;
  tags;
  image;
  owner;
  updatedAt;
  user;
  setSearchTerm: (tag: string) => void;
}): JSX.Element => {
  const history = useHistory();
  const [showMenu, showMenuSet] = React.useState<{ [key: string]: boolean }>(
    {}
  );
  const [showModel, showModelSet] = React.useState(false);

  const showMenuHandler = (id: string) => {
    if (showMenu[id]) {
      const { [id]: tmp, ...rest } = showMenu;
      showMenuSet(rest);
    } else {
      showMenu[id] = true;
      showMenuSet({ [id]: true, ...showMenu });
    }
  };
  const [deleteClass] = useDeleteClassMutation({
    refetchQueries: ["getClasses"],
  });
  const onDelete = async () => {
    showModelSet(!showModel);
    try {
      await deleteClass({ variables: { id: _id } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-10/12 lg:max-w-full lg:flex mb-8">
      <div
        className="h-36 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        onClick={() => history.push(`class-room/${_id}`)}
      >
        <img
          className="object-cover w-full h-full"
          src={image}
          alt={image}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://i.ibb.co/QmY6fnV/LAMA.png";
          }}
        />
      </div>
      <div className=" bg-gray-800   rounded-b lg:rounded-b-none w-full lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-2">
          {state === "PUBLIC" ? (
            <p className="bg-purple-50 text-purple-700  text-xs px-2 rounded-full  uppercase font-semibold tracking-wide  inline-block  items-center">
              public
            </p>
          ) : (
            <p className="bg-purple-50 text-purple-700  text-xs px-2  rounded-full  uppercase font-semibold tracking-wide flex items-center w-36 ">
              <svg
                className="text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#108497"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Members only
            </p>
          )}
          <div
            className="float-right  test inline relative cursor-pointer "
            onClick={() => showMenuHandler(_id)}
          >
            {showMenu[_id] ? (
              <div className="absolute right-1 top-4 mt-2 w-48 bg-gray-700 rounded-md overflow-hidden shadow-xl z-20">
                {user && owner._id === user._id && (
                  <div className=" px-4 py-2 text-sm text-gray-200 hover:bg-gray-800   gap-4  flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#108497"
                    >
                      <path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5c-2.762 0-5-2.239-5-5s2.238-5 5-5zm15-4c0-1.657-1.344-3-3-3-1.657 0-3 1.343-3 3 0 .312.061.606.148.888l-4.209 3.157c.473.471.877 1.009 1.201 1.599l4.197-3.148c.477.317 1.048.504 1.663.504 1.656 0 3-1.343 3-3zm-5.852 17.112c-.087.282-.148.576-.148.888 0 1.657 1.343 3 3 3 1.656 0 3-1.343 3-3s-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.59-.729 1.128-1.201 1.599l4.208 3.157zm6.852-5.05c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.395 1.195 1.508 2.062 2.836 2.062z" />
                    </svg>
                    <span className="text-md">Copy invite</span>
                  </div>
                )}
                <div
                  onClick={() => showModelSet(!showModel)}
                  className="px-4 py-2 text-sm text-gray-200 border-b border-gray-700 hover:bg-gray-800 flex gap-4 items-center"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#108497"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" />
                  </svg>
                  <span className="text-md">Delete</span>
                </div>
                <div
                  onClick={() =>
                    history.push(`class-room/${_id}/update-course`)
                  }
                  className=" px-4 py-2 text-sm text-gray-200 border-b border-gray-700 hover:bg-gray-800   gap-4  flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#108497"
                  >
                    <path d="M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z" />
                  </svg>

                  <span className="text-md">Edit</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="text-gray-50 font-bold text-xl my-2">{name}</div>
          <p className="text-gray-200 text-base">{desc}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-sm">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="inline object-cover w-6 h-6 rounded-full bg-purple-700 text-center leading-6 uppercase"
                  id="profileImage"
                >
                  {owner.name.charAt(0)}
                </div>
                {/* <img
                  className="inline object-cover w-6 h-6 rounded-full"
                  src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Profile"
                /> */}
                <p className="text-gray-300 leading-none">{owner.name}</p>
              </div>
              <p className="text-gray-400">
                {timeDifference(new Date(updatedAt).getTime())}
              </p>
            </div>
          </div>
          <div className="px-6 pt-4 pb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2 cursor-pointer "
                onClick={() => setSearchTerm(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showModel && (
        <Model
          slot={
            <>
              <h2 className="text-lg text-warning">Warning!</h2>
              <p>
                Deleting an class will delete all courses as well, Are you sure?
              </p>
              <div className="modal-action">
                <label
                  htmlFor="my-modal-2"
                  className="btn btn-primary"
                  onClick={onDelete}
                >
                  Confirm
                </label>
                <label
                  htmlFor="my-modal-2"
                  className="btn"
                  onClick={() => showModelSet(!showModel)}
                >
                  Dismiss
                </label>
              </div>
            </>
          }
          checked={showModel}
        />
      )}
    </div>
  );
};
