import Axios from "axios";

export const baseURL = "http://localhost:8080";

export const AxiosInstance = Axios.create({
  baseURL,
});
