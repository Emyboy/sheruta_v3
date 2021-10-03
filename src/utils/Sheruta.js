import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const token =  localStorage.getItem('token');

export const notifyEmy = ({ status, url, property, log, heading }) => {
  axios(process.env.REACT_APP_API_URL + "/logs", {
    method: "POST",
    data: {
      status,
      users_permissions_user: token ? jwt.decode(token) : null,
      url: window.location.pathname,
      property,
      log,
      heading,
    },
  });
};
