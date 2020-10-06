import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
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
    default:
      return state;
  }
};
