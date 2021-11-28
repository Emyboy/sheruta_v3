import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import store from "../redux/store/store";

export const notifyEmy = ({ status, url, property, log, heading, user }) => {
    const token = localStorage.getItem("token");
    // axios(process.env.REACT_APP_API_URL + "/logs", {
    //     method: "POST",
    //     data: {
    //         status,
    //         users_permissions_user: token ? jwt.decode(token).id : null,
    //         url: window.location.pathname,
    //         property,
    //         log,
    //         heading,
    //     },
    // });
    return;
};

export const getAppDetails = async () => {
    const app = await axios(
        process.env.REACT_APP_API_URL +
            `/sheruta/get-app/${process.env.REACT_APP_SHERUTA_APP_ID}`,
    );
    return app;
};
