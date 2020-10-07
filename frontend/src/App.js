import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Landing} exact />
          <Route path="/product/:id" component={ProductPage} />
          {/* :id? -> optional if id is there or not */}
          <Route path="/cart/:id?" component={Cart} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
