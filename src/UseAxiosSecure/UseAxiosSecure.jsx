import axios from "axios";

const axiusSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://skillzone-backend.vercel.app",
});
const UseAxiosSecure = () => {
  return axiusSecure;
};

export default UseAxiosSecure;
