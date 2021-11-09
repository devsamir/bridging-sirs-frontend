import axios from "axios";
// export const URL = "http://localhost:4000/api";
export const URL = "http://192.168.100.75:4000/api";

const myAxios = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export default myAxios;
