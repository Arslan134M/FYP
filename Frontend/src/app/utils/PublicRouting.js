import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/app/services" />
        )
      }
    />
  );
};

export default PublicRoutes;
