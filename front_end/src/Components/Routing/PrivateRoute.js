import { Redirect, Route } from "react-router-dom";
import React from "react";

function PrivateRoute({ pathname, authed, render }) {
  if (!authed) {
    return <Redirect to="/" />;
  }
  return <Route path={pathname} render={render} />;
}
export default PrivateRoute;
