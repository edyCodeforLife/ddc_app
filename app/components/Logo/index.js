import React from 'react';
import { NavLink } from 'react-router-dom';

import burgerLogo from '../../../assets/images/logo/logo-ddc.png';

const logo = (props) => (
  <NavLink to={'/'}>
    <img className="logoDusdusan" src={burgerLogo} alt="Dusdusan.com" />
  </NavLink>
);

export default logo;
