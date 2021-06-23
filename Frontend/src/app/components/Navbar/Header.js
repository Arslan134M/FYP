import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
// import { Helmet } from "react-helmet";
import "./style.css";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import MenuIcon from "@material-ui/icons/Menu";
import LogoIcon from "../../assets/logo-secondary.png";
import {useHistory} from "react-router-dom"
export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const { configData, seo } = props;
  let data = configData && configData.nodes[0];
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => {
    console.log("calling ");
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }

    setState({ ...state, [anchor]: open });
  };
const handleLogout=()=>{
  localStorage.removeItem("authenticated")
  localStorage.removeItem("userId")
  history.push("/login")

  
}
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
      onKeyDown={() => toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/app/profile-edit">
            Profile
          </a>
        </ListItem>

        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/app/serviceprovider">
            Services
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/app/features">
          Features
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/app/getservice">
          Get Service
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/app/requests">
            Requests
          </a>
        </ListItem>

        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/app/get-donation">
          Get Donation
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/app/give-donation">
          Give Donation
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/login"  onClick={handleLogout}>
        Logout
          </a>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const [headerColor, setHeaderColor] = useState("#f4f1f1");
  const [headerBoxShadow, setHeaderBoxShadow] = useState("none");

  const listenScrollEvent = (e) => {
    if (typeof window !== undefined) {
      // if (location?.pathname === "/") {
      if (window.scrollY > 5) {
        setHeaderColor("#fff");
        setHeaderBoxShadow("0px 2px 20px rgb(1 41 112 / 10%");
      } else {
        setHeaderColor("transparent");
        setHeaderBoxShadow("none");
      }
    }
  };
  useEffect(() => {
    // AOS.init();

    let unmounted = false;
    if (!unmounted) {
      window.addEventListener("scroll", (e) => {
        listenScrollEvent(e);
      });
    }
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <div className={classes.grow}>
      <header
        id="header"
        // className="header fixed-top"
        style={{
          background: headerColor,

          padding: " 0",
          boxShadow: headerBoxShadow,
          maxHeight: "100px",
        }}
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          {/* <Logo /> */}
          <a href="/" className="logo d-flex align-items-center">
            <img
              src={LogoIcon}
              alt=""
              style={{ height: "80px", width: "100px" }}
            />
          </a>
          {/* <a href="/" className="logo d-flex align-items-center">
            <img src={data?.logo?.publicURL} alt="" />
            <span style={{ fontSize: isMobile && "16px" }}>
              Global Software Consulting
            </span>
          </a> */}

          <nav id="navbar" className="navbar">
            <MenuIcon
              className="bi bi-list mobile-nav-toggle"
              onClick={() => toggleDrawer("right", true)}
            />

            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={() => toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </nav>
        </div>
      </header>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  menuItem: {
    margin: "0px",
    color: "#727273",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      backgroundColor: "#fff !important",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  items: {
    display: "flex",
    fontFamily: "Nunito, sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    color: "#013289",
    whiteSpace: "nowrap",
    transition: "0.3s",
  },
}));
