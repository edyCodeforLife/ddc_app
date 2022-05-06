import React from 'react';
import { Icon, Badge } from 'antd';

import { NavLink } from 'react-router-dom';

const ShoppingCart = (props) => (
  <NavLink to={'/keranjang'} style={{ marginRight: 15 }}>
    <Badge count={props.cartQuantity} title="Keranjang">
      <Icon
        type="shopping-cart"
        style={{ fontSize: '25px' }}
        className="clickable"
      />
    </Badge>
  </NavLink>
);

export default ShoppingCart;
