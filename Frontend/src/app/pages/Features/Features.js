import React, { useState, useEffect } from "react";
import FeatureCard from "../../components/Features/FeatureCard";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeatures } from "../../store/Actions/Features/Features";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
const features=[{title:"Get Service",redirectUrl:"/app/getservice"},
{title:"Provide Service",redirectUrl:"/app/serviceProvider"},
{title:"Get Donation",redirectUrl:"/app/get-donation"},
{title:"Give Donation",redirectUrl:"/app/give-donation"}

]
function Features() {
  let allFeatures = useSelector((state) => state?.featured?.AllFeatures);
  const dispatch = useDispatch();
  
  //component did mount (after render for 1st time and only run after 1st render )
  useEffect(() => {
    dispatch(getAllFeatures());
    //component did mount with useEffect required empty array
  }, []);
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <span className="login100-form-title p-b-48">
              <img src={Logo} style={{ width: "120px", height: "120px" }} />
            </span>
            {features ? (
              features.map((item) => {
                return (
                  <FeatureCard
                    title={item?.title}
                    redirectUrl={item?.redirectUrl}
                  />
                );
              })
            ) : (
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            )}
            {/* {allFeatures ? (
              allFeatures.map((item) => {
                return (
                  <FeatureCard
                    title={item?.title}
                    redirectUrl={item?.redirectUrl}
                  />
                );
              })
            ) : (
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Features;
