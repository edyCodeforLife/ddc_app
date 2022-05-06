import React from 'react';
import { Icon, Badge } from 'antd';

import { NavLink } from 'react-router-dom';

const addAddress = (props) => (
  <NavLink to={'/profil/buku-alamat/tambah-alamat'}>
    <Icon type="plus" className="clickable"/>
    Tambah
  </NavLink>
);

export default addAddress;
