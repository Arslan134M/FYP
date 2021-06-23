import React, { Component } from "react";

import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { data } from "./data";

const MarkerClustererExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap defaultZoom={14} defaultCenter={{ lat: 31.5204, lng: 74.3587 }}>
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
      {props.markers.map((marker) => (
        <Marker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          key={marker.photo_id}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

export default class MarkerClustererExample extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
    };
  }

  componentDidMount() {
    // fetch(
    //   `https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    this.setState({ markers: data.photos });
    //   });
  }

  render() {
    return (
      <>
        <MarkerClustererExampleGoogleMap
          containerElement={
            <div className="embed-responsive embed-responsive-21by9" />
          }
          mapElement={
            <div
              className="embed-responsive-item"
              style={{ minWidth: "100vw", minHeight: "60vh" }}
            />
          }
          markers={this.state.markers}
        />
      </>
    );
  }
}

// import React, { Component } from "react";
// import { GoogleMap, withGoogleMap } from "react-google-maps";
// import marker from "../../assets/marker.png";
// import { connect } from "react-redux";
// // import {
// //   searchUsers,
// //   searchUsersByLocation,
// //   searchUsersByLoc,
// // } from "actions/SearchActions";
// // import SearchModel from "./SearchModel";
// import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
// // import { API_BASE_URL } from "constants/Config";
// // import AlertDialog from "components/AlertDailog/AlertDailog";
// // import { setRoutePath, redirected } from "actions/SearchActions";
// // import { SEARCH_ROUTE } from "constants/ActionTypes";
// import { Redirect } from "react-router-dom";
// // import Search from "../Search/Index";

// const markerStyling = {
//   clear: "both",
//   display: "inline-block",
//   fontWeight: "500",
//   color: "",
//   padding: "8px 16px",
//   whiteSpace: "nowrap",
//   width: "172px",
//   textAlign: "center",
// };

// console.log(window.google);
// const google = window.google;
// const MyMapComponent = withGoogleMap((props) => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     {/* {console.log("marker=========>", props)}
//     {props.markers.map((marker, index) => (
//       <MarkerWithLabel
//         key={index}
//         position={marker.position}
//         labelAnchor={new google.maps.Point(75, 90)}
//         labelStyle={markerStyling}
//         icon={props.picture}
//         onClick={() => props.onMarkerClick(marker)}
//       >
//         <div>
//            to set users profile image on marker
//           <p>
//             {" "}
//             paragraph tag is used to set profle image position on marker{" "}
//           </p>
//           <br></br>
//           marker.p is used if user has uploaded profile pic or not
//           {!marker.p ? (
//             <img
//               width="23rem"
//               alt="..."
//               className="mr-4"
//               style={{ borderRadius: "50%" }}
//               height="25rem"
//               src={marker.profile_image}
//             ></img>
//           ) : (
//             ""
//           )}
//         </div>
//       </MarkerWithLabel>
//     ))} */}
//   </GoogleMap>
// ));

// class MapPopupInfo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       center: {
//         //TODO: set sydney map
//         lat: 44.5204,
//         lng: 44.3587,
//         zoom: 15,
//         content: `Change the zoom level`,
//       },
//       content: `Change the zoom level`,

//       hideSearch: false,
//       openDialoge: false,
//       countUsers: 0,
//       goToProfile: false,
//       id: "",
//       markers: [],
//       showList: false,
//     };
//   }
//   handleMarkerClick = this.handleMarkerClick.bind(this);
//   handleMarkerClose = this.handleMarkerClose.bind(this);
//   handleMarkerClick(targetMarker) {
//     this.setState({
//       markers: this.state.markers.map((marker) => {
//         if (marker === targetMarker) {
//           this.setState({ goToProfile: true, id: targetMarker.id });
//           return {
//             ...marker,
//             showInfo: true,
//           };
//         }
//         return marker;
//       }),
//     });
//   }

//   handleMarkerClose(targetMarker) {
//     this.setState({
//       markers: this.state.markers.map((marker) => {
//         if (marker === targetMarker) {
//           return {
//             ...marker,
//             showInfo: false,
//           };
//         }
//         return marker;
//       }),
//     });
//   }

//   handleMapMounted = this.handleMapMounted.bind(this);
//   handleZoomChanged = this.handleZoomChanged.bind(this);

//   handleMapMounted(map) {
//     this._map = map;
//   }

