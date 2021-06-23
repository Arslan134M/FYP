import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Geocode from "react-geocode";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextField from "@material-ui/core/TextField";

const SearchModel = () => {
  const [value, setValue] = useState("");
  const searching = () => {};

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
        // this.setState({
        //   locationCoordinates_lat: lat,
        //   locationCoordinates_lng: lng,
        // });
      },
      (error) => {
        console.error(address, error);
      }
    );
  };

  /*  Description: Handle input Address/Search Area
   *   input: Address
   */
  const handleChangeAddress = (address) => {
    getGeoCode(address);
    setValue(address);
    // this.setState({ address: address, null_address: false });
  };

  const handleSelect = (address) => {
    setValue(address);
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

  return (
    <div className=" ml-3 p-0 ">
      <div className=" m-0 p-0 ">
        <div className="my-2 m-0 p-0 ">
          <PlacesAutocomplete
            value={value}
            onChange={handleChangeAddress}
            onSelect={handleSelect}
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
        </div>
      </div>
    </div>
  );
};

export default SearchModel;
