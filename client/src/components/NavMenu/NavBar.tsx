/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable import/named */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { ToggleButton } from "./Buttons/ToggleButton";
import { Title } from "../Title";
import { useScreenDimensions } from "../../hooks/useScreenDimensions";
import userContext from "../../store/userContext";
import notificationSVG from "../../assets/svg/notif.svg";
import { Notification } from "../Notification";

type TypeProps = {
  open: boolean;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NavBar = (): JSX.Element => {
  const history = useHistory();
  const client = useApolloClient();

  const [open, setOpen] = useState(false);

  const [notificationOpen, notificationOpenSet] = useState(false);
  const [notification, notificationSet] = useState<Array<any>>([]);
  const [listening, setListening] = useState(false);

  const { mobile } = useScreenDimensions();
  const { user, updateUser } = useContext(userContext);

  React.useEffect(() => {
    if (!listening && user) {
      const uri =
        process.env.NODE_ENV === "development"
          ? `http://localhost:8080/events/${user._id}`
          : `/events/${user._id}`;
      const events = new EventSource(uri);

      events.onmessage = async (event) => {
        const parsedData =
          event.data === "connected" ? event.data : JSON.parse(event.data);
        console.log(parsedData);
        event.data !== "connected" &&
          notificationSet((notif) => notif.concat(parsedData.message));
      };

      setListening(true);
    }
  }, [listening, notification, user]);

  const contentList = [
    { text: "Sign In", link: "/login", loggedIn: !user?.accessToken },
    { text: "Sign Up", link: "/register", loggedIn: !user?.accessToken },
    { text: "Log out", link: "/", loggedIn: !!user?.accessToken },
  ];
  const logout = async () => {
    await client.cache.reset();
    if (mobile) setOpen(!open);
    localStorage.removeItem("user");
    updateUser(null);
  };

  return (
    <div className=" shadow-2xl  bg-gray-900">
      <MenuWrapper className="w-11/12 mx-auto ">
        <NavTitle onClick={() => history.push(`/`)} className="cursor-pointer">
          <span className="text-purple-700">&#10100;&#10075;&#8515;</span>
          LAMA&#10101;
        </NavTitle>

        {!mobile && (
          <>
            <NavDesktop>
              <div className="flex flex-row justify-center items-center gap-5 relative">
                {user && (
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      className={`"my-6  cursor-pointer mx-3 relative m-1 btn" ${
                        notification.length > 0 ? "indicator" : ""
                      }`}
                      onClick={() => notificationOpenSet(!notificationOpen)}
                    >
                      {notification.length > 0 && (
                        <div className="indicator-item badge bg-red-500 border-0 badge-sm ">
                          {notification.length}
                        </div>
                      )}
                      <img
                        src={notificationSVG}
                        alt="notification"
                        width="24"
                        className="inline-block"
                      />
                    </div>
                    {notificationOpen && (
                      <ul
                        tabIndex={0}
                        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-96"
                      >
                        {/* <div
                    className="absolute top-12 right-10 w-96 bg-white  overflow-y-scroll z-20"
                  style={{ maxHeight: "400px" }} */}
                        {/* > */}
                        <Notification notifications={notification} />
                      </ul>
                    )}
                  </div>
                )}
                {contentList.map(
                  ({ text, link, loggedIn }) =>
                    loggedIn && (
                      <div
                        className="flex items-center mt-2 -mx-2 sm:mt-0"
                        key={text}
                      >
                        <Link
                          to={link}
                          onClick={
                            text === "Log out"
                              ? logout
                              : () => console.log("redirect")
                          }
                          key={Date.now() + Math.random() * 100}
                          className={`px-3 py-1 text-sm font-semibold text-white transition-colors duration-200 transform border-2 rounded-md 
                          ${
                            text === "Sign Up"
                              ? "bg-black rounded-md hover:bg-gray-800"
                              : "hover:bg-gray-700"
                          }`}
                        >
                          {text}
                        </Link>
                      </div>
                      // <Link
                      //   to={link}
                      //   onClick={
                      //     text === "Log out"
                      //       ? logout
                      //       : () => console.log("redirect")
                      //   }
                      //   key={Date.now() + Math.random() * 100}
                      //   className="link"
                      // >
                      //   <Title text={text} />
                      // </Link>
                    )
                )}
              </div>
            </NavDesktop>
          </>
        )}
        {mobile && <ToggleButton open={open} setOpen={setOpen} />}
      </MenuWrapper>
      {mobile && (
        <MenuContent
          className="bg-gray-800  absolute flex flex-col items-center w-full pt-10 "
          open={open}
        >
          {contentList.map(
            ({ text, link, loggedIn }) =>
              loggedIn && (
                <Link
                  to={link}
                  key={Date.now() + Math.random() * 100}
                  className="link"
                  onClick={text === "Log out" ? logout : () => setOpen(!open)}
                >
                  <Title text={text} />
                </Link>
              )
          )}
        </MenuContent>
      )}
    </div>
  );
};

const MenuWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavDesktop = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavTitle = styled.h1`
  font-family: "IBM Plex Sans", sans-serif !important;
  font-size: 3em;
  margin: 0;
`;

const MenuContent = styled.div<TypeProps>`
  inset: 0;
  transition: transform 0.7s ease;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  z-index: 1000;
`;