//   handleZoomChanged() {
//     const nextZoom = this._map.getZoom();
//     if (nextZoom !== this.state.zoom) {
//       this.setState({
//         zoom: nextZoom,
//         content: `Zoom: ${nextZoom}`,
//       });
//     }
//   }
//   //   componentDidMount() {
//   //     this.props.setRoutePath(SEARCH_ROUTE);
//   //     this.props &&
//   //       this.props.user &&
//   //       this.props.user.workLocation &&
//   //       this.props.user.workLocation.coordinates &&
//   //       //    this.props.searchUsersByLoc( {
//   //       //    "x-coordinate":this.props.user.workLocation.coordinates[0],
//   //       //    "y-coordinate":this.props.user.workLocation.coordinates[1],
//   //       //    "radius-in-miles":100
//   //       //  })
//   //       this.props &&
//   //       this.props.user &&
//   //       this.props.user.workLocation &&
//   //       this.props.user.workLocation.coordinates &&
//   //       this.setState({
//   //         center: {
//   //           lat: parseFloat(this.props.user.workLocation.coordinates[1]),
//   //           lng: parseFloat(this.props.user.workLocation.coordinates[0]),
//   //         },
//   //       });
//   //     this.props.user &&
//   //       this.props.user.workLocation &&
//   //       this.props.user.workLocation.coordinates &&
//   //       this.setState({
//   //         markers: [
//   //           {
//   //             id: this.props.user.id,
//   //             position: new google.maps.LatLng(
//   //               parseFloat(this.props.user.workLocation.coordinates[1]),
//   //               parseFloat(this.props.user.workLocation.coordinates[0])
//   //             ),
//   //             showInfo: false,
//   //             p: this.props.user.profile_image === "",
//   //             profile_image: `${API_BASE_URL}containers/profilephotosplayer/download/${this.props.user.profile_image}?access_token=${this.props.token}`,
//   //             infoContent: (
//   //               <div className="d-flex">
//   //                 <div>
//   //                   <svg
//   //                     id="Layer_1"
//   //                     xmlns="http://www.w3.org/2000/svg"
//   //                     width="16"
//   //                     height="16"
//   //                     viewBox="0 0 16 16"
//   //                   >
//   //                     <path
//   //                       d="M6 14.5c0 .828-.672 1.5-1.5 1.5S3 15.328 3 14.5 3.672
//   //                     13 4.5 13s1.5.672 1.5 1.5zM16 14.5c0 .828-.672 1.5-1.5
//   //                     1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM16
//   //                     8V2H4c0-.552-.448-1-1-1H0v1h2l.75 6.438C2.294 8.805 2 9.368
//   //                     2 10c0 1.105.895 2 2 2h12v-1H4c-.552 0-1-.448-1-1v-.01L16 8z"
//   //                     />
//   //                   </svg>
//   //                 </div>
//   //                 <div className="ml-1"></div>
//   //               </div>
//   //             ),
//   //           },
//   //         ],
//   //       });
//   //     if (this.props.match.params && this.props.match.params.id !== undefined) {
//   //       const arr = this.props.match.params.id.split(",");
//   //       this.setState({
//   //         center: {
//   //           lat: parseFloat(arr[1]),
//   //           lng: parseFloat(arr[0]),
//   //         },
//   //       });
//   //       //   this.props.searchUsersByLocation({
//   //       //     "x-coordinate": parseFloat(arr[0]),
//   //       //     "y-coordinate": parseFloat(arr[1]),
//   //       //     "radius-in-miles": 20,
//   //       //   });
//   //     }
//   //   }
//   componentDidMount() {
//     const arr = [];
//     const obj = {
//       id: Math.random() * (200 - 90) + 90,
//       // eslint-disable-next-line
//       position: new google.maps.LatLng(17.470493, 47.867077),
//       showInfo: false,
//       p: false,
//       complete_name: "Abid",
//       profile_image: `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`,
//       infoContent: (
//         <div className="d-flex">
//           <div>
//             <svg
//               id="Layer_1"
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 16 16"
//             >
//               <path
//                 d="M6 14.5c0 .828-.672 1.5-1.5 1.5S3 15.328 3 14.5 3.672
//                       13 4.5 13s1.5.672 1.5 1.5zM16 14.5c0 .828-.672 1.5-1.5
//                       1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM16
//                       8V2H4c0-.552-.448-1-1-1H0v1h2l.75 6.438C2.294 8.805 2 9.368
//                       2 10c0 1.105.895 2 2 2h12v-1H4c-.552 0-1-.448-1-1v-.01L16 8z"
//               />
//             </svg>
//           </div>
//           {/* <div className="ml-1">
//                 <p>{`${u.complete_name}`}</p>
//                 <p>{u.contact_number}</p>
//                 <p>{u.address}</p>
//               </div> */}
//         </div>
//       ),
//     };
//     arr.push(obj);

