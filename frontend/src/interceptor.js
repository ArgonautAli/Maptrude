import axios from "axios";
import { APP_ROUTES } from "./utils";

export const addAuthInterceptor = () => {
  axios.interceptors.request.use(
    async (config) => {
      await addAuthHeader(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      if (response.status in [401]) {
        localStorage.removeItem("token");
        window.location.href = APP_ROUTES.LOGIN;
      }
      return response;
    },
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error);
      }
      return Promise.reject(error.message);
    }
  );
};

const addAuthHeader = async (config) => {
  const { headers } = config;

  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    if (headers) headers["Authorization"] = `Bearer ${token}`;
  }
};
