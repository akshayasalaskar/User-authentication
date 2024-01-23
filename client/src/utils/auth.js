import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";
//this file is for cookie, means even after user logs in and closes window then too his authenticated cookie will be there in browser
//and whenever user opens app again he stays logged in

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const getCookie = (key) => {
  return cookie.get(key);
};

//The first argument is the name of the cookie, which is set as "token," and the second argument
//is the value of the cookie, which is the token passed to the setAuthentication function.
export const setAuthentication = (token) => {
  setCookie("token", token);
};

export const logOut = () => {
  removeCookie("token");
};
//It sends a request to the ${baseURL}/auth endpoint with the token included
// in the request body. The result of the request is stored in the res variable.
export const isLogin = async () => {
  const token = getCookie("token");
  if (token) {
    const res = await axios.post(`${baseURL}/auth`, { token });
    return res.data;
  }
  return false;
};
