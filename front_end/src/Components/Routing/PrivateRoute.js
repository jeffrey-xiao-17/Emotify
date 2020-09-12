import {Redirect, Route} from 'react-router-dom'
import React from 'react'

function PrivateRoute ({component: Component, pathname, authed, render=null}) {
  if (!authed) {
    return <Redirect to="/"/>
  }
  if (render==null){
    return (
      <Route
        render={() => <Component/>}
        path={pathname}
      />
    )
  }
  else {
    return (
      <Route
        path={pathname}
        render={render}
      />
    )
  }
}
  export default PrivateRoute