import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

function MainTemplate() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainTemplate;
