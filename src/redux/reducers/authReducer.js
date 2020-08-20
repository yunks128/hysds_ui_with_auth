import { AUTHENTICATE, LOGOUT } from "../constants";

const initialState = {
  user: null,
  authInfo: null,
  authenticated: false,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      return {
        ...state,
        authenticated: action.payload.authenticated,
        authInfo: action.payload.authInfo,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default authReducer;
