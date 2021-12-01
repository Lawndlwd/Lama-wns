/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import userContext from "../store/userContext";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}
export const PrivateRoute = ({
  component,
  isAuthenticated,
  ...rest
}: any): JSX.Element => {
  const user =
    useContext(userContext).user ||
    (localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")!)) ||
    null;
  const routeComponent = () =>
    user ? (
      <Route {...rest} component={component} />
    ) : (
      <Redirect to={{ pathname: `/login` }} />
    );
  window.scrollTo(0, 0);

  return <Route {...rest} render={routeComponent} />;
};
