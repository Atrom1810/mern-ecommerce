import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import ShowMoreText from 'react-show-more-text';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CART_RESET_CART } from '../constants/cartConstants';

const ProductPage = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error: userError } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  useEffect(() => {
    if (userInfo) {
      handleClose();
      if (cartItems[0]) {
        if (userInfo._id !== cartItems[0].userId) {
          localStorage.removeItem('cartItems');
          dispatch({ type: CART_RESET_CART });
        }
      }
    }
  }, [userInfo, dispatch, cartItems]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(login(email, password));
    }
  };

  const renderModal = () => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Anmelden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userError && <Message variant="danger">{userError}</Message>}
          <Form onSubmit={submitHandler} onKeyDown={onKeyDown}>
            <Form.Group controlId="email">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-Mail Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Passswort</Form.Label>
              <Form.Control
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p style={{ paddingRight: '30px' }}>
            Neukunde? <Link to="/register">Registrieren</Link>
          </p>
          <Button variant="primary" onClick={submitHandler}>
            Anmelden
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const addItemToCart = () => {
    if (userInfo) {
      addToCartHandler();
    } else {
      handleShow();
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, quantity, userInfo._id));

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  return (
    <Fragment>
      {renderModal()}
      {showMessage ? (
        <Message variant="info">
          {quantity}x {product.name} zum Warenkorb hinzugefügt
        </Message>
      ) : (
        ''
      )}
      <Link className="btn btn-dark my-3" to="/">
        <i className="fas fa-backward"></i>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} Bewertungen`} />
              </ListGroup.Item>
              <ListGroup.Item>Preis: {product.price}€</ListGroup.Item>
              <ListGroup.Item>
                <ShowMoreText lines={6} more="Mehr" less="Weniger" expanded={false}>
                  {product.description}
                </ShowMoreText>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Preis:</Col>
                  <Col>
                    <strong>{product.price}€</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'auf Lager' : 'aktuell nicht auf Lager'}</Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Menge</Col>
                    <Col>
                      <Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((qty) => (
                          <option key={qty + 1} value={qty + 1}>
                            {qty + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={addItemToCart}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Zum Warenkorb hinzufügen
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default ProductPage;
