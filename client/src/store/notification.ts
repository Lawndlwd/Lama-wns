/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { GetOneClassRoomQuery } from "../graphql/generated/graphql";

export type INotificationState = GetOneClassRoomQuery;
export const initialNotificationState: INotificationState | null = null;
export interface INotificationContext {
  notifications: INotificationState | null;
  updateNotifications: (notification: INotificationState | null) => void;
}

const notificationsContext = createContext<INotificationContext>({
  notifications: initialNotificationState,
  updateNotifications: (notification: INotificationState | null) => null,
});
export const NotificationContextConsumer = notificationsContext.Consumer;
export const NotificationContextProvider = notificationsContext.Provider;
export default notificationsContext;
