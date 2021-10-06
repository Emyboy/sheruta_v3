import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import store from "../redux/store/store";

export const notifyEmy = ({ status, url, property, log, heading, user }) => {
    axios(process.env.REACT_APP_API_URL + "/logs", {
        method: "POST",
        data: {
            status,
            users_permissions_user: jwt.decode(localStorage.getItem("token")).id || null,
            url: window.location.pathname,
            property,
            log,
            heading,
        },
    });
};
