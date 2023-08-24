import {
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  REGISTRATION_START,
  LOGOUT,
} from "../types/auth";

const initialState = {
  isAuthenticated: false,
  error: null,
  isLoading: false,
  userInfo: {
    email: null,
  },
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        isAuthenticated: true,
        isLoading: false,
        error: null,
        userInfo: {
          email: action.payload.email,
        },
      };
    case REGISTRATION_ERROR:
      return {
        ...initialState,
        error: action.payload.error,
      };
    case REGISTRATION_START:
    case LOGOUT:
      return {
        ...initialState,
        isLoading: true,
      };
    default:
      return state;
  }
}
