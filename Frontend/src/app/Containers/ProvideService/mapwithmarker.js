import React, { Component } from "react";
import { GoogleMap, withGoogleMap } from "react-google-maps";
import marker from "../../assets/marker.png";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { Redirect } from "react-router-dom";

const markerStyling = {
  clear: "both",
  display: "inline-block",
  fontWeight: "500",
  color: "",
  padding: "8px 16px",
  whiteSpace: "nowrap",
  width: "172px",
  textAlign: "center",
};

const google = window.google;
const MyMapComponent = withGoogleMap((props) => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
    defaultCenter={props.center}
    center={props.center}
    zoom={12}
  >
    {props.markers.map((marker, index) => (
      <MarkerWithLabel
        key={index}
        position={marker.position}
        labelAnchor={new google.maps.Point(75, 90)}
        labelStyle={markerStyling}
        icon={props.picture}
        onClick={() => props.onMarkerClick(marker)}
      >
        <div>
          {/* to set users profile image on marker */}
          <p>
            {" "}
            {/* paragraph tag is used to set profle image position on marker */}{" "}
          </p>
          <br></br>
          {/* marker.p is used if user has uploaded profile pic or not */}
          {!marker.p ? (
            <img
              width="23rem"
              alt="..."
              className="mr-4"
              style={{ borderRadius: "50%" }}
              height="25rem"
              src={marker.profile_image}
            ></img>
          ) : (
            ""
          )}
        </div>
      </MarkerWithLabel>
    ))}
  </GoogleMap>
));

class MapPopupInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 31.5204,
        lng: 74.3587,
        zoom: 15,
        content: `Change the zoom level`,
      },
  
      openDialoge: false,
      countUsers: 0,
      goToProfile: false,
      id: "",
      markers: [],
      showList: false,
    };
  }
 
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);
  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          this.setState({ goToProfile: true, id: targetMarker.id });
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  handleMapMounted = this.handleMapMounted.bind(this);
  handleZoomChanged = this.handleZoomChanged.bind(this);

  handleMapMounted(map) {
    this._map = map;
  }

  handleZoomChanged() {
    const nextZoom = this._map.getZoom();
    if (nextZoom !== this.state.zoom) {
      this.setState({
        zoom: nextZoom,
        content: `Zoom: ${nextZoom}`,
      });
    }
  }

  showList = (n) => {
    this.setState({ showList: n });
  };
  componentDidUpdate(preProps, preState) {
    if (preProps?.lat !== this.props?.lat) {
      console.log("props", this.props);
      this.setState({
        center: {
          lat: this.props.lat,
          lng: this.props.lng,
          zoom: 12,
          content: `Change the zoom level`,
        },
      });
    }
  }
  render() {
    const { hideSearch, openDialoge, countUsers, showList } = this.state;
    console.log("mapppp")
    return (
      <div className="row" style={{minHeight:"500px",minWidth:"500px"}}>
        <div
          className={`col-12 px-0 mx-0 col-sm-11 col-md-11 col-lg-11 col-xl-11`}
        >
          {/* kjahskdj */}
          {/* {this.state.markers !== "" || this.state.markers.length !== 0 ? ( */}
            <MyMapComponent
              picture={marker}
              key="map"
              containerElement={
                <div className="embed-responsive   embed-responsive-4by3 " />
              }
              onMapMounted={this.handleMapMounted}
              onZoomChanged={this.handleZoomChanged}
              zoom={this.state.zoom}
              content={this.state.content}
              mapElement={<div className="embed-responsive-item" />}
              center={this.state.center}
              markers={this.state.markers}
              onMarkerClick={this.handleMarkerClick}
            />
          {/* ) : (
            "No Users"
          )} */}
        </div>
      </div>
    );
  }
}

export default MapPopupInfo;
