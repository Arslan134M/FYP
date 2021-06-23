import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../styles/Auth/login.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, InputLabel, Chip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Geocode from "react-geocode";
import PlacesAutocomplete from "react-places-autocomplete";
import {baseUrl} from "../../utils/API"
import {
  getUserById,
  updateUser,
  updateProfilePic,
} from "../../store/Actions/Users/Users";
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
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentAddress, setCurrentAddress] = useState([]);
  const [address, setAddress] = useState("");
  // const [fullName, setFullName] = useState("");

  const configs = useSelector((state) => state.auth.configs);
  const userDetails = useSelector((state) => state.users?.userDetails);
  const interestOptions = configs?.interests;
  const allServices = configs.services;

  const userId = "60b8eedd93de611fb0b30f57";

  const [profilePic, setProfilePic] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1zX1dQUJj_B7tsOX6UcOy_F6DoyJSJ5SVw&usqp=CAU"
  );
  var emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  var phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const { register, handleSubmit, errors, setValue } = useForm();
  const [open, setOpen] = React.useState(false);
  const [locationCoordinates_lat, setlocationCoordinates_lat] = useState(
    31.5204
  );
  const [locationCoordinates_lng, setlocationCoordinates_lng] = useState(
    74.3587
  );
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch({ type: "LOGIN_SUCCESS" });
    setOpen(true);
    dispatch(getUserById(userId)).then((res) => setOpen(false));
  }, []);
  useEffect(() => {
    if (userDetails) {
      setValue("fullName", userDetails.fullName, { shouldValidate: true });
      setValue("email", userDetails.email, { shouldValidate: true });
      setValue("phone", userDetails.phone, { shouldValidate: true });
      setCurrentAddress(userDetails?.location?.address);
      setlocationCoordinates_lng(userDetails?.location?.coordinates[0]);
      setlocationCoordinates_lat(userDetails?.location?.coordinates[1]);
      setSelectedServices(userDetails.service);
      setProfilePic(baseUrl+"/"+userDetails?.image);
    }
  }, [userDetails]);
  console.log({ profilePic });
  const handleFileChange = (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    setOpen(true);
    dispatch(updateProfilePic(userId, formData)).then((res) => setOpen(false));
    //upload pic and set here
  };

  const onSubmit = (data) => {
    data.location = {
      type: "Point",
      coordinates: [locationCoordinates_lng, locationCoordinates_lat],
      address: currentAddress,
    };
    setOpen(true);

    dispatch(updateUser(userId, data)).then((res) => {
      setOpen(false);
      // history.push("/app/services");
    });
  };

  const handleChangeCurrentAddress = (address1) => {
    getGeoCode(address1);
    setCurrentAddress(address1);
  };

  const getGeoCode = (address) => {
    Geocode.setApiKey("AIzaSyBFFWZ4wfma-C1cetq_FNF5OOIDOY21WG4");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        setlocationCoordinates_lat(lat);
        setlocationCoordinates_lng(lng);
      },
      (error) => {
        console.log("res", address, error);
      }
    );
  };
  const setAddressbySuggestion = (suggestion) => {
    console.log("suggestion", suggestion);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.center}>
        <Typography
          component="h3"
          variant="h3"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Edit Profile
        </Typography>
      </Grid>
      <Grid container className={classes.center}>
        <Grid item xs={12} sm={2} md={2} lg={2}>
          <div style={{ position: "relative" }} className={classes.center}>
            <div>
              <Avatar
                alt="Remy Sharp"
                src={profilePic}
                className={classes.large}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 70,
              }}
            >
              <div>
                <Avatar className={classes.deepPurple}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera
                        style={{ color: "white", marginTop: "9px" }}
                      />
                    </IconButton>
                  </label>
                </Avatar>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login100-form validate-form"
          >
            <Grid
              container
              className={classes.center}
              spacing={2}
              style={{ marginTop: "15px" }}
            >
              <Grid item xs={12}>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  Contact Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputLabel>Name</InputLabel>
                <TextField
                  name="fullName"
                  type="text"
                  fullWidth
                  inputRef={register({ required: true })}
                  error={errors.fullName}
                  helperText={errors.fullName && "Required"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputLabel>Email</InputLabel>

                <TextField
                  name="email"
                  type="text"
                  fullWidth
                  inputRef={register({ required: true, pattern: emailRegEx })}
                  error={errors.email}
                  helperText={errors.email && "Enter Valid Email"}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputLabel>Contact No.</InputLabel>

                <TextField
                  name="phone"
                  type="text"
                  fullWidth
                  inputRef={register({ required: true, pattern: phoneRegExp })}
                  error={errors.phone}
                  helperText={errors.phone && "Enter Valid phone No"}
                />
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.center}
              spacing={2}
              style={{ marginTop: "15px" }}
            >
              {/* <Grid item xs={12} sm={12} md={6}>
                <InputLabel>From</InputLabel>

                <PlacesAutocomplete
                  value={address}
                  onChange={handleChangeAddress}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <TextField
                        name="from"
                        type="text"
                        placeholder="Address"
                        fullWidth
                        {...getInputProps({
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {suggestions?.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? { backgroundColor: "#bdbdbd", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              onClick={() => setAddressbySuggestion(suggestion)}
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span
                                onClick={() =>
                                  setAddressbySuggestion(suggestion)
                                }
                              >
                                {suggestion.description}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Grid>
             
              */}
              <Grid item xs={12} sm={12} md={12}>
                <InputLabel>Location</InputLabel>

                <PlacesAutocomplete
                  value={currentAddress}
                  onChange={handleChangeCurrentAddress}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <TextField
                        name="living"
                        type="text"
                        placeholder="Current Location"
                        fullWidth
                        {...getInputProps({
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {suggestions?.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? { backgroundColor: "#bdbdbd", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              onClick={() => setAddressbySuggestion(suggestion)}
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span
                                onClick={() =>
                                  setAddressbySuggestion(suggestion)
                                }
                              >
                                {suggestion.description}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12}>
                <InputLabel>Address</InputLabel>

                <TextField
                  name="address"
                  type="text"
                  fullWidth
                  inputRef={register({ required: true })}
                  error={errors.address}
                  helperText={errors.address && "Required"}
                />
              </Grid> */}
            </Grid>

            {/* <Grid
              container
              className={classes.center}
              spacing={2}
              style={{ marginTop: "15px" }}
            >
              <Grid item xs={12}>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  Interests
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple={true}
                  disabled={false}
                  options={interestOptions}
                  filterSelectedOptions
                  value={selectedInterests}
                  getOptionLabel={(option) =>
                    option.value ? option.value : ""
                  }
                  onChange={(e, options) => {
                    setSelectedInterests(options);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      variant="outlined"
                      name={"interests"}
                      //   inputRef={register({ required: true })}
                      helperText={errors.interests && errors.interests}
                      error={Boolean(errors.interests)}
                      placeholder={"Interests"}
                    />
                  )}
                />
              </Grid>
            </Grid> */}
            <Grid
              container
              className={classes.center}
              spacing={2}
              style={{ marginTop: "15px" }}
            >
              <Grid item xs={12}>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  Services
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <Autocomplete
                  multiple={true}
                  disabled={false}
                  options={allServices}
                  filterSelectedOptions
                  value={selectedServices}
                  getOptionLabel={(option) =>
                    option.value ? option.value : ""
                  }
                  onChange={(e, options) => {
                    setSelectedServices(options);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      variant="outlined"
                      name={"services"}
                      //   inputRef={register({ required: true })}
                      helperText={errors.services && errors.services}
                      error={Boolean(errors.services)}
                      placeholder={"Services"}
                    />
                  )}
                /> */}

                {selectedServices?.map((item, index) => (
                  <Chip
                    label={item.title}
                    key={index}
                    color="primary"
                    className={classes.deepPurple}
                    style={{ margin: "0.5rem" }}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.end}
              spacing={2}
              style={{ marginTop: "15px" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.deepPurple}
              >
                Save
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleClose}
        style={{ zIndex: 1000 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
export default EditProfile;
