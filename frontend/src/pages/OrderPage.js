import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Steps from '../components/Steps';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { createOrder } from '../actions/orderActions';

const OrderPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //   calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 50 ? 0 : 7.9);
  cart.taxPrice = addDecimals(Number((0.19 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <Fragment>
      <Steps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Lieferadresse</h2>
              <p>
                <strong>Adresse: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.zip},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Bezahlung</h2>
              <strong>Art: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Artikel</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Keine Artikel im Warenkorb</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          {/* in cart product = id of item */}
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
                  <Col>{cart.itemsPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Lieferung</Col>
                  <Col>{cart.shippingPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>MwSt.</Col>
                  <Col>{cart.taxPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Gesamt</Col>
                  <Col>{cart.totalPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                  Bestellung abschließen
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderPage;
