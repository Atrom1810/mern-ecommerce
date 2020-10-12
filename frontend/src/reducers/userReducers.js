import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case USER_LOGIN_REQUEST:
      // whatever is in state spread it across the object
      return { loading: true };
    // request has been successful -> send data (action.payload)
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    // request failed -> send error
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case USER_REGISTER_REQUEST:
      // whatever is in state spread it across the object
      return { loading: true };
    // request has been successful -> send data (action.payload)
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    // request failed -> send error
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case USER_DETAILS_REQUEST:
      // whatever is in state spread it across the object
      return { ...state, loading: true };
    // request has been successful -> send data (action.payload)
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    // request failed -> send error
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case USER_UPDATE_REQUEST:
      // whatever is in state spread it across the object
      return { ...state, loading: true };
    // request has been successful -> send data (action.payload)
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    // request failed -> send error
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
