import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Steps from '../components/Steps';
import { Form, Button, Col } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentMethodPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <h1>Bezahlmethode</h1>
      <Steps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Art der Bezahlung wählen</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal oder Kreditkarte"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Überweisung"
              id="Transaction"
              name="paymentMethod"
              value="Überweisung"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Weiter zur Bestellübersicht
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodPage;
