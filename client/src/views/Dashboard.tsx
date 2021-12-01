/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { Search } from "../components/Search";
import { ClassCard } from "../components/ClassCard";
import classRoomContext, { IClassRoomState } from "../store/classRoom";
import userContext from "../store/userContext";

export const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const { user } = useContext(userContext);
  const [searchResults, setSearchResults] = useState<Array<IClassRoomState>>(
    []
  );
  const [perPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const pageVisited = pageNumber * perPage;

  const { classRooms, updateClassRooms } = useContext(classRoomContext);

  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = classRooms.filter(
      (classRoom) =>
        classRoom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classRoom.tags.includes(searchTerm.toLowerCase()) ||
        classRoom.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm, classRooms]);

  useEffect(() => {
    if (classRooms) {
      updateClassRooms(classRooms);
    }
  }, [classRooms, updateClassRooms]);
  const changePage = ({ selected }: { selected: number }) => {
    window.scrollTo(0, 0);
    setPageNumber(selected);
  };
  const dsqdf = searchResults
    .slice(pageVisited, pageVisited + perPage)
    .map(({ state, name, _id, desc, tags, image, owner, updatedAt }) => (
      <ClassCard
        key={_id}
        state={state}
        name={name}
        _id={_id}
        desc={desc}
        tags={tags}
        image={image}
        owner={owner}
        updatedAt={updatedAt}
        setSearchTerm={(tag) => setSearchTerm(tag)}
        user={user}
      />
    ));
  return (
    <div>
      <div className=" w-11/12 mx-auto flex gap-4 mt-6">
        <div className="w-3/12 flex flex-col gap-1 items-start  ">
          <Search
            label="Search"
            placeHolder="Search"
            handleChange={handleChange}
            searchTerm={searchTerm}
          />
          <button
            type="button"
            onClick={() => history.push("/create-class-room")}
            key={Date.now() + Math.random() * 100}
            className="btn btn-primary"
          >
            Create new class
          </button>
        </div>

        <div className="w-9/12 mx-auto ">
          <div className=" flex justify-between  mb-5">
            {searchTerm ? (
              <>
                <p className="text-purple-700 ">
                  {`${searchResults.length} Result${
                    searchResults.length > 1 ? "s" : ""
                  } found`}
                </p>
                <span
                  className="btn btn-primary"
                  onClick={() => setSearchTerm("")}
                >
                  {" "}
                  X{" "}
                </span>
              </>
            ) : null}
          </div>
          {searchResults.length > 5 && (
            <ReactPaginate
              nextLabel="Next"
              previousLabel="Prev"
              pageCount={Math.ceil(searchResults.length / perPage)}
              onPageChange={changePage}
              containerClassName="flex gap-4 mb-5  justify-center items-center "
              nextLinkClassName="flex items-center jus  px-2 py-1 text-gray-300 bg-gray-500 rounded-md"
              previousLinkClassName="flex items-center px-2 py-1 text-gray-300 bg-gray-500 rounded-md"
              activeLinkClassName=" bg-gray-700"
              pageRangeDisplayed={4}
              marginPagesDisplayed={5}
              pageLinkClassName="px-2 py-1 text-gray-200 bg-gray-500 rounded-md hover:bg-gray-400 hover:text-white"
            />
          )}
          {dsqdf}
          {searchResults.length > 5 && (
            <ReactPaginate
              nextLabel="Next"
              previousLabel="Prev"
              pageCount={Math.ceil(searchResults.length / perPage)}
              onPageChange={changePage}
              containerClassName="flex gap-4 mb-5  justify-center items-center "
              nextLinkClassName="flex items-center jus  px-2 py-1 text-gray-300 bg-gray-500 rounded-md"
              previousLinkClassName="flex items-center px-2 py-1 text-gray-300 bg-gray-500 rounded-md"
              activeLinkClassName=" bg-gray-700"
              pageRangeDisplayed={4}
              marginPagesDisplayed={5}
              pageLinkClassName="px-2 py-1 text-gray-200 bg-gray-500 rounded-md hover:bg-gray-400 hover:text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};
