import { UserState } from "../store/userContext";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const getCurrentUser = (): UserState | null => {
  if (localStorage.getItem("user"))
    return JSON.parse(localStorage.getItem("user")!);

  return null;
};
