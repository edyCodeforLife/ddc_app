import React from 'react';
import { Row } from 'antd';

import NavigationItem from './NavigationItem';
import CustomSVG from '../../CustomSVG';
import FooterHelper from './../../FooterHelper/index';

const helpButtonStyle = {
  height: 40,
  width: 40,
  marginTop: 10,
  marginRight: 10,
};


const navigationItems = (props) => (
  <ul className="navigationItems">
    <NavigationItem link="/beranda" icon={'ic-beranda'}>
      Beranda
    </NavigationItem>
    {!props.authentication.isAuthenticated ? (
      <NavigationItem link="/login" icon={'ic-masuk'}>
        Masuk Akun
      </NavigationItem>
    ) : null}
    {!props.authentication.isAuthenticated ? (
      <NavigationItem link="/registrasi-member-reseller" icon={'ic-daftar'}>
        Daftar Reseller
      </NavigationItem>
    ) : null}
    <NavigationItem link="/katalog" icon={'ic-katalog'}>
      Katalog
    </NavigationItem>
    <NavigationItem link="/komunitas/artikel" icon={'ic-komunitas'}>
      Komunitas
    </NavigationItem>
    <NavigationItem link="/etika-reseller" icon={'ic-etika-reseller'}>
      Etika Reseller
    </NavigationItem>
    {props.authentication.isAuthenticated && (
      <NavigationItem
        link="/konfirmasi-pembayaran"
        icon={'ic-konfirmasi-pembayaran'}
      >
        Konfirmasi Pembayaran
      </NavigationItem>
    )}
    <NavigationItem link="/tentang-dusdusan" icon={'ic-tentang-perusahaan'}>
      Perusahaan
    </NavigationItem>
  </ul>
);

export default navigationItems;
