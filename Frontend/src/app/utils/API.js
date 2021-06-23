import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : process.env.REACT_APP_BASE_URL,
  responseType: "json",
});
export const baseUrl="http://localhost:8080"
// http://localhost:8080
