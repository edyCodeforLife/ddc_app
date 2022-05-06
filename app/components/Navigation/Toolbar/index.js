import React from 'react';
import { Icon, Row } from 'antd';

import DrawerToggle from './../SideDrawer/DrawerToggle';
import Logo from './../../Logo';
import Wishlist from './../../Wishlist';
import ShoppingCart from '../../ShoppingCart';
import Profile from './../../Profile';
import AddAddress from './../../AddAddress';

const toolbar = (props) => (
  <div className="toolbar">
    {!props.toolbar.title ? (
      <div className="logo">
        <Logo logo={props.logo} />
      </div>
    ) : (
      // Back Button & Title
      <Row type="flex" justify="center">
        {!props.toolbar.hideBackButton && (
          <Icon
            type={props.toolbar.icon}
            className="clickable"
            style={{ fontSize: 24, marginLeft: 10 }}
            onClick={props.goBackClicked}
          />
        )}
        <span
          className="font-weight-bold"
          style={{ marginTop: 2, marginLeft: 10, fontSize: 16 }}
        >
          {props.toolbar.title}
        </span>
      </Row>
    )}
    <Row type="flex" align="middle">
      {props.toolbar.showAddAddress && <AddAddress />}
      {props.toolbar.showProfile && <Profile token={props.token} />}
      {props.toolbar.showWishlist && <Wishlist wishlist={props.wishlist} />}
      {props.toolbar.title === 'Wishlist' && (
        <span className="font-size-small font-color-red">
          Ada {props.wishlist.wishlistCount} produk disukai
        </span>
      )}
      {props.toolbar.showCart && (
        <ShoppingCart cartQuantity={props.cartQuantity} />
      )}
      {!props.toolbar.hideBurgerMenu && (
        <DrawerToggle clicked={props.drawerToggleClicked} />
      )}
    </Row>
  </div>
);

export default toolbar;
