import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_MYORDERS_REQUEST,
  ORDER_MYORDERS_SUCCESS,
  ORDER_MYORDERS_FAIL,
} from '../constants/orderConstants';
import { CART_RESET_CART } from '../constants/cartConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // send content-type and token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // data is all the data we get from authentication
    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // send content-type and token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // data is all the data we get from authentication
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // send content-type and token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // data is all the data we get from authentication
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_RESET_CART,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response,
    });
  }
};

export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_MYORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // send content-type and token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // data is all the data we get from authentication
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_MYORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_MYORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.response,
    });
  }
};
