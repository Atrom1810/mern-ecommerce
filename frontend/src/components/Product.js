import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 grow">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={` ${product.numReviews} Bewertungen`} />
        </Card.Text>
        <Card.Text as="h3">{product.price}€</Card.Text>
        {product.countInStock > 0 ? (
          <h6 style={{ color: '#24d614c0' }}>auf Lager</h6>
        ) : (
          <h6 style={{ color: 'orange' }}>nicht lieferbar</h6>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
