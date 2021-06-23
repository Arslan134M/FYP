import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Search from "../pages/Search/Search";
import User from "../pages/User/User";
//import Update from "../pages/Update/Update";
import Features from "../pages/Features/Features";
import View from "../pages/Auth/View/View";
import Services from "../pages/Services/Services";
import Donation from "../pages/Donation/Donation";

import Profile from "../pages/Auth/Profile";
import EditProfile from "../pages/Auth/EditProfile";
import Details from "../pages/Auth/Components/Details";
import MapWithMarker from "../pages/MapWithMarker/index";
import Wall from "../pages/Wall/index";
import Header from "../components/Navbar/Header";

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>{" "}
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
