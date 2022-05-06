import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';

const UpsellingCart = (props) => (
  <div
    className="text-center"
    style={{
      padding: 15,
      marginLeft: -15,
      marginRight: -15,
      marginBottom: -15,
      marginTop: 15,
      backgroundColor: '#F0F0F0',
    }}
  >
    <div>
      Dapatkan <b>Gratis Ongkir</b> dengan Belanja minimal <b>3 Juta</b> untuk pembelian dari Gudang Dusdusan!
    </div>
    <NavLink
      to={'katalog'}
      style={{
        fontSize: 14,
        fontWeight: 'bold',
        textDecoration: 'underline',
      }}
    >
      Belanja Lagi
    </NavLink>
  </div>
);

export default UpsellingCart;
