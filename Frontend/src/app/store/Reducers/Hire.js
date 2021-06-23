import { GET_ALL_HIRES } from "../types";
// initial state
const initialState = {
  HireMe: null,
};

// handle actions
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_HIRES: {
      return {
        ...state,
        HireMe: payload,
      };
    }

    default:
      return state;
  }
}
