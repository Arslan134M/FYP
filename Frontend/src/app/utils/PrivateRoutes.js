import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Search from "../pages/Search/Search";
import User from "../pages/User/User";
import Features from "../pages/Features/Features";
import View from "../pages/Auth/View/View";
import Services from "../pages/Services/Services";
import Hire from "../pages/Hire/Hire";
import Donation from "../pages/Donation/Donation";
import Requests from "../pages/Requests/index";
import Appointment from "../pages/Appointment/Appointment";
import GetDonation from "../pages/GetDonation/GetDonation";
import DatePicker from "../pages/Appointment/DatePicker";
import TimePicker from "../pages/Appointment/TimePicker";
import ServiceProvider from "../pages/ServiceProvider/ServiceProvider";
import Address from "../pages/ServiceProvider/Address";
import CopyAddress from "../pages/ServiceProvider/mapwithmarker";
import EditProfile from "../pages/Auth/EditProfile";
import AddDonation from "../pages/AddDonation/AddDonation";
import MapWithMarker from "../pages/MapWithMarker/index";
import Wall from "../pages/Wall/index";
import Header from "../components/Navbar/Header";
import { useRouteMatch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRouting";

function Routes() {
  let { path, url } = useRouteMatch();
  return (
    <>
      <Header />
      <ProtectedRoutes path={`${path}/wall`} component={Wall} />

      <ProtectedRoutes path={`${path}/datePicker`} component={DatePicker} />

      <ProtectedRoutes path={`${path}/timePicker`} component={TimePicker} />

      <ProtectedRoutes
        path={`${path}/appointment/:id`}
        component={Appointment}
      />

      <ProtectedRoutes
        path={`${path}/serviceProvider`}
        component={ServiceProvider}
      />

      <ProtectedRoutes
        path={`${path}/get-donation`}
        component={GetDonation}
      />

      <ProtectedRoutes
        path={`${path}/give-donation`}
        component={AddDonation}
      />

      <ProtectedRoutes path={`${path}/address`} component={Address} />

      <ProtectedRoutes path={`${path}/Copyaddress`} component={CopyAddress} />

      <ProtectedRoutes path={`${path}/services`} component={Services} />

      <ProtectedRoutes path={`${path}/donation`} component={Donation} />
      <ProtectedRoutes path={`${path}/requests`} component={Requests} />

      <ProtectedRoutes path={`${path}/hire`} component={Hire} />

      <ProtectedRoutes path={`${path}/profile-edit`} component={EditProfile} />

      <ProtectedRoutes path={`${path}/getService`} component={User} />

      <ProtectedRoutes path={`${path}/features`} component={Features} />

      <ProtectedRoutes path={`${path}/view`} component={View} />

      <ProtectedRoutes path={`${path}/map`} component={MapWithMarker} />
    </>
  );
}

export default Routes;
