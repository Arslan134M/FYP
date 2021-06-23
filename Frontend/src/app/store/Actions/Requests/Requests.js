import {
  GET_ALL_SENT_REQUEST,
  GET_ALL_RECIEVE_REQUEST,
  UPDATE_RECIEVE_REQUESTS_STATUS,
} from "../../types";
import API from "../../../utils/API";

export const getAllSentRequests = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    //sent requests
    const response = await API.get(
      `/api/userServices?id=${localStorage.getItem("userId")}`,
      config
    );
    let data = response?.data;
    dispatch({ type: GET_ALL_SENT_REQUEST, payload: data?.user });
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
export const getAllRecieveRequests = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    //received requests
    const response = await API.get(
      `/api/recieve-requests?id=${localStorage.getItem("userId")}`,
      config
    );
    let data = response?.data;
    dispatch({ type: GET_ALL_RECIEVE_REQUEST, payload: data?.user });
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
export const updateRequestStatus = ({ status, id }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    let body = {
      status: status,
    };
    const response = await API.patch(`/api/userRequest?id=${id}`, body, config);
    let data = response?.data;
    dispatch({ type: UPDATE_RECIEVE_REQUESTS_STATUS, payload: data?.user });
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
