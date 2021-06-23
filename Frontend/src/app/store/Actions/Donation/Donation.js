import { ADD_DONATION, GET_ALL_DONATIONS,UPDATE_DONATION_STATUS } from "../../types";
import API from "../../../utils/API";

export const addDonation = ({body}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.post(
      `/api/addDonation?id=${localStorage.getItem("userId")}`,
      body,config,
      
    );
    dispatch({
      type: "SET_SUCCESS_NOTIFICATION",
      payload: {
        message: "Donation saved Updated Successfully",
      },
    });
    console.log("added",response)
    // let data = response?.data;
    // dispatch({ type: ADD_DONATION, payload: data?.user });
    return { status: 200 };
  } catch (error) {
    dispatch({
      type: "SET_ERROR_NOTIFICATION",
      payload: {
        message: error?.message?error?.message:"Something went wrong",
      },
    });
    return { status: 400 };
  }
};
export const getAllDonations = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await API.get(
      `/api/allDonations`,
      config
    );
    let data = response?.data;
    dispatch({ type: GET_ALL_DONATIONS, payload: data?.AllDonations });
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};
export const updateRequestStatus = ({status,id}) => async (dispatch) => {
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
    const response = await API.patch(
      `/api/updateDonation?id=${id}`,
      body,
      config
    );
  
    let data = response?.data;
    dispatch({ type: UPDATE_DONATION_STATUS, payload: {id,status }});
    return { status: 200 };
  } catch (error) {
    
    return { status: 400 };
  }
};
