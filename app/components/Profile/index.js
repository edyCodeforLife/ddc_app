import React from 'react';
import { Icon, Badge } from 'antd';

import { NavLink } from 'react-router-dom';

const Profile = (props) => (
  <NavLink to={'/profil'} style={{ marginRight: 15 }}>
    <Badge count={0} title="Keranjang">
      <Icon
        type="user"
        style={{ fontSize: '25px' }}
        className="clickable"
      />
    </Badge>
  </NavLink>
);

export default Profile;
