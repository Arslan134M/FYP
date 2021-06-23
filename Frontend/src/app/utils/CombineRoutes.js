import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import PublicRoutes from "./PublicRouting";
import ProtectedRoutes from "./ProtectedRouting";
import { Public } from "@material-ui/icons";
function Routes() {
  return (
    <Router>
      <PublicRoutes exact path="/signup" component={Signup} />
      <PublicRoutes path="/" exact component={Login} />
      <PublicRoutes exact path="/login" component={Login} />
      <ProtectedRoutes path="/app" component={PrivateRoutes} />
      {/* <Route path="/app/profile-edit" component={<div>.....</div>}></Route> */}
    </Router>
  );
}

export default Routes;
