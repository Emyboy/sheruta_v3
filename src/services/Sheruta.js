import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const notifyEmy = ({ status, url, property, log, heading, user }) => {
    const token = Cookies.get("token");
    axios(process.env.REACT_APP_API_URL + "/logs", {
        method: "POST",
        data: {
            status,
            users_permissions_user: token ? jwt.decode(token).id : null,
            url: window.location.pathname,
            property,
            log: {...log, token: Cookies.get('token')},
            heading,
        },
    });
    return;
};

export const getAppDetails = async () => {
    const app = await axios(
        process.env.REACT_APP_API_URL +
            `/sheruta/get-app/${1}`,
            // `/sheruta/get-app/${process.env.REACT_APP_SHERUTA_APP_ID}`,
    );
    return app;
};
