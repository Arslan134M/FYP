import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect, Component } from "react";
import ServiceCard from "../../components/ServiceCard";
import "../../styles/Auth/login.css";
//import Logo from "../../assets/logo-primary.png";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { getAllServices } from "../../store/Actions/Services/Services";
function Signup() {
  const history = useHistory();
  let allServices = useSelector((state) => state?.service?.AllServices);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllServices());
    //component did mount with useEffect required empty array
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className=" my-2 d-flex justify-content-center text col-12">
          
        </div>
        {allServices && allServices.length > 0 ? (
          allServices.map((item) => {
            return (
              <div className=" col-12 row  d-flex justify-content-center">
                <ServiceCard service={item} />
              </div>
            );
          })
        ) : (
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        )}
      </div>
      <div
        className="d-flex justify-content-end px-5  my-2 text col-12"
        style={{ marginTop: "14rem" }}
      >
      </div>
    </div>
  );
}

export default Signup;
