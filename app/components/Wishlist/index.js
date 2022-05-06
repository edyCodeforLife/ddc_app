import React from 'react';
import { Icon, Badge } from 'antd';

import { NavLink } from 'react-router-dom';

const Wishlist = (props) => (
  <NavLink to={'/favorit'} style={{ marginRight: 15 }}>
    <Badge count={props.wishlist.wishlistCount} title="Produk Favorit">
      <Icon type={'heart-o'} style={{ fontSize: '25px' }} />
    </Badge>
  </NavLink>
);

export default Wishlist;
