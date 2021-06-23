import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.authenticated && JSON.parse(localStorage.authenticated) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
