import {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutUser,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  registerRequest,
  registerSuccess,
  registerFail,
  clearError,
} from "../features/userAuth";

import * as api from "../api/index";
export const loginAsync = (data) => async (dispatch, getState) => {
  try {
    dispatch(loginRequest());
    const d = await api.loginUser(data);
    // console.log(d.data.user);
    if (d.status === 200) {
      dispatch(loginSuccess(d.data.user));
    }
  } catch (err) {
    dispatch(loginFail(err.response.data.message));
  }
};

export const registerAsync = (d) => async (dispatch, getState) => {
  try {
    dispatch(registerRequest());
    const fetch = await api.registerUser(d);
    console.log(fetch);
    if (fetch.status === 201) {
      dispatch(registerSuccess(fetch.data.user));
    }
  } catch (err) {
    dispatch(registerFail(err.response.data.message));
  }
};

export const logOutAsync = () => async (dispatch, getState) => {
  try {
    const fetch = await api.logOut();
    dispatch(logoutUser());
  } catch (err) {
    console.log(err);
  }
};
export const getUserDataAsync = () => async (dispatch, getState) => {
  try {
    dispatch(loadUserRequest());
    const fetch = await api.getUserData();
    const { user } = fetch.data;
    if (fetch.status === 200) {
      dispatch(loadUserSuccess(user));
    } else {
      console.log(fetch);
    }
  } catch (err) {
    dispatch(loadUserFail(err.response.data.message));
    // console.clear();
  }
};

export const clearErrorAsync = () => (dispatch) => {
  setTimeout((e) => {
    dispatch(clearError());
  }, 2000);
};
