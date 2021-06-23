import { GET_ALL_USERS,GET_USER_DETAILS,SEARCH_USERS } from "../types";
// initial state
const initialState = {
  AllUsers: null,
  userDetails:{},
  searchUsers:[]
};

// handle actions
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_USERS: {
      console.log("payload", payload);
      return {
        ...state,
        searchUsers: payload,
      };
    }
    case GET_ALL_USERS: {
      console.log("payload", payload);
      return {
        ...state,
        AllUsers: payload,
      };
    }
    case GET_USER_DETAILS: {
      console.log("payload userDetails", payload);
      return {
        ...state,
        userDetails: payload,
      };
    }

    default:
      return state;
  }
}
