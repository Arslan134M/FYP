import { NAME, GET_ALL_SERVICES,ADD_HIRE_USER } from "../../types";
import axios from "axios"; //same
import API from "../../../utils/API"; //same
//(id)
export const addHireUser = ({header,body}) => async (dispatch) => {
  //same change login and user as your requirement
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...header
    },
  };
  //config same

console.log("config",config)
  try {
    const response = await API.post(`/api/selectservice`,body, config);
    //get
    // const response = await API.delete(
    //   `/api/auth/signin${id}`,
    //   config
    // );
    //delete
    console.log("hire",response)

    console.log("api response ", response);
    let data = response?.data;
    console.log("data", data);
    dispatch({ type: GET_ALL_SERVICES, payload: data?.AllServices});
    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);

    return { status: 400 };
  }
};
export const getAllServices = () => async (dispatch) => {
  //same change login and user as your requirement
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  //config same


  try {
    const response = await API.get(`/api/allServices`, config);
    //get
    // const response = await API.delete(
    //   `/api/auth/signin${id}`,
    //   config
    // );
    //delete

    console.log("api response ", response);
    let data = response?.data;
    console.log("data", data);
    dispatch({ type: GET_ALL_SERVICES, payload: data?.AllServices});
    return { status: 200 };
  } catch (error) {
    console.log("res=========>error:", error);

    return { status: 400 };
  }
};

