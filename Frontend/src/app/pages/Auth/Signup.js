import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { signup } from "../../store/Actions/Home/Home";

import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PlacesAutocomplete from "react-places-autocomplete";
import Geocode from "react-geocode";
function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState(null);
  var emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleSwitch(data?.name, data?.email, data?.password, address);
  };
  const handleSwitchPageFront = () => {
    history.push("/login");
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSwitch = async (name, email, password, address) => {
    let obj = {
      username: email.split("@")[0],
      fullName: name,
      email: email,
      password: password,
      location: {
        type: "Point",
        coordinates: [lat, lng],
        address: address,
      },
      status: "avaiable",
      rating: "",
      ratingCounter: "",
      donation: [],
      service: [],
      working_history: [],
      roles: ["user"],
    };

    let res = await dispatch(signup({ user: { ...obj } }));
    console.log("response signup user", res);
    if (res?.status === 200) {
      history.push("/app/features");
    }
  };

  useEffect(() => {
    dispatch({ type: "LOGIN_SUCCESS" });
  }, []);
  const handleSwitchPage = () => {
    history.push("/");
  };
  const getGeoCode = (address) => {
    Geocode.setApiKey("AIzaSyBFFWZ4wfma-C1cetq_FNF5OOIDOY21WG4");

    Geocode.setLanguage("en");

    Geocode.setRegion("es");

    Geocode.enableDebug();
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        // this.setState({ locationCoordinates_lat: lat, locationCoordinates_lng: lng })
      },
      (error) => {
        console.error(address, error);
      }
    );
  };
  const handleChangeAddress = (address1) => {
    console.log("address", address1);
    getGeoCode(address);
    setAddress(address1);
    // this.setState({ address: address, null_address: false });
  };
  const setAddressbySuggestion = (suggestion) => {
    console.log("suggestion", suggestion);
    getGeoCode(suggestion.description);
    // this.setState({ address: suggestion.description })
  };
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              className="login100-form validate-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <span className="login100-form-title p-b-48">
                <img src={Logo} style={{ width: "120px", height: "120px" }} />
              </span>

              <TextField
                type="text"
                label="Name"
                name="name"
                fullWidth
                inputRef={register({ required: true })}
                error={errors.name}
                helperText={errors.name && "Enter Your Name"}
              />

              <TextField
                type="text"
                label="Email"
                name="email"
                style={{ marginTop: "10px" }}
                fullWidth
                inputRef={register({ required: true, pattern: emailRegEx })}
                error={errors.email}
                helperText={errors.email && "Enter Valid Email"}
              />

              <TextField
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                error={errors.password}
                helperText={errors.password && "Enter Password"}
                label={"Password"}
                style={{ marginTop: "10px" }}
                // onChange={handleSetPassword}
                error={errors?.password}
                helperText={errors?.password ? "Field Require" : ""}
                inputRef={register({ required: true })}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
                      label="Address"
                      type="text"
                      placeholder="Address"
                      fullWidth
                      // error={this.state.null_address}
                      // helperText={
                      //   this.state.null_address ? "Field Require" : ""
                      // }
                      {...getInputProps({
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {/* {loading && <div>Loading...</div>} */}
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
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button
                    // onClick={() => handleSwitchPageFront()}
                    type="submit"
                    className="login100-form-btn"
                  >
                    Signup
                  </button>
                </div>
              </div>

              <div
                className="text-center p-t-115"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                <p className="txt1">Already have an account?</p>

                <span
                  className="txt2"
                  style={{ cursor: "pointer" }}
                  type="submit"
                  onClick={() => handleSwitchPageFront()}
                >
                  Login
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
