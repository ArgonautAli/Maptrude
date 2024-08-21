import { API_ROUTES } from "../../utils";
import axios from "axios";

export const loginUser = async (
  username,
  password,
  successCallback = () => {},
  errorCallback = () => {}
) => {
  const body = {
    userName: username,
    password: password,
  };
  var config = {
    method: "post",
    url: API_ROUTES.login,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (!username || !password) {
      throw new Error("Please provide a valid username or password.");
    } else {
      await axios(config)
        .then(function (response) {
          setJwtToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
          successCallback?.(response.data.data);
        })
        .catch(function (error) {
          errorCallback?.(error.message);
        });
    }
  } catch (error) {
    errorCallback(error.message);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export function getJwtToken() {
  return localStorage.getItem("token");
}

export function setJwtToken(token) {
  localStorage.setItem("token", token);
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function setRefreshToken(token) {
  localStorage.setItem("refreshToken", token);
}
