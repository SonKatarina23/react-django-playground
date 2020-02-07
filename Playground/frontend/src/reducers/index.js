// =========================================================================================
// ==================================   REDUCERS   =========================================
// =========================================================================================

import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  users: usersReducer,
  posts: postsReducer,
  auth: authReducer
});
