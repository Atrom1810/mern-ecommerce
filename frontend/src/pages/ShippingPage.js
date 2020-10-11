import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Steps from '../components/Steps';
import { Form, Button } from 'react-bootstrap';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zip, setZip] = useState(shippingAddress.zip);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, zip, country }));
    history.push('/payment');
  };
  return (
    <FormContainer>
      <h1>Lieferdaten</h1>
      <Steps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Stadt</Form.Label>
          <Form.Control
            type="text"
            placeholder="Stadt"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="zip">
          <Form.Label>PLZ</Form.Label>
          <Form.Control
            type="text"
            placeholder="PLZ"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Land</Form.Label>
          <Form.Control
            type="text"
            placeholder="Land"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Art der Bezahlung wählen
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
