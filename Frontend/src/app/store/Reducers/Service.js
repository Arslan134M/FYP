import { GET_ALL_SERVICES } from "../types";
// initial state
const initialState = {
  AllServices: null,
};
// handle actions
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_ALL_SERVICES: {
        console.log("payload", payload);
        return {
          ...state,
          AllServices: payload,
        };
      }
  
      default:
        return state;
    }
  }