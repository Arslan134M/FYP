import { NAME, SIGNUP } from "../../types";
import axios from "axios";
import API from "../../../utils/API";

export const signup = ({ user }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  let body = { ...user };

  try {
    const response = await API.post(
      `/api/signup`,
      JSON.stringify(body),
      config
    );
    let data = response?.data;
    console.log("data", data);
    dispatch({ type: SIGNUP, payload: data });
    dispatch({
      type: "SET_SUCCESS_NOTIFICATION",
      payload: {
        message: "Signup Successfully",
      },
    });
    return { status: 200 };
  } catch (error) {
    dispatch({
      type: "SET_ERROR_NOTIFICATION",
      payload: {
        message: error?.message?error?.message:"Something went wrong",
      },
    });
    console.log("res=========>error:", error);

    return { status: 400 };
  }
};
