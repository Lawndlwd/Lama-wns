/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const initialUserState = {
  accessToken: "",
  name: "",
  email: "",
  _id: "",
};
export type UserState = typeof initialUserState | null;
export interface IUserContext {
  user: UserState;
  updateUser: (user: UserState | null) => void;
}

const userContext = createContext<IUserContext>({
  user: initialUserState,
  updateUser: (user: UserState | null) => {},
});
export const UserContextConsumer = userContext.Consumer;
export const UserContextProvider = userContext.Provider;
export default userContext;
