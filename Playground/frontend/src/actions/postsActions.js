// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================
import {
  DATA_ALREADY_EXISTS,
  FETCH_POSTS_BY_OWNER,
  FETCH_POSTS_BY_FOLLOWINGS,
  FETCH_SINGLE_POST
} from "./type";

import ChadAPI from "../api/ChadAPI";
import _ from "lodash";

export const fetchSinglePost = id => async (dispatch, getState) => {
  const post = getState().posts.find(post => post.id === id);
  if (post) dispatch({ type: DATA_ALREADY_EXISTS });
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
