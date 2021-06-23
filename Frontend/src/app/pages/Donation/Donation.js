import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DonationCard from "../../components/DonationCard";
import "../../styles/Auth/login.css";
//import Logo from "../../assets/logo-primary.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllDonations } from "../../store/Actions/Donations/Donations";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
function Donation() {
  const history = useHistory();
  let allDonations = useSelector((state) => state?.donation.AllDonations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDonations());
    //component did mount with useEffect required empty array
  }, []);
  console.log("allDonations", allDonations);
  return (
    
	<div className="container">
	<div className="row">
	  <div className=" my-2 d-flex justify-content-center text col-12">
         
       
		  </div>
          {allDonations && allDonations.length > 0 ? (
            allDonations.map((item) => {
              return(
				<div className=" col-12 row  d-flex justify-content-center">
					 <DonationCard donation={item} />
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



       
export default Donation;
