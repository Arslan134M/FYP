import { GET_ALL_USERS, GET_USER_DETAILS, SEARCH_USERS } from "../../types";
import API from "../../../utils/API";

export const getUserById = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.get(`/api?id=${localStorage.getItem("userId")}`, config);
    console.log("respons", response);

    let data = response?.data;
    console.log("data", data);
    dispatch({ type: GET_USER_DETAILS, payload: data });
    console.log("data after return", data);

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    return { status: 400 };
  }
};
export const searchUsers = ({lat,lng,service}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  console.log(lat, lng);
  try {
    let body={
      "location": {
       "type": "Point"
       ,
       "coordinates": [lng,lat] ,
       "radius":"100"
     },service:service
  
  }
    const response = await API.post(`/api/allUserLoc`,body, config);
    console.log("respons", response);

    let data = response.data;
    dispatch({ type: SEARCH_USERS, payload: [...data.allUsersAtLocation] });

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    return { status: 400 };
  }
};
export const getAllUsers = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.get(`/api/allusers`, config);
    console.log("respons", response);

    let data = response?.data;
    console.log("data", data);
    dispatch({ type: GET_ALL_USERS, payload: data?.Allusers });
    console.log("data after return", data?.Allusers);

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    return { status: 400 };
  }
};

export const addServiceToUser = ({ location, id }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    let body = { location, service: id };
    const response = await API.patch(
      `/api/edit?${id}&id=${localStorage.getItem("userId")}`,
      JSON.stringify(body),
      config
    );
    console.log("respons", response);

    let data = response?.data;
    console.log("data", data);
    dispatch({ type: GET_ALL_USERS, payload: data?.Allusers });
    console.log("data after return", data?.Allusers);

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    return { status: 400 };
  }
};

export const updateUser = (id, values) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  let body = JSON.stringify(values);
  try {
    const response = await API.patch(`/api/edit?id=${localStorage.getItem("userId")}`, body, config);
    console.log("respons", response);

    let data = response?.data;
    console.log("data", data);
    dispatch({
      type: "SET_SUCCESS_NOTIFICATION",
      payload: {
        message: "Profile Updated Successfully",
      },
    });
    if (data?.user) {
      dispatch({ type: GET_USER_DETAILS, payload: data?.user });
    }
    console.log("data after return", data);

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    dispatch({
      type: "SET_ERROR_NOTIFICATION",
      payload: {
        message: error?.response?.data?.message,
      },
    });
    return { status: 400 };
  }
};

export const updateProfilePic = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.patch(
      `/api/updateProfile?id=${localStorage.getItem("userId")}`,
      formData,
      config
    );
    console.log("respons", response);

    let data = response?.data;
    console.log("data", data);

    dispatch({
      type: "SET_SUCCESS_NOTIFICATION",
      payload: {
        message: response?.data?.message,
      },
    });
    if (data?.data) {
      dispatch({ type: GET_USER_DETAILS, payload: data?.data });
    }

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    dispatch({
      type: "SET_ERROR_NOTIFICATION",
      payload: {
        message: error?.response?.data?.message,
      },
    });
    return { status: 400 };
  }
};
