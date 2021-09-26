import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const token = Cookies.get("token");

export const notifyEmy = ({ status, url, property, log, heading }) => {
  axios(process.env.REACT_APP_API_URL + "/logs", {
    method: "POST",
    data: {
      status,
      users_permissions_user: token ? jwt.decode(token) : null,
      url,
      property,
      log,
      heading,
    },
  });
};
