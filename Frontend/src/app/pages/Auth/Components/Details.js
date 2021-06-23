import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      // margin: theme.spacing(2),
      width: "400px",
      fontFamily: "Poppins-Regular",
    },
  },

  center: {
    display: "flex",
    justifyContent: "center",
  },
  end: {
    display: "flex",
    justifyContent: "flex-end",
  },
  heading: {
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
  },
}));
function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const configs = useSelector((state) => state.auth.configs);
  const interestOptions = configs?.interests;
  const servicesOptions = configs.services;
  const [allInterests, setAllInterests] = useState(null);
  const [allServices, setAllServices] = useState(null);
  const user = {
    email: "test@gmail.com",
    contactNo: "08976654567",
    interests: [1, 3, 5, 6],
    services: [1, 4],
    address: "Block-A, phase-2, Johar Town, Lahore",
  };

  useEffect(() => {
    dispatch({ type: "LOGIN_SUCCESS" });
  }, []);
  const handleSwitchPage = () => {
    history.push("/");
  };

  useEffect(() => {
    if (user?.interests?.length > 0) {
      let _allInterests = [...interestOptions];
      let _interests = [];
      let _interest = {};
      let index;
      _allInterests.forEach((interest, index) => {
        index = user?.interests.findIndex((item) => item === interest.id);
        _interest = { ...interest };
        if (index > -1) {
          _interest["selected"] = true;
        } else {
          _interest["selected"] = false;
        }
        _interests.push(_interest);
      });

      setAllInterests(_interests);
    }
  }, []);
  useEffect(() => {
    if (user?.interests?.length > 0) {
      let _allServices = [...servicesOptions];
      let _services = [];
      let _service = {};
      let index;
      _allServices.forEach((service, index) => {
        index = user?.services.findIndex((item) => item === service.id);
        _service = { ...service };
        if (index > -1) {
          _service["selected"] = true;
        } else {
          _service["selected"] = false;
        }
        _services.push(_service);
      });

      setAllServices(_services);
    }
  }, []);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid
          container
          className={classes.center}
          style={{ marginTop: "15px" }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h5" variant="h4" className={classes.heading}>
              Contact Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid
              container
              className={classes.center}
              // spacing={2}
              style={{ marginTop: "20px" }}
            >
              <Grid item xs={2}>
                <Typography
                  component="h6"
                  variant="h6"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  E-mail:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  component="h6"
                  variant="h6"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {user?.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid
              container
              className={classes.center}
              // spacing={2}
              style={{ marginTop: "20px" }}
            >
              <Grid item xs={2}>
                <Typography
                  component="h6"
                  variant="h6"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  Contact No.:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  component="h6"
                  variant="h6"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {user?.contactNo}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.center}
              // spacing={2}
              style={{ marginTop: "20px" }}
            >
              <Grid item xs={2}>
                <Typography
                  component="h6"
                  variant="h6"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  Current Address:
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  component="h6"
                  variant="h6"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  {user?.address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <Grid container style={{ marginTop: "30px" }}>
          <Typography component="h5" variant="h4" className={classes.heading}>
            Interests
          </Typography>
          <Grid
            container
            className={classes.center}
            style={{ marginTop: "20px" }}
          >
            <Grid item xs={8}>
              <Grid container>
                {allInterests &&
                  allInterests.map((item, index) => {
                    return item?.selected ? (
                      <Grid item key={index}>
                        <Chip
                          label={item.value}
                          clickable
                          color="primary"
                          style={{ margin: "5px" }}
                        />
                      </Grid>
                    ) : (
                      <Grid item key={index}>
                        <Chip
                          label={item.value}
                          clickable
                          color="primary"
                          variant="outlined"
                          style={{ margin: "5px" }}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          // className={classes.center}
          style={{ marginTop: "30px" }}
        >
          <Typography component="h5" variant="h4" className={classes.heading}>
            Services
          </Typography>
          <Grid
            container
            className={classes.center}
            style={{ marginTop: "20px" }}
          >
            <Grid item xs={8}>
              <Grid container>
                {allServices &&
                  allServices.map((item, index) => {
                    return item?.selected ? (
                      <Grid item key={index}>
                        <Chip
                          label={item.value}
                          clickable
                          color="primary"
                          // style={{ fontSize: "19px" }}
                          style={{ margin: "5px" }}
                        />
                      </Grid>
                    ) : (
                      <Grid item key={index}>
                        <Chip
                          label={item.value}
                          clickable
                          color="primary"
                          variant="outlined"
                          // style={{ fontSize: "19px" }}
                          style={{ margin: "5px" }}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* 
      <Grid container className={classes.center} style={{ marginTop: "15px" }}>
        <Grid item xs={12}>
          <Typography
            component="h5"
            variant="h4"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Services
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            className={classes.center}
            style={{ marginTop: "20px" }}
          >
            <Grid item xs={8}>
              <Grid container>
                {allServices &&
                  allServices.map((item, index) => {
                    return item?.selected ? (
                      <Grid item key={index}>
                        <Chip
                          label={item.value}
                          clickable
                          color="primary"
                          // style={{ fontSize: "19px" }}
                          style={{ margin: "5px" }}
                        />
                      </Grid>
                    ) : (
                      <Grid item key={index}>
                        <Chip
                          label={item.value}
                          clickable
                          color="primary"
                          variant="outlined"
                          // style={{ fontSize: "19px" }}
                          style={{ margin: "5px" }}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
}
export default Signup;
