import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Logo from "./Logo";
export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
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
          <a className="nav-link scrollto" href="/#about">
            About
          </a>
        </ListItem>

        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/#services">
            Services
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/#portfolio">
            Portfolio
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/#team">
            Team
          </a>
        </ListItem>
        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/blogs">
            Blog
          </a>
        </ListItem>

        <ListItem button className={classes.items}>
          <a className="nav-link scrollto" href="/#contact">
            Contact
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

  const [headerColor, setHeaderColor] = useState("transparent");
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
    AOS.init();

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
      <Helmet title={seo?.seo_title} titleTemplate={seo?.seo_title}>
        <meta name="description" content={seo?.seo_description} />
        {/* <script>{AOS.init()}</script>; */}
        <meta
          name="image"
          content={`http://ec2-3-85-141-32.compute-1.amazonaws.com${seo?.seo_image?.publicURL}`}
        />
        {seo?.seo_title && (
          <meta property="og:title" content={seo?.seo_title} />
        )}
        {seo?.seo_description && (
          <meta property="og:description" content={seo?.seo_description} />
        )}
        {seo?.seo_description && (
          <meta name="twitter:card" content={seo?.seo_description} />
        )}
        {seo?.seo_image && (
          <meta
            property="og:image"
            itemprop="image"
            content={`http://ec2-3-85-141-32.compute-1.amazonaws.com${seo?.seo_image.publicURL}`}
          />
        )}
        {seo?.seo_image && <link rel="icon" href="/favicon.ico" />}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />
        {/* <link
          href="/fonts/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        /> */}
        <link
          href="/fonts/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        {/* <link href="/fonts/vendor/remixicon/remixicon.css" rel="stylesheet" />
        <link
          href="/fonts/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />
        <link
          href="/fonts/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        /> */}
        {/* <script src="/fonts/vendor/bootstrap/js/bootstrap.bundle.js"></script> */}

        {/* <script src="/fonts/vendor/php-email-form/validate.js"></script>
        <script src="/fonts/vendor/swiper/swiper-bundle.min.js"></script> */}
        <script src="/fonts/vendor/purecounter/purecounter.js"></script>
        {/* <script src="/fonts/vendor/isotope-layout/isotope.pkgd.min.js"></script>
        <script src="/fonts/vendor/glightbox/js/glightbox.min.js"></script> */}
      </Helmet>
      <header
        id="header"
        className="header fixed-top"
        style={{
          background: headerColor,

          padding: "15px 0",
          boxShadow: headerBoxShadow,
        }}
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Logo />
          {/* <a href="/" className="logo d-flex align-items-center">
            <img src={data?.logo?.publicURL} alt="" />
            <span style={{ fontSize: isMobile && "16px" }}>
              Global Software Consulting
            </span>
          </a> */}

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto" href="/#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/#services">
                  Services
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/#portfolio">
                  Portfolio
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/#team">
                  Team
                </a>
              </li>
              {/* <li>
                <a href="/blogs">Blog</a>
              </li> */}
              {/* <li className="dropdown">
                <a href="#">
                  <span>Drop Down</span> <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="#">Drop Down 1</a>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Drop Down</span>{" "}
                      <i className="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Deep Drop Down 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Drop Down 2</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li>
                </ul>
              </li>
             */}
              <li>
                <a className="nav-link scrollto" href="/#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="getstarted scrollto" href="/contact-us">
                  Get Started
                </a>
              </li>
            </ul>
            <i
              className="bi bi-list mobile-nav-toggle"
              onClick={() => toggleDrawer("right", true)}
            ></i>
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
