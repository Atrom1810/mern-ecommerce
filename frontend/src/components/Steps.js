import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Steps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Anmelden</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Anmelden</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Lieferung</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Lieferung</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Bezahlung</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Bezahlung</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Bestellung abschließen</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Bestelung abschließen</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default Steps;
