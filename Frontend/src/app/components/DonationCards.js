import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { updateRequestStatus } from "../store/Actions/Donation/Donation";
function Restaurants(props) {
  const { user } = props;
  // console.log;

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChangeStatus = async (status) => {
    let res = await dispatch(updateRequestStatus({ id:user?._id,status: status }));
  };
  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card className={classes.fullCard}>
         
          <Grid item className={classes.TextSpace}>
            <Grid container justify="space-between">
              <Grid item>
                <Grid cotainer>
                <Grid item xs={12}>
              <p className={classes.VenaeName}>
                      {user?.title}
                    </p>
                    </Grid>
                
                    </Grid>
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  maxWidth: "60%",
                  overFlow: "hidden",
                }}
              >
                <Grid container>
                  

                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <p
                      className={classes.VenaeName}
                      style={{ textTransform: "capitalize" }}
                    >
                      {user?.status}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
         <Grid item xs={12} className={classes.TextSpace}>
        
                  
                    <p className={classes.VenaeName}>
                      {user?.description}
                    </p>
                
         </Grid>
          <Grid
            item
            style={{
              backgroundColor: "#44507B",
              maxHeight: "72px",
              paddingLeft: "20px",
            }}
          >
            <Grid
              container
              justify="space-between"
              style={{ padding: "5px 20px 5px 5px " }}
            >
              <Grid item className={classes.centerAlign}>
                <Typography
                  className={classes.footerText}
                  style={{ display: "flex", alignItems: "center" }}
                >
                 
                      {user?.contactNumber}
                </Typography>
              </Grid>

              <Grid
                item
                className={classes.centerAlign}
                style={{
                  justifyContent: "flex-flex-end",
                }}
              >
                
{user?.added_by == localStorage.getItem("userId")&&
                <span
                  className={classes.btnHire}
                  onClick={() => handleChangeStatus("canceled")}
                >
                  <button className="link">
                    <span
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.7",
                        color: "#fff",
                      }}
                      class="card-link"
                    >
                      Cancel
                    </span>
                  </button>
                </span>}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
}

export default Restaurants;
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
