import axios from "axios";

const axiusSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const UseAxiosSecure = () => {
  return axiusSecure;
};

export default UseAxiosSecure;
