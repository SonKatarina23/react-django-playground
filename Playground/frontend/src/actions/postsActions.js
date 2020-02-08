// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================
import {
  DATA_ALREADY_EXISTS,
  FETCH_POSTS_BY_OWNER,
  FETCH_POSTS_BY_FOLLOWINGS,
  FETCH_SINGLE_POST,
  TOGGLE_LIKE
} from "./type";

import ChadAPI from "../api/ChadAPI";
import _ from "lodash";

export const fetchSinglePost = id => async (dispatch, getState) => {
  const post = getState().posts.find(post => post.id === id);
  if (post) return { type: DATA_ALREADY_EXISTS };
  else {
    try {
      const res = await ChadAPI.get(`Post/${id}`);
      dispatch({
        type: FETCH_SINGLE_POST,
        payload: res.data
      });
    } catch (e) {
      console.log(`Error : ${e}`);
    }
  }
};

export const fetchPostsByOwner = ownerID => async dispatch => {
  try {
    const res = await ChadAPI.get(`Post/?by=${ownerID}`);
    dispatch({
      type: FETCH_POSTS_BY_OWNER,
      payload: _.uniq(res.data)
    });
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

export const fetchPostsByFollowings = ownerID => async dispatch => {
  try {
    const res = await ChadAPI.get(`Post/?AUD=${ownerID}`);
    dispatch({
      type: FETCH_POSTS_BY_FOLLOWINGS,
      payload: _.uniq(res.data)
    });
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

export const toggleLike = id => async (dispatch, getState) => {
  const currentUserID = getState().auth.currentUser.id;
  const posts = getState().posts;
  const targetPost = posts.find(post => post.id === id);

  let tempData;
  const isLiking = targetPost.liked_by.find(userID => userID === currentUserID);
  tempData = {
    liked_by: isLiking
      ? targetPost.liked_by.filter(userID => userID !== currentUserID)
      : [...targetPost.liked_by, currentUserID]
  };

  try {
    const res = await ChadAPI.patch(`Post/${id}/`, tempData);
    dispatch({
      type: TOGGLE_LIKE,
      payload: posts.map(post => {
        if (post.id === id) return res.data;
        else return post;
      })
    });
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};
