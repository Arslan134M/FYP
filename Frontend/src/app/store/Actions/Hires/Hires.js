import { GET_ALL_HIRES} from "../../types";
import API from "../../../utils/API";

export const getAllHires = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.get(`/api/hireMe`, config);
    console.log("respons", response);

    let data = response?.data;
    console.log("data", data);
    dispatch({ type: GET_ALL_HIRES, payload: data?.HireMe });
    console.log("data after return", data?.HireMe);

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    return { status: 400 };
  }
};
