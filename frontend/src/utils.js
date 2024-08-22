import { getTexture } from "./components/mapContainer/helper";

export const APP_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  MAP: "/map",
};

export const API_ROUTES = {
  signup: `${process.env.REACT_APP_API_BASE}auth/signup`,
  login: `${process.env.REACT_APP_API_BASE}auth/login`,
  createtexture: `${process.env.REACT_APP_API_BASE}texture/create`,
  getTexture: (userId) =>
    `${process.env.REACT_APP_API_BASE}texture/get/${userId}`,
  getMostFreq: `${process.env.REACT_APP_API_BASE}texture/most-frequent`,
};
