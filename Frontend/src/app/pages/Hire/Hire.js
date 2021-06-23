import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HireCard from "../../components/HireCard";
import "../../styles/Auth/login.css";
//import Logo from "../../assets/logo-primary.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllHires} from "../../store/Actions/Hires/Hires";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

function Hire() {
  const history = useHistory();
  let hireMe = useSelector((state) => state?.hire.HireMe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllHires());
    //component did mount with useEffect required empty array
  }, []);
  console.log("hireMe", hireMe);
  return (
    
	<div className="container">
	<div className="row">
	  <div className=" my-2 d-flex justify-content-center text col-12">
         
       
		  </div>
          {hireMe && hireMe.length > 0 ? (
            hireMe.map((item) => {
              return(
				<div className=" col-12 row  d-flex justify-content-center">
					 <HireCard hire={item} />
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



       
export default Hire;
