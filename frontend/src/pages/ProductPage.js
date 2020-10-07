import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import ShowMoreText from 'react-show-more-text';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  console.log(product.rating);

  return (
    <Fragment>
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
                  onClick={addToCartHandler}
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
