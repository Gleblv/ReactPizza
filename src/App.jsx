import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/404';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
