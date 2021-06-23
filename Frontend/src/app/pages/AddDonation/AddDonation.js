import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/UsersCard";
import { searchUsers } from "../../store/Actions/Users/Users";
import { addDonation } from "../../store/Actions/Donation/Donation";

import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
      fontFamily: "Poppins-Regular",
    },
  },
  deepPurple: {
    backgroundColor: deepPurple[300],
    color: "#fff",
  },

  center: {
    display: "flex",
    justifyContent: "center",
  },
  end: {
    display: "flex",
    justifyContent: "flex-end",
  },

  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
}));
function AddDonation() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedTitle, setSelectedTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");

  const { register, handleSubmit, errors, setValue } = useForm();
  var phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const onSubmit = (data) => {
    if (!selectedTitle) {
      setTitleError("Title is Required");
    }
    if (!phoneRegExp.test(phoneNo)) {
      setPhoneNoError("Please Enter Valid Contact No.");
    } else {
      dispatch(addDonation({body:{description: data.description, contactNumber:phoneNo, title:selectedTitle}}))
      console.log({ description: data.description, phoneNo, selectedTitle });
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        style={{ padding: "15px", margin: "0px", maxWidth: "100vw" }}
      >
        <Grid item xs={12} className={classes.center}>
          <Typography
            component="h3"
            variant="h3"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Add Donation
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login100-form validate-form"
          >
            <Grid
              container
              className={classes.center}
              spacing={2}
              style={{ marginTop: "15px", justifyContent: "center" }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <InputLabel>Title</InputLabel>
                <TextField
                  name="title"
                  fullWidth
                  select
                  value={selectedTitle}
                  onChange={(e) => {
                    setTitleError("");
                    setSelectedTitle(e.target.value);
                  }}
                  error={Boolean(titleError)}
                  helperText={titleError}
                >
                  <MenuItem value="money">Money</MenuItem>
                  <MenuItem value="book">Book</MenuItem>
                  <MenuItem value="clothes">Clothes</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputLabel>Contact No.</InputLabel>

                <TextField
                  name="phone"
                  type="text"
                  fullWidth
                  onChange={(e) => {
                    setPhoneNoError("");
                    setPhoneNo(e.target.value);
                  }}
                  error={Boolean(phoneNoError)}
                  helperText={phoneNoError}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <InputLabel>Description</InputLabel>

                <TextField
                  name="description"
                  type="text"
                  fullWidth
                  inputRef={register}
                />
              </Grid>

              <Grid container style={{ marginTop: "15px" }}>
                <Grid item xs={12} sm={12} md={10} className={classes.end}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.deepPurple}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>{" "}
      </Grid>
    </div>
  );
}
export default AddDonation;
