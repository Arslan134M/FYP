import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./app/store/store";
// require("dotenv").config();

ReactDOM.render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
      <App />
  </Provider>
  </PersistGate>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
