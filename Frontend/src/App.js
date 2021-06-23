import React, { useEffect } from "react";
import "./App.css";
import Routes from "./app/utils/CombineRoutes";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.common.notification);
  const user = useSelector((state) => state.auth);

  console.log({ user }, "========================");
  console.log({ notification });
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch({ type: "RESET_NOTIFICATION" });
      }, 6000);
    }
  }, [notification]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "RESET_NOTIFICATION" });
  };

  return (
    <>
      <Routes />

      {notification?.open && (
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default App;
