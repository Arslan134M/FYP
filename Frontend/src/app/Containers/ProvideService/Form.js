import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Auth/login.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {InputLabel} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Mapwithmarker from "./mapwithmarker";
import Geocode from "react-geocode";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getAllServices } from "../../store/Actions/Services/Services";
import { addServiceToUser } from "../../store/Actions/Users/Users";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
      fontFamily: "Poppins-Regular",
    },
  },
  deepPurple: {
    backgroundColor: deepPurple[500],
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
function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedService, setSelectedService] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setSelectedService(event.target.value);
  };
  const [locationCoordinates_lat, setlocationCoordinates_lat] =
    useState(31.5204);
  const [locationCoordinates_lng, setlocationCoordinates_lng] =
    useState(74.3587);
  const classes = useStyles();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentAddress, setCurrentAddress] = useState([]);
  const [address, setAddress] = useState("");

  const configs = useSelector((state) => state.auth.configs);
  const allServices = useSelector((state) => state.service?.AllServices  );
  const interestOptions = configs?.interests;
  // const allServices = configs.services;
console.log("allServices",allServices)
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    dispatch(getAllServices())
  }, []);
  const handleFileChange = (e) => {
    console.log(e.target.files);
    console.log(e.target.files[0]);
    //upload pic and set here
  };
  // const onSubmit = (data) => {
  //   console.log({ data, selectedServices, currentAddress, address });
  //   //save data
  //   // history.push("/profile");
  // };
  const handleChangeAddress = (address1) => {
    setAddress(address1);
    getGeoCode(address1)
  };
  
  const getGeoCode = (address) => {
    Geocode.setApiKey("AIzaSyBFFWZ4wfma-C1cetq_FNF5OOIDOY21WG4");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // set staate
        console.log("response.results[0].geometry.location", lat, lng);

        setlocationCoordinates_lat(lat);
        setlocationCoordinates_lng(lng);
      },
      (error) => {
        console.log("res",address, error);
        // console.error(address, error);
      }
    );
  };
  const handleChangeCurrentAddress = (address1) => {
    setCurrentAddress(address1);
  };
  const setAddressbySuggestion = (suggestion) => {
    console.log("suggestion", suggestion);
    // getGeoCode()
    getGeoCode(suggestion.description)
    // this.setState({ address: suggestion.description })
  };

  const addServiceData=async ()=>{
    setLoading(true)
    let obj={
      "location": {
        "type": "Point"
        ,
        "coordinates": [locationCoordinates_lng, locationCoordinates_lat],
        "address":address
      },
      id:selectedService
    }
    
    let res=await dispatch(addServiceToUser(obj))
    setLoading(false)
    if(res?.status===200){
      history.push("/app/profile-edit")
    }
  }
  console.log({ errors });
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.center}>
        <Typography
          component="h4"
          variant="h4"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Select Service
        </Typography>
      </Grid>
      <Grid container className={classes.center}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedService}
              fullWidth
              onChange={handleChange}
            >{allServices&&allServices.map((item)=>{
              return <MenuItem value={item?._id}>{item?.title}</MenuItem>

            })}
            </Select>
          </FormControl>
          <div
            className="login100-form validate-form"
          >
            <Grid
              container
              className={classes.center}
              spacing={2}
              style={{ marginTop: "15px" }}
            >
            
              <Grid item xs={12} sm={12} md={12}>
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
                        label="Select Address"
                        name="from"
                        type="text"
                        placeholder="Select Address"
                        fullWidth
                        {...getInputProps({
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {suggestions.map((suggestion) => {
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
              {locationCoordinates_lat&&<Mapwithmarker
                lat={locationCoordinates_lat}
                lng={locationCoordinates_lng}
              />}
            </Grid>
            <Grid
              container
              className={classes.end}
              spacing={2}
              style={{ marginTop: "15px" }}
            >
              <Button variant="contained" color="primary" onClick={addServiceData}>
                Save
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default EditProfile;
