// =========================================================================================
// ==================================   ACTIONS   ==========================================
// =========================================================================================

import { FETCH_SINGLE_USER, DATA_ALREADY_EXISTS } from "./type";
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
