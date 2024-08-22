import { API_ROUTES } from "../../utils";
import axios from "axios";

export const saveTexture = async (
  texture,
  coords,
  userId,
  successCallback = () => {},
  errorCallback = () => {}
) => {
  const body = {
    texture: texture,
    coords: coords,
    createdBy: userId,
  };
  var config = {
    method: "post",
    url: API_ROUTES.createtexture,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (!body) {
      throw new Error("Please provide a valid body.");
    } else {
      await axios(config)
        .then(function (response) {
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

export const getTexture = async (
  userId,
  successCallback = () => {},
  errorCallback = () => {}
) => {
  var config = {
    method: "get",
    url: API_ROUTES.getTexture(userId),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios(config)
      .then(function (response) {
        successCallback?.(response.data.data);
      })
      .catch(function (error) {
        errorCallback?.(error.message);
      });
  } catch (error) {
    errorCallback(error.message);
  }
};

export const getMostFreqText = async (
  successCallback = () => {},
  errorCallback = () => {}
) => {
  var config = {
    method: "get",
    url: API_ROUTES.getMostFreq,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios(config)
      .then(function (response) {
        successCallback?.(response.data.data);
      })
      .catch(function (error) {
        errorCallback?.(error.message);
      });
  } catch (error) {
    errorCallback(error.message);
  }
};
