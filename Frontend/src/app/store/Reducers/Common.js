const initialState = {
  notification: null,
};

// handle actions
export default function (state = initialState, action) {
  //same
  const { type, payload } = action; //same

  switch (type) {
    case "SET_SUCCESS_NOTIFICATION": {
      return {
        ...state,
        notification: {
          message: payload.message,
          severity: "success",
          open: true,
        },
      };
    }
    case "SET_ERROR_NOTIFICATION": {
      return {
        ...state,
        notification: {
          message: payload.message,
          severity: "error",
          open: true,
        },
      };
    }
    case "RESET_NOTIFICATION": {
      return {
        ...state,
        notification: null,
      };
    }

    default:
      return { ...state };
  }
}
