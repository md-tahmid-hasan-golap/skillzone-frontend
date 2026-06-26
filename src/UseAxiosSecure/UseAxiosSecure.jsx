import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

const axiusSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://skillzone-backend.vercel.app",
});

const UseAxiosSecure = () => {
  const { userId } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiusSecure.interceptors.request.use(
      (config) => {
        if (userId) {
          config.headers["x-clerk-user-id"] = userId;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axiusSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [userId]);

  return axiusSecure;
};

export default UseAxiosSecure;
