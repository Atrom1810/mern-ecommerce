import React, { Fragment, useEffect } from 'react';
// useDispatch to dispatch action - useSelector used to select parts of the state
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
// import actions we want to use in component
import { listProducts } from '../actions/productActions';

const Landing = () => {
  // always declare dispatch
  const dispatch = useDispatch();
  // call this whatever it is called in the store
  // useSelector takes in arrow function -> state => 'what part of state do we want'
  const productList = useSelector((state) => state.productList);
  // destructure what we want from productList
  const { loading, error, products } = productList;

  useEffect(() => {
    // dispatch the action we imported
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Highlights</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};

export default Landing;
