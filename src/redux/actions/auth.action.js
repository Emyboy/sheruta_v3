import {
  // SIGNUP,
  CLEAR_ERROR,
  LOGIN,
  LOGIN_ERROR,
  AUTH_LOADING,
  LOGOUT,
  TOGGLE_ADD_NUMBER,
  ADD_AGENT, AGENT_LOADING, UPDATE_AUTH_PROGRESS, SIGNUP_ERROR
  // UPDATE_PROFILE_ERROR,
  // UPDATE_PROFILE_SUCCESS,
} from ".";

import { notification } from "antd";
import Axios from "axios";
import { storage } from "../../Firebase";



const authLoading = () => {
  return {
    type: AUTH_LOADING
  }
}

const loginSuccess = payload => {
  return {
    type: LOGIN,
    payload
  }
}

const loginError = error => {
  return {
    type: LOGIN_ERROR,
    payload: error
  }
}

const clearError = error => {
  return {
    type: CLEAR_ERROR
  }
}

const signupError = error => {
  return {
    type: SIGNUP_ERROR,
    payload: error
  }
}

const logoutUser = () => {
  return {
    type: LOGOUT
  }
}

export const clearErrorMessage = () => dispath => {
  dispath(clearError());
}


export const logout = () => dispatch => {
  dispatch(logoutUser());
  dispatch({ type: ADD_AGENT, payload: null })
  localStorage.removeItem('token');
}

export const signup = data => dispatch => {
  dispatch(authLoading());

  return Axios(`${process.env.REACT_APP_API_URL}/signup`, {
    method: 'POST',
    data: data,
    validateStatus: (status) => {
      return status == 200 || status == 409;
    }
  })
    .then(res => {

      if (res.status === 200) {
        dispatch(loginSuccess(res.data.user[0]));
        notification.success({ message: res.data.message });
      } else if (res.status === 409 && res.data.errors[0]) {
        switch (res.data.errors[0].param) {
          case "username":
            dispatch(signupError({ message: "Username In Use", description: 'The username you entered has already been taken. Please enter a different username' }))
            // notification.error({ message: 'Username Already In Use' })
            break;
          case "email":
            // notification.error({ message: 'Email Already In Use' })
            dispatch(signupError({ message: "Email In Use", description: 'The email you entered has already been taken. Please enter a different email' }))
            break;
          default:
            break;
        }
      }
    })
    .catch(err => {
      err.isAxiosError ? dispatch(signupError({ message: "Network Error", description: 'We apologize that we could not establish server connection at this time. It is possible that you do not have an internet connection or that our server is down currently. Please check that you have an internet connection and sign up again or try signing up at a later time' }))
        : dispatch(signupError({ message: "Request Error", description: "An error occurred while processing your request. Please try signing up again." }))

      /*notification.error({ message:"Network Error", description: 'Server connection could not be established. You either do not have an internet connection or server is down. Please verify you have an internet connection and try again'})
     : notification.error({message:"Request Error", description: "An error occurred while processing your request. Please try again.", duration:0 })*/

    })
}

export const login = data => dispatch => {
  dispatch(authLoading())
  return Axios(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    data
  })
    .then(res => {
      if (res.data.status === 200) {
        dispatch(loginSuccess(res.data.user[0]));
        notification.success({ message: res.data.message });
        localStorage.setItem('token', res.data.token);
      } else {
        notification.error({ message: res.data.message })
        dispatch(loginError(res.data))
      }
    })
    .catch(err => {
      err.isAxiosError ? notification.error({ message: 'No internet connection' })
        : notification.error({ message: 'Request Error!' })
      dispatch(loginError(err))
    })
}

export const handleGoogleLogin = data => dispatch => {
  Axios(`${process.env.REACT_APP_API_URL}/login/google`, {
    method: 'POST',
    data: { ...data, login_type: 'google' }
  })
    .then(res => {
      dispatch({ type: LOGIN, payload: res.data.user });
      dispatch({ type: TOGGLE_ADD_NUMBER })
      dispatch({ type: ADD_AGENT, payload: res.data.user.agent });
      notification.success({ message: 'Loged In' });
      localStorage.setItem('token', res.data.token);
    })
    .catch(err => {
      notification.error({ message: 'Login Error Please Try Again ' })
    })
};

export const updateUserAccount = update => dispatch => {
  Axios(`${process.env.REACT_APP_API_URL}/users/${update.user_id}`, {
    method: 'PUT',
    data: update
  })
    .then(update => {
    })
    .catch(err => {
    })
}


export const crate_agent_account = data => dispatch => {
  dispatch({ type: AGENT_LOADING, payload: true });

  const uploadTask = storage.child(`agent/${data.user_id}/company_logo`).put(data.company_logo)
  uploadTask.on('state_changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    dispatch({ type: UPDATE_AUTH_PROGRESS, payload: progress })
  }, (error) => {
    // Handle unsuccessful uploads
    notification.error({ message: 'Error Uploading Image ' });
  }, () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      Axios(`${process.env.REACT_APP_API_URL}/agent`, {
        method: 'POST',
        data: { ...data, company_logo: downloadURL }
      })
        .then(account => {
          dispatch({ type: AGENT_LOADING, payload: false });
          dispatch({ type: ADD_AGENT, payload: account.data.data[0] });
          notification.error({ message: 'Error Sending data, Please Try Again' });
        })
        .catch(err => {
          dispatch({ type: AGENT_LOADING, payload: false });
          dispatch({ type: UPDATE_AUTH_PROGRESS, payload: 0 });
          notification.error({ message: 'Error Sending data, Please Try Again' });
        })
    }).catch(err => {
      dispatch({ type: AGENT_LOADING, payload: false });
      dispatch({ type: UPDATE_AUTH_PROGRESS, payload: 0 });
    });
  });
}

export const editAgentAccount = data => dispatch => {
  dispatch({ type: AGENT_LOADING, payload: true });
  Axios(`${process.env.REACT_APP_API_URL}/agent`, {
    method: 'PUT',
    data
  })
    .then(res => {
      dispatch({ type: AGENT_LOADING, payload: false });
      dispatch({ type: ADD_AGENT, payload: res.data.data });
      notification.success({ message: 'Saved' })
    })
    .catch(err => {
      dispatch({ type: AGENT_LOADING, payload: false });
      notification.error({ message: 'Error Saving Data' })
    })
}

export const setAuthState = state => dispatch => {
  dispatch({
    type: 'SET_AUTH_STATE',
    payload: state
  })

}