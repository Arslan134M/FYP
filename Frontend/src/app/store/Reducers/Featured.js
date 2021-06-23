import { GET_ALL_FEATURES } from "../types";
// initial state
const initialState = {
  AllFeatures: null,
};

// handle actions
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_FEATURES: {
      return {
        ...state,
        AllFeatures: payload,
      };
    }

    default:
      return state;
  }
}
