import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      const { user, token } = action.payload;
      localStorage.setItem("token", token);
      console.log(user);
      return {
        ...state,
        isAuthenticated: true,
        token,
        currentUser: user
      };

    case REGISTER_FAILED:
    case LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        currentUser: null
      };
    default:
      return state;
  }
};
