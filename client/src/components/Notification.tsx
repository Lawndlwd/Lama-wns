/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { SingleNotification } from "./SingleNotification";

export const Notification = ({
  notifications,
}: {
  notifications;
}): JSX.Element => {
  return (
    <>
      {notifications.length > 0 &&
        notifications.map((notification) => (
          <SingleNotification
            notification={notification}
            key={notification._id}
          />
        ))}
      {!notifications.length && <div className="px-2 py-1">No Comments</div>}
    </>
  );
};
