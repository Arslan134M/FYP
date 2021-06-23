import {
  GET_ALL_SENT_REQUEST,
  GET_ALL_RECIEVE_REQUEST,
  UPDATE_RECIEVE_REQUESTS_STATUS,
} from "../types";
// initial state
const initialState = {
  sentRequests: null,
  recieveRequests: null,
};

// handle actions
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_SENT_REQUEST: {
      return {
        ...state,
        sentRequests: payload,
      };
    }
    case GET_ALL_RECIEVE_REQUEST: {
      return {
        ...state,
        recieveRequests: payload,
      };
    }
    case UPDATE_RECIEVE_REQUESTS_STATUS: {
      console.log("payload", payload);
      let rq = [...state.recieveRequests];
      if (payload[0]?.status === "cancelled") {
        rq = rq.filter((item) => item?._id === payload[0]?._id);
      } else {
        let index = rq.findIndex((item) => item?._id === payload[0]?._id);
        if (index > -1) {
          rq[index] = { ...payload[0] };
        }
      }

      return {
        ...state,

        recieveRequests: [...rq],
      };
    }

    default:
      return state;
  }
}
