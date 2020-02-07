// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================
import { FETCH_POSTS, REGISTER_USER } from "./type";

import ChadAPI from "../api/ChadAPI";

export const fetchPosts = () => async dispatch => {
  const response = await ChadAPI.get("Post/");
  dispatch({
    type: FETCH_POSTS,
    payload: response.data
  });
};

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
  const res = await ChadAPI.post("User/", body, config);
  dispatch({
    type: REGISTER_USER,
    payload: res.data
  });
};
