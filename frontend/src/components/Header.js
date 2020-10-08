import React from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>TechShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-sign-in-alt"></i> Anmelden
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>{' '}
                  {cartItems.length > 0 ? (
                    <Badge pill variant="info">
                      {cartItems.length}
                    </Badge>
                  ) : (
                    ''
                  )}{' '}
                  Warenkorb
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
