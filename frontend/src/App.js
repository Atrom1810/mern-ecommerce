import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import OrderPage from './pages/OrderPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentMethodPage} />
          <Route path="/placeorder" component={OrderPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={UserProfilePage} />
          <Route path="/product/:id" component={ProductPage} />
          {/* :id? -> optional if id is there or not */}
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/" component={Landing} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
