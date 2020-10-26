import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants';
// reducer takes initial state and action as arguments
// action has type and payload
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    // request has been successful -> send data (action.payload)
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    // request failed -> send error
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//  reviews is an array -> has to be declared additionally
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    // product list requests -> while user waits it is loading
    case PRODUCT_DETAILS_REQUEST:
      // whatever is in state spread it across the object
      return { loading: true, ...state };
    // request has been successful -> send data (action.payload)
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    // request failed -> send error
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { product: { reviews: [] } };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    // request has been successful -> send data (action.payload)
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    // request failed -> send error
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    // request has been successful -> send data (action.payload)
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    // request failed -> send error
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    // request has been successful -> send data (action.payload)
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    // request failed -> send error
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
