// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================

import {
  DATA_ALREADY_EXISTS,
  FETCH_SINGLE_USER,
  TOGGLE_FOLLOWING
} from "./type";

import ChadAPI from "../api/ChadAPI";

export const fetchSingleUser = id => async (dispatch, getState) => {
  // BASIC CACHES
  const user = getState().users.find(user => id === user.id);
  if (user) dispatch({ type: DATA_ALREADY_EXISTS });
  // DATA AINT AVAILABLE
  else {
    const res = await ChadAPI.get(`User/${id}`);
    dispatch({
      type: FETCH_SINGLE_USER,
      payload: res.data
    });
  }
};

// NASTY STUFF BRO
export const toggleFollowing = id => async (dispatch, getState) => {
  const currentUserID = getState().auth.currentUser.id;
  const users = getState().users;
  const targetUser = users.find(user => user.id === id);
  let tempData;

  const isFollowing = targetUser.followers.find(
    followerID => followerID === currentUserID
  );
  tempData = {
    followers: isFollowing
      ? targetUser.followers.filter(followerID => followerID !== currentUserID)
      : [...targetUser.followers, currentUserID]
  };

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