//     this.setState({ markers: arr });
//   }
//   //   componentDidUpdate(prevProps, prevState) {
//   //     const arr = [];
//   //     const obj = {
//   //       id: Math.random() * (200 - 90) + 90,
//   //       position: new google.maps.LatLng(17.470493, 47.867077),
//   //       showInfo: false,
//   //       p: false,
//   //       complete_name: "Abid",
//   //       profile_image: `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`,
//   //       infoContent: (
//   //         <div className="d-flex">
//   //           <div>
//   //             <svg
//   //               id="Layer_1"
//   //               xmlns="http://www.w3.org/2000/svg"
//   //               width="16"
//   //               height="16"
//   //               viewBox="0 0 16 16"
//   //             >
//   //               <path
//   //                 d="M6 14.5c0 .828-.672 1.5-1.5 1.5S3 15.328 3 14.5 3.672
//   //                       13 4.5 13s1.5.672 1.5 1.5zM16 14.5c0 .828-.672 1.5-1.5
//   //                       1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM16
//   //                       8V2H4c0-.552-.448-1-1-1H0v1h2l.75 6.438C2.294 8.805 2 9.368
//   //                       2 10c0 1.105.895 2 2 2h12v-1H4c-.552 0-1-.448-1-1v-.01L16 8z"
//   //               />
//   //             </svg>
//   //           </div>
//   //           {/* <div className="ml-1">
//   //                 <p>{`${u.complete_name}`}</p>
//   //                 <p>{u.contact_number}</p>
//   //                 <p>{u.address}</p>
//   //               </div> */}
//   //         </div>
//   //       ),
//   //     };
//   //     arr.push(obj);

