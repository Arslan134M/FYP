import React, { useEffect } from "react";
import UserCard from "../../components/UsersCard";
import { Grid, Card, makeStyles, Typography } from "@material-ui/core";
import { getAllUsers } from "../../store/Actions/Users/Users";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Form from "../../Containers/ProvideService/Form";
function ServiceProvider() {
  const classes = useStyles();
  const history = useHistory();
  let allusers = useSelector((state) => state?.users?.AllUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
    //component did mount with useEffect required empty array
  }, []);

  return (
    <div
      style={{ background: "#E5E5E5", height: "82vh", overflow: "auto" }}
      className={classes.customScrollBar}
    >
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid container spacing={2} style={{ paddingTop: "40px" }}>
            <Form/>
            {/* {allusers && allusers.length > 0 ? (
        allusers &&
        allusers.map((item) => {
          return <UserCard user={item} />;
        })
      ) : (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      )} */}
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
export default ServiceProvider;
const useStyles = makeStyles((theme) => ({
  btnHire: {
    background: "#419A1C",
    width: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    color: "#fff",
    padding: "3px 0px",
    cursor: "pointer",
  },
  centerAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  TextInputStyle: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "18px",
    color: "#fff",
    border: "0px",
    padding: "12px",
  },

  editButton2: {
    textAlign: "center",
    background: "transparent",
    width: "32px",
    height: "32px",
    boxShadow: "none",
  },

  editIcon: {
    color: "#FFFFFF",
  },
  addIcon: {
    color: "#FFFFFF",
    padding: "8px 0px 0px 8px",
  },
  fullCard: {
    background: "#303A5F",
    borderRadius: "10px",
    cursor: "pointer",
  },
  VenaeDescription: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "10px",
    lineHeight: "18px",
    color: "#fff",
    margin: "0px",
  },
  VenaeName: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "24px",
    lineHeight: "28px",
    color: "#FFFFFF",
    margin: "0px",
  },
  TextSpace: {
    padding: "20px 30px 20px 30px",
  },
  textSpaceFooter: {
    padding: "0px 0px 50px 30px",
  },
  editButtonSpace: {
    padding: "15px",
  },
  addCard: {
    padding: "65px 0px 75px 110px",
    background: "#EDEEF2",
    borderRadius: "10px",
    boxShadow: "none",
    cursor: "pointer",
  },
  footerText: {
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    color: "#FFFFFF",
    minHeight: "40px",
  },
  customScrollBar: {
    "&::-webkit-scrollbar": {
      width: "10px",
      borderRadius: "50px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#fff",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#EDF0F4",
      width: "5px", //for horizontal scrollbar
      height: "5px",
      borderRadius: "50px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#EDF0F4",
    },
    "&::-webkit-scrollbar-button": {
      width: "50px", //for horizontal scrollbar
      height: "70vh", //for vertical scrollbar
    },
  },
}));
