import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  const history = useHistory();

  const dispatch = useDispatch();

  const { userInfo } = userLogin;

  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Fragment>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-sign-in-alt"></i> Anmelden
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user-plus"></i> Registrieren
                    </Nav.Link>
                  </LinkContainer>
                </Fragment>
              )}
              {userInfo ? (
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
                  </Nav.Link>
                </LinkContainer>
              ) : (
                ''
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Nutzerkonten</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Produkte</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Bestellungen</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
