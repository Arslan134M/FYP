import { NAME, SIGNUP, LOGIN } from "../../types";
import axios from "axios"; //same
import API from "../../../utils/API"; //same
//(id)
export const signup = ({ user }) => async (dispatch) => {
  //same change login and user as your requirement
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  //config same

  let body = { ...user };

  try {
    // const response = await API.get(
    //   `/api/auth/signin`,
    //   config
    // );
    //get
    // const response = await API.delete(
    //   `/api/auth/signin${id}`,
    //   config
    // );
    //delete
    const response = await API.post(
      `/api/signup`,
      JSON.stringify(body),
      config
    );
    console.log("api response ", response);
    let data = response?.data;
    console.log("data", data);
    dispatch({ type: LOGIN, payload: data });
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
