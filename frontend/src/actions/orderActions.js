import { ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST } from '../constants/orderConstants';
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
