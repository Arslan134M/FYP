import { GET_ALL_DONATIONS} from "../../types";
import API from "../../../utils/API";

export const getAllDonations = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.get(`/api/allDonations`, config);
    console.log("respons", response);

    let data = response?.data;
    console.log("data", data);
  console.log("data after return", data?.AllDonations);

    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);
    return { status: 400 };
  }
};
