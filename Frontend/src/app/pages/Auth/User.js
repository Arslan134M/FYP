import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/UserCard";
import { getAllUsers } from "../../store/Actions/Users/Users";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { Button } from "react-bootstrap";
function Signup() {
  const history = useHistory();
  let allusers = useSelector((state) => state?.users?.AllUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    //component did mount with useEffect required empty array
  }, []);

  return (
    <div>
      {allusers && allusers.length > 0 ? (
        allusers &&
        allusers.map((item) => {
          return <UserCard user={item} />;
        })
      ) : (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      )}
    </div>
  );
}
export default Signup;
