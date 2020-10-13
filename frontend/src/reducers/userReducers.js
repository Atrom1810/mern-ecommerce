import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
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
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_RESET,
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

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case USER_LIST_REQUEST:
      // whatever is in state spread it across the object
      return { ...state, loading: true };
    // request has been successful -> send data (action.payload)
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    // request failed -> send error
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case USER_DELETE_REQUEST:
      // whatever is in state spread it across the object
      return { ...state, loading: true };
    // request has been successful -> send data (action.payload)
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    // request failed -> send error
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userEditReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case USER_EDIT_REQUEST:
      // whatever is in state spread it across the object
      return { ...state, loading: true };
    // request has been successful -> send data (action.payload)
    case USER_EDIT_SUCCESS:
      return { loading: false, success: true };
    // request failed -> send error
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case USER_EDIT_RESET:
      return { user: {} };
    default:
      return state;
  }
};
