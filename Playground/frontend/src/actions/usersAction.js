// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================

import {
  FETCH_SINGLE_USER,
  TOGGLE_FOLLOWING,
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

export const toggleFollowing = id => async (dispatch, getState) => {
  const currentUserID = getState().auth.currentUser.id;
  const users = getState().users;
  const targetUser = users.find(user => user.id === id);
  let tempData;
  if (targetUser.followers.find(followerID => followerID === currentUserID)) {
    console.log("we are currently following, trying to unfollow");
    tempData = {
      followers: targetUser.followers.filter(
        followerID => followerID !== currentUserID
      )
    };
  } else {
    console.log("we are currently NOT following, trying to follow");
    tempData = {
      followers: [...targetUser.followers, currentUserID]
    };
  }

  try {
    const res = await ChadAPI.patch(`User/${id}/`, tempData);
    dispatch({
      type: TOGGLE_FOLLOWING,
      payload: users.map(user => {
        if (user.id === id) return res.data;
        else return user;
      })
    });
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};
