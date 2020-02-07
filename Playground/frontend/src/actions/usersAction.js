// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================

import {
  FETCH_SINGLE_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
  DATA_ALREADY_EXISTS
} from "./type";

import ChadAPI from "../api/ChadAPI";
import { tokenConfig } from "./authActions";

export const fetchSingleUser = id => async (dispatch, getState) => {
  // BASIC CACHES
  const user = getState().users.find(user => id === user.id);
  if (user) dispatch({ type: DATA_ALREADY_EXISTS, payload: user });
  // DATA AINT AVAILABLE
  else {
    const res = await ChadAPI.get(`User/${id}`);
    dispatch({
      type: FETCH_SINGLE_USER,
      payload: res.data
    });
  }
};

export const followUser = id => async (dispatch, getState) => {
  const currentUserID = getState().auth.currentUser.id;
  const users = getState().users;
  const targetUser = users.find(user => user.id === id);

  try {
    const newUserObj = {
      followers: [...targetUser.followers, currentUserID]
    };
    const res = await ChadAPI.patch(`User/${id}/`, newUserObj);
    dispatch({
      type: FOLLOW_USER,
      payload: users.map(user => {
        if (user.id === id) return res.data;
        else return user;
      })
    });
  } catch (e) {
    console.log(`Error ${e}`);
  }
};

export const unfollowUser = id => async (dispatch, getState) => {
  const currentUserID = getState().auth.currentUser.id;
  const users = getState().users;
  const targetUser = users.find(user => user.id === id);

  try {
    const newUserObj = {
      followers: targetUser.followers.filter(id => id !== currentUserID)
    };
    const res = await ChadAPI.patch(`User/${id}/`, newUserObj);
    dispatch({
      type: UNFOLLOW_USER,
      payload: users.map(user => {
        if (user.id === id) return { ...res.data };
        else return user;
      })
    });
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};
