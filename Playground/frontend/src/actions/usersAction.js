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

export const fetchSingleUser = id => async (dispatch, getState) => {
  // BASIC CACHES
  const user = getState().users.find(user => id === user.id);
  if (user) dispatch({ type: DATA_ALREADY_EXISTS, payload: user });
  // DATA AINT AVAILABLE
  else {
    console.log("fetching user . . .");
    const res = await ChadAPI.get(`User/${id}`);
    dispatch({
      type: FETCH_SINGLE_USER,
      payload: res.data
    });
  }
};

export const followUser = id => async (dispatch, getState) => {
  const currentUserID = getState().auth.currentUser.id;
  const targetUser = getState().users.find(user => id === user.id);

  try {
    const res = await ChadAPI.patch(`User/${id}`, {
      followers: [...targetUser.followers, JSON.stringify(currentUserID)]
    });

    dispatch({ type: FOLLOW_USER, payload: res.data });
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

// somi 4dd45faa-d657-4d97-9df3-e0196b5899c8
// carin adb24cb3-356f-4f3c-96f7-1e2f4b859a06

export const unfollowUser = id => async (dispatch, getState) => {
  const currentUserID = getState().auth.currentUser.id;
  const targetUser = getState().users.find(user => id === user.id);

  try {
    const res = await ChadAPI.patch(`User/${id}`, {
      followers: targetUser.followers.filter(
        follower => follower.id !== currentUserID
      )
    });

    dispatch({ type: UNFOLLOW_USER, payload: res.data });
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};
