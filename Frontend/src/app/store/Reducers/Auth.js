import { LOGIN } from "../types";
import { interests, services } from "./data";
// initial state
const initialState = {
  isAuthenticated: null,
  user: {},
  loader: false,
  token: null,
  role: null,
  name: null,
  configs: { interests, services },
};

// handle actions
export default function (state = initialState, action) {
  //same
  const { type, payload } = action; //same

  switch (type) {
    case LOGIN: {
      console.log(payload)
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("userId", payload.id);
      return {
        ...state,
        user: payload,
      };
    }
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loader: false,
      };

    // case LOG_OUT:
    //   return {
    //     isAuthenticated: false,
    //     user: null,
    //     loader: false,
    //     token: null,
    //     role: null,
    //   };

    default:
      return { ...state };
  }
}
