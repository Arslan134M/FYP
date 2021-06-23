import { GET_ALL_FEATURES } from "../../types";
import API from "../../../utils/API";

export const getAllFeatures = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.get(`/api/allFeatures`, config);
    let data = response?.data;
    console.log("data", data);
    dispatch({ type: GET_ALL_FEATURES, payload: data?.AllFeatures });
    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    return { status: 400 };
  }
};
