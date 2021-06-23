import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../utils/API";
function Restaurants(props) {
  const { user } = props;
  // console.log;

  const classes = useStyles();

  const history = useHistory();

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
        <Card className={classes.fullCard}>
          {/* <Grid container justify="flex-flex-end">
                    <Grid item className={classes.editButtonSpace}>
                      <Card className={classes.editButton2}>
                        <Typography className={classes.ordersCount}>
                          name
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid> */}
          <Grid item className={classes.TextSpace}>
            <Grid container justify="space-between">
              <Grid item>
                <img 
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "25px",
                  }}
                  // src={user?.image?user?.image:"https://static6.depositphotos.com/1043957/580/i/600/depositphotos_5805232-stock-photo-world-connection.jpg"}
                  src={user?.image?baseUrl+"/"+user?.image:"https://static6.depositphotos.com/1043957/580/i/600/depositphotos_5805232-stock-photo-world-connection.jpg"}
                  //   className={classes.VenaeName}
                />
              </Grid>
              <Grid item style={{ display: "flex", justifyContent: "flex-end",maxWidth:"60%",overFlow:"hidden" }}>
                <Grid container >
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end"}}>
                <p className={classes.VenaeName}>{user?.fullName}</p>
                
                

                </Grid>
                
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end"}}>
                <p className={classes.VenaeName}>{user?.email}</p>
                </Grid>
                
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end"}}>
                <p className={classes.VenaeName}>{user?.service?.title}</p>
                </Grid>
                </Grid>
              </Grid>
              
              
            </Grid>
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
                  Rating
                  {/* {venue?.read_only_menu
                            // ? ""
                            // : venue?.is_currently_accepting_orders
                            // ? intl.formatMessage({
                            //     id: "Orders_enabled",
                            //   })
                            // : intl.formatMessage({
                            //     id: "Orders_disabled",
                            //   })} */}
                </Typography>
              </Grid>

              <Grid
                item
                className={classes.centerAlign}
                style={{
                  justifyContent: "flex-flex-end",
                  //   marginRight: "-13px",
                }}
              >
                <span className={classes.btnHire}>
                  <Link className="link" to={`/app/appointment/${user?._id}/?service=${props?.service}`}>
                    
                    <a href="#" class="card-link">Hire</a></Link> </span>
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
