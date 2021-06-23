import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/UsersCard";
import { searchUsers } from "../../store/Actions/Users/Users";
import { getAllServices } from "../../store/Actions/Services/Services";

import PlacesAutocomplete from "react-places-autocomplete";
import Geocode from "react-geocode";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { InputLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
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

  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
}));
function Users() {
  const classes = useStyles();

  const history = useHistory();
  const allServices = useSelector((state) => state.service?.AllServices);

  let allusers = useSelector((state) => state?.users?.searchUsers);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(searchUsers());
  //   //component did mount with useEffect required empty array
  // }, []);
  const [selectedService, setSelectedService] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  const [locationCoordinates_lat, setlocationCoordinates_lat] =
    useState(31.5204);
  const [locationCoordinates_lng, setlocationCoordinates_lng] =
    useState(74.3587);
  const [value, setValue] = useState("");
  const searching = () => {};
  const coordinate = () => {};

  const getGeoCode = async (address) => {
    Geocode.setApiKey("AIzaSyBFFWZ4wfma-C1cetq_FNF5OOIDOY21WG4");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromAddress(address).then(
      async (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // set staate
        console.log("response.results[0].geometry.location", lat, lng);
        setlocationCoordinates_lat(lat);
        setlocationCoordinates_lng(lng);
      },
      (error) => {
        console.error(address, error);
      }
    );
  };
  const handleSearch = async () => {
    setLoading(true)
    await dispatch(
      searchUsers({
        service: selectedService,
        lat: locationCoordinates_lat,
        lng: locationCoordinates_lng,
      })
    );
    setSearched(true)
    setLoading(false)

  };
  /*  Description: Handle input Address/Search Area
   *   input: Address
   */
  const handleChangeAddress = (address) => {
    getGeoCode(address);
    setValue(address);
    // this.setState({ address: address, null_address: false });
  };

  const handleChange = (event) => {
    setSelectedService(event.target.value);
  };
  const handleSelect = (address) => {
    setValue(address);
    getGeoCode(address);
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0]);
      })
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  /*  Description: Handle Set Address from suggestion in state
   *   input: Address
   */
  const setAddressbySuggestion = (suggestion) => {
    setValue(suggestion.description);
    // tsetState({ address: suggestion.description });
    getGeoCode(suggestion.description);
  };
  useEffect(() => {

    dispatch(getAllServices());
  }, []);
  return (
    <div>
      <Grid container spacing={3} style={{ padding: "15px", margin: "0px",maxWidth:"100vw" }}>
        <Grid
          item
          xs={12}
          className="my-2 m-0 p-0  d-flex justify-content-center"
        >
          <FormControl
            style={{ minWidth: "200px",maxWidth:"300px" }}
            className={classes.formControl}
            fullWidth
          >
            <InputLabel id="demo-simple-select-label">
              Select Service
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedService}
              fullWidth
              onChange={handleChange}
            >
              {allServices &&
                allServices.map((item) => {
                  return <MenuItem value={item?._id}>{item?.title}</MenuItem>;
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          className="my-2 m-0 p-0  d-flex justify-content-center"
        >
          <PlacesAutocomplete
            value={value}
            onChange={handleChangeAddress}
            onSelect={handleSelect}
            style={{ minWidth: "200px",maxWidth:"300px" }}
            fullWidth
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <TextField
                  label="Address"
                  type="text"
                  placeholder="Address"
                  style={{ minWidth: "300px", maxWidth: "320px" }}
                  // error={this.state.null_address}
                  // helperText={
                  //   this.state.null_address ? "Field Require" : ""
                  // }
                  {...getInputProps({
                    className: "location-search-input",
                  })}
                />
                {/* auto complete suggestions */}
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#e0e0e0", cursor: "pointer" }
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
                          onClick={() => setAddressbySuggestion(suggestion)}
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
        <Grid
          item
          xs={12}
          className="my-2 my-2 m-0 p-0  d-flex justify-content-center"
        >
          <div
          style={{ minWidth: "300px",maxWidth:"300px" }}
          className="my-2 my-2 m-0 p-0  d-flex justify-content-end"
          >
        <Button onClick={handleSearch} style={{ maxHeight: "40px",
      
        background: "#926dde ",
        borderColor: "#926dde ",
        width: "95px",
        height: "40px",
    
      }}>
            Search
          </Button>
          </div>
          </Grid>
        
      
          {loading?<Grid container justify="center">
            <CircularProgress size={40} />
          </Grid>:
          searched===false?<Grid container justify="center">
<Typography> Select Service and Enter Loaction to search Users </Typography>

          </Grid>:
          allusers.length===0?<Grid container justify="center">
          <Typography> No User found in this Area </Typography>
          
                    </Grid>:
          allusers&& allusers.map((item) => {
            return <UserCard user={item} service={selectedService} />;
          })
        }
      </Grid>
    </div>
  );
}
export default Users;
