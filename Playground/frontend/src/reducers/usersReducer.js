import { FETCH_SINGLE_USER } from "../actions/type";
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SINGLE_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
