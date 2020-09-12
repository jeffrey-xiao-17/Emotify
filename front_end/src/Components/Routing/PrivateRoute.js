import { Redirect, Route } from "react-router-dom";
import React from "react";

function PrivateRoute({ pathname, authed, render }) {
  if (!authed) {
    return <Redirect to="/" />;
  }

  // if (render==null){
  //   return (
  //     <Route
  //       render={() => <Component/>}
  //       path={pathname}
  //     />
  //   )
  // }
  console.log(pathname);
  return <Route path={pathname} render={render} />;
}
export default PrivateRoute;
