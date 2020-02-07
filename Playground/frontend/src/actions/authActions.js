// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FETCH_SINGLE_USER
} from "./type";

import ChadAPI from "../api/ChadAPI";

// REGISTER NEW USER
export const register = ({
  first_name,
  last_name,
  username,
  email,
  password,
  gender
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    username,
    email,
    password,
    gender
  });

  try {
    const res = await ChadAPI.post("User/", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({ type: REGISTER_FAILED });
  }
};

// LOGIN USER
export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await ChadAPI.post("login/", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({ type: LOGIN_FAILED });
  }
};
