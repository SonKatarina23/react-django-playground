import {
  FETCH_SINGLE_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
  DATA_ALREADY_EXISTS
} from "../actions/type";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER:
      return [...state, action.payload];

    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return action.payload;

    case DATA_ALREADY_EXISTS:
      return state;

    default:
      return state;
  }
};
