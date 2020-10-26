import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const Order = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, order, dispatch, successPay, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Fragment>
      <h1>
        Vielen Dank für deine Bestellung <strong>{order.user.name}</strong>
      </h1>
      <h2>Bestellung {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Lieferadresse</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>E-Mail: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Adresse: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zip},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Versendet am {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Versand ausstehend</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Bezahlung</h2>
              <p>
                <strong>Art: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Bezahlt am {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Zahlung ausstehend</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Artikel</h2>
              {order.orderItems.length === 0 ? (
                <Message>Bestellung enthält keine Artikel</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          {/* in order product = id of item */}
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {item.price}€ = {item.quantity * item.price}€
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Bestellübersicht</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Artikel</Col>
                  <Col>{order.itemsPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Lieferung</Col>
                  <Col>{order.shippingPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>MwSt.</Col>
                  <Col>{order.taxPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Gesamt</Col>
                  <Col>{order.totalPrice}€</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                    Versand bestätigen
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Order;
