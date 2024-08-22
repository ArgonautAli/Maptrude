import { API_ROUTES } from "../../utils";
import axios from "axios";

export const signUpUser = async (
  fullname,
  username,
  password,
  successCallback = () => {},
  errorCallback = () => {}
) => {
  const body = {
    fullName: fullname,
    userName: username,
    password: password,
  };
  var config = {
    method: "post",
    url: API_ROUTES.signup,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    console.log("API_ROUTES.signup", API_ROUTES.signup);
    if (!username || !password || !fullname) {
      throw new Error("Please provide valid details.");
    } else {
      await axios(config)
        .then(function (response) {
          successCallback?.(response.data);
        })
        .catch(function (error) {
          errorCallback?.(error.message);
        });
    }
  } catch (error) {
    errorCallback(error.message);
  }
};
