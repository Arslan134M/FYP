import { AGE } from "../types";
// initial state
const initialState = {
  isAuthenticated: null,
  user: {},
  loader: false,
  token: null,
  role: null,
  age:null
};

// handle actions
export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("loading", type);
  switch (type) {
    case AGE:{
      return {
        ...state,
        age:payload
      }
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
      return state;
  }
}
