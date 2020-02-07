import { REGISTER_USER } from "../actions/type";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      const { user, token } = action.payload;
      localStorage.setItem("token", token);
      console.log("Registration success");
      return {
        ...state,
        isAuthenticated: true,
        token,
        currentUser: user
      };

    default:
      return state;
  }
};
