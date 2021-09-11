import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
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
        user.user.id
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

export const getAuthPersonalInfo = () => (dispatch) => {
  if (Cookies.get("token") && store.getState().auth.user) {
    axios(process.env.REACT_APP_API_URL + "/personal-infos/me", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => {
        store.dispatch({
          type: "SET_VIEW_STATE",
          payload: {
            personal_info: res.data,
          },
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          localStorage.clear();
          Cookies.remove("token");
          sessionStorage.clear();
          store.dispatch({
            type: "SET_AUTH_STATE",
            payload: {
              user: null,
              agentData: null,
            },
          });
          notification.error({ message: "You are logged out" });
        }
        store.dispatch({
          type: "SET_VIEW_STATE",
          payload: {
            configureView: true,
          },
        });
      });
  }
};
