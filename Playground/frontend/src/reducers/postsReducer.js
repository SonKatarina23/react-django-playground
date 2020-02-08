import {
  DATA_ALREADY_EXISTS,
  FETCH_POSTS_BY_OWNER,
  FETCH_POSTS_BY_FOLLOWINGS,
  FETCH_SINGLE_POST
} from "../actions/type";

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_POST:
      return [...state, action.payload];

    case FETCH_POSTS_BY_OWNER:
    case FETCH_POSTS_BY_FOLLOWINGS:
      return action.payload;

    case DATA_ALREADY_EXISTS:
      return state;

    default:
      return state;
  }
};
