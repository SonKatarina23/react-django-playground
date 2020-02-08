import {
  FETCH_SINGLE_USER,
  TOGGLE_FOLLOWING,
  DATA_ALREADY_EXISTS
} from "../actions/type";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER:
      return [...state, action.payload];

    case TOGGLE_FOLLOWING:
      return action.payload;

    case DATA_ALREADY_EXISTS:
      return state;

    default:
      return state;
  }
};
