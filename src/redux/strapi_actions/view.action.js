import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Notifications from "../../utils/Notifications";
import { getAppDetails } from "../../utils/Sheruta";
import store from "../store/store";

export const getAllServices = () => (dispatch) => {
    axios(process.env.REACT_APP_API_URL + "/services")
        .then((res) => {
            dispatch({
                type: "GET_ALL_SERVICES",
                payload: res.data,
            });
        })
        .catch((err) => {
            notification.error({ message: "Error fetching services" });
        });
};

export const getAllCategories = () => (dispatch) => {
    axios(process.env.REACT_APP_API_URL + "/categories")
        .then((res) => {
            dispatch({
                type: "GET_ALL_CATEGORIES",
                payload: res.data,
            });
        })
        .catch((err) => {
            notification.error({ message: "Error fetching categories" });
        });
};

export const getUserFeedback = () => (dispatch) => {
    setTimeout(() => {
        const user = store.getState().auth.user;
        axios(
            process.env.REACT_APP_API_URL +
                "/user-feedbacks/?users_permissions_user=" +
                user.user.id,
        )
            .then((res) => {
                if (res.data.length === 0) {
                    dispatch({
                        type: "SET_VIEW_STATE",
                        payload: {
                            askForUserFeedback: true,
                        },
                    });
                }
            })
            .catch((err) => {});
    }, 5000);
};

export const getAuthPersonalInfo = () => async (dispatch) => {
    let token = await Cookies.get("token");
    axios(process.env.REACT_APP_API_URL + "/personal-infos/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            console.log("PERSONAL INFO");
            store.dispatch({
                type: "SET_VIEW_STATE",
                payload: {
                    personal_info: res.data,
                },
            });
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                localStorage.removeItem("token");
                Cookies.remove("token");
                store.dispatch({
                    type: "LOGOUT",
                });
                notification.error({ message: "You are logged out" });
            }
            if (err.response?.status === 404) {
                store.dispatch({
                    type: "SET_VIEW_STATE",
                    payload: {
                        configureView: true,
                    },
                });
            }
        });
};

export const getAllPaymentTypes = () => (dispatch) => {
    axios(process.env.REACT_APP_API_URL + `/payment-types`)
        .then((res) => {
            dispatch({
                type: "GET_ALL_PAYMENT_TYPES",
                payload: res.data,
            });
        })
        .catch((err) => {
            notification.error({ message: "Error getting all payment types" });
        });
};


export const getAllStates = () => dispatch => {
    axios(process.env.REACT_APP_API_URL + `/states`)
        .then((res) => {
            dispatch({
                type: "GET_ALL_STATES",
                payload: res.data,
            });
        })
        .catch((err) => {
            notification.error({ message: "Error getting all payment types" });
        });
}
export const getAllWorkIndustries = () => dispatch => {
    axios(process.env.REACT_APP_API_URL + `/work-industries`)
        .then((res) => {
            dispatch({
                type: "GET_ALL_WORK_INDUSTRIES",
                payload: res.data,
            });
        })
        .catch((err) => {
            notification.error({ message: "Error with work industries" });
        });
}

export const getAppDetail = () =>  async dispatch => {
    try {
        const app = await getAppDetails();
        dispatch({
            type: "GET_APP_DETAILS",
            payload: app.data
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export const showRobotMessage = (message, actionText, actionLink) => dispatch => {
    dispatch({
        type: "SHOW_ROBOT_MESSAGE",
        payload: {
            robot_message: message,
            robot_action_text: actionText,
            robot_action_link: actionLink
        }
    });
    setTimeout(() => {
        dispatch({
            type: "SHOW_ROBOT_MESSAGE",
            payload: {
                robot_message: null,
                robot_action_text: null,
                robot_action_link: null,
            },
        });
    }, 15000);
}

export const getAllNotifications = () => async dispatch => {
    if(store.getState().auth.user){
        const list = await Notifications.getAuthUserNotification();
        console.log('FETCH ----', list)
        dispatch({
            type: 'GET_ALL_NOTIFICATIONS',
            payload: list.data
        })
    }
}

