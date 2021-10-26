import axios from "axios";
import store from "../redux/store/store";

export const notificationTypes = {
    profileView: "profile_view",
    requestView: "request_view",
    personal_info_view: "personal_info_view",
    newUser: "new_user",
    suggestions_accept: "suggestions_accept",
};

export default {
    notifyUser: async ({
        title,
        sub_title,
        owner,
        users_permissions_user,
        type,
        property_request,
        payment_plan,
    }) => {
        const { user } = store.getState().auth;
        const data = await axios(
            process.env.REACT_APP_API_URL + `/notifications/create`,
            {
                method: "POST",
                data: {
                    title,
                    sub_title,
                    owner,
                    users_permissions_user:
                        user && user.user.id !== owner ? user.user.id : null,
                    type,
                    property_request,
                    payment_plan,
                },
            },
        );
        console.log("NOTIFICATION SEND ---", data);
        return data;
    },
};
