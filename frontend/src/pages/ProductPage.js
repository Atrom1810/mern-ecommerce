import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import ShowMoreText from 'react-show-more-text';
import Rating from '../components/Rating';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };
    fetchProduct();
  }, [match.params.id]);

  return (
    <Fragment>
      <Link className="btn btn-dark my-3" to="/">
        <i className="fas fa-backward"></i>
      </Link>
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
            <ListGroup.Item>
              <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                Zum Warenkorb hinzufügen
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductPage;