//   //     this.setState({ markers: arr });
//   //     if (this.props.red && this.props.users.length > 0) {
//   //     } else if (this.props.searchedUsers !== prevProps.searchedUsers) {
//   //       const arr = [];
//   //       this.props.searchedUsers &&
//   //         this.props.searchedUsers.map((u) => {
//   //           const obj = {
//   //             id: u._id,
//   //             position: new google.maps.LatLng(
//   //               u.workLocation.coordinates[1],
//   //               u.workLocation.coordinates[0]
//   //             ),
//   //             showInfo: false,
//   //             p: u.profile_image === "",
//   //             complete_name: u.complete_name,
//   //             profile_image: `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`,
//   //             infoContent: (
//   //               <div className="d-flex">
//   //                 <div>
//   //                   <svg
//   //                     id="Layer_1"
//   //                     xmlns="http://www.w3.org/2000/svg"
//   //                     width="16"
//   //                     height="16"
//   //                     viewBox="0 0 16 16"
//   //                   >
//   //                     <path
//   //                       d="M6 14.5c0 .828-.672 1.5-1.5 1.5S3 15.328 3 14.5 3.672
//   //                         13 4.5 13s1.5.672 1.5 1.5zM16 14.5c0 .828-.672 1.5-1.5
//   //                         1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM16
//   //                         8V2H4c0-.552-.448-1-1-1H0v1h2l.75 6.438C2.294 8.805 2 9.368
//   //                         2 10c0 1.105.895 2 2 2h12v-1H4c-.552 0-1-.448-1-1v-.01L16 8z"
//   //                     />
//   //                   </svg>
//   //                 </div>
//   //                 <div className="ml-1">
//   //                   <p>{`${u.complete_name}`}</p>
//   //                   <p>{u.contact_number}</p>
//   //                   <p>{u.address}</p>
//   //                 </div>
//   //               </div>
//   //             ),
//   //           };
//   //           arr.push(obj);
//   //           return "";
//   //         });
//   //       this.setState({ markers: arr });
//   //     }
//   //     if (this.props.avaliableUsers !== prevProps.avaliableUsers) {
//   //       const arr = [];
//   //       if (
//   //         this.props &&
//   //         this.props.avaliableUsers &&
//   //         this.props.avaliableUsers.length >= 0
//   //       ) {
//   //         this.setState({
//   //           openDialoge: true,
//   //           countUsers: this.props.avaliableUsers.length,
//   //         });
//   //       }
//   //       this.props.searchPoints &&
//   //         this.setState({
//   //           center: {
//   //             lat: this.props.searchPoints["y-coordinate"],
//   //             lng: this.props.searchPoints["x-coordinate"],
//   //           },
//   //         });
//   //       this.props.avaliableUsers &&
//   //         this.props.avaliableUsers.map((u) => {
//   //           if (u && u.user !== undefined) {
//   //             const obj = {
//   //               id: u.user.id,
//   //               p: u.user.profile_image === "",
//   //               position: new google.maps.LatLng(
//   //                 u.goal.location.coordinates[1],
//   //                 u.goal.location.coordinates[0]
//   //               ),
//   //               showInfo: false,
//   //               profile_image: `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`,
//   //               infoContent: (
//   //                 <div className="d-flex">
//   //                   <div>
//   //                     <svg
//   //                       id="Layer_1"
//   //                       xmlns="http://www.w3.org/2000/svg"
//   //                       width="16"
//   //                       height="16"
//   //                       viewBox="0 0 16 16"
//   //                     >
//   //                       <path
//   //                         d="M6 14.5c0 .828-.672 1.5-1.5 1.5S3 15.328 3 14.5 3.672
//   //                  13 4.5 13s1.5.672 1.5 1.5zM16 14.5c0 .828-.672 1.5-1.5
//   //                  1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM16
//   //                  8V2H4c0-.552-.448-1-1-1H0v1h2l.75 6.438C2.294 8.805 2 9.368
//   //                  2 10c0 1.105.895 2 2 2h12v-1H4c-.552 0-1-.448-1-1v-.01L16 8z"
//   //                       />
//   //                     </svg>
//   //                   </div>
//   //                   <div className="ml-1">
//   //                     <p>{`${u.user.complete_name}`}</p>
//   //                     <p>{u.user.contact_number}</p>
//   //                     <p>{u.user.address}</p>
//   //                   </div>
//   //                 </div>
//   //               ),
//   //             };
//   //             arr.push(obj);
//   //           } else {
//   //             const obj = {
//   //               id: u._id,
//   //               p: u.profile_image === "",
//   //               position: new google.maps.LatLng(
//   //                 u.workLocation.coordinates[1],
//   //                 u.workLocation.coordinates[0]
//   //               ),
//   //               showInfo: false,
//   //               profile_image: `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`,
//   //               infoContent: (
//   //                 <div className="d-flex">
//   //                   <div>
//   //                     <svg
//   //                       id="Layer_1"
//   //                       xmlns="http://www.w3.org/2000/svg"
//   //                       width="16"
//   //                       height="16"
//   //                       viewBox="0 0 16 16"
//   //                     >
//   //                       <path d="M6 14.5c0 .828-.672 1.5-1.5 1.5S3 15.328 3 14.5 3.672  13 4.5 13s1.5.672 1.5 1.5zM16 14.5c0 .828-.672 1.5-1.5   1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM16   8V2H4c0-.552-.448-1-1-1H0v1h2l.75 6.438C2.294 8.805 2 9.368 2 10c0 1.105.895 2 2 2h12v-1H4c-.552 0-1-.448-1-1v-.01L16 8z" />
//   //                     </svg>
//   //                   </div>
//   //                   <div className="ml-1">
//   //                     <p>{`${u.complete_name}`}</p>
//   //                     <p>{u.contact_number}</p>
//   //                     <p>{u.address}</p>
//   //                   </div>
//   //                 </div>
//   //               ),
//   //             };
//   //             arr.push(obj);
//   //           }
//   //           return "";
//   //         });
//   //       this.setState({ markers: arr });
//   //     }
//   //     if (this.props.red) {
//   //       this.props.redirected(false);
//   //     }
//   //   }

//   showList = (n) => {
//     this.setState({ showList: n });
//   };
//   render() {
//     const { hideSearch, openDialoge, countUsers, showList } = this.state;

//     return (
//       <div>
//         {console.log("sds")}
//         <p>
//           {" "}
//           qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq qq
//           qq qq qq qq qq qq qq qq qq
//         </p>
//         <GoogleMap defaultZoom={8}></GoogleMap>
//       </div>
//     );
//   }
// }

// export default MapPopupInfo;
// import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33,
//     },
//     zoom: 11,
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: "100vh", width: "100%" }}>
//         <GoogleMapReact
//           //   bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default SimpleMap;
