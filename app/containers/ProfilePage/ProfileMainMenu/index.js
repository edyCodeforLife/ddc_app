import React from 'react';
import { Row } from 'antd';

import ProfileMenuButton from './ProfileMenuButton';

const ProfileMainMenu = (props) => (
  <div
    style={{
      marginTop: 20,
      backgroundColor: '#ffffff',
      // boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    }}
  >
    {/* BEGIN Half Block Menu */}
    <Row type="flex" align="middle">
      <ProfileMenuButton
        link="/profil/pesan"
        label="Pesan"
        span="12"
        icon="ic-pesan"
      />
      <ProfileMenuButton
        link="/profil/transaksi"
        label="Transaksi"
        span="12"
        icon="ic-transaksi"
      />
      {props.member.memberTypeName !== 'Member Non Reseller' &&
        props.member.trial === 0 && (
          <ProfileMenuButton
            link="/profil/cari-tds"
            label="TDS"
            span="12"
            icon="ic-tds"
          />
        )}
      <ProfileMenuButton
        link="/profil/akun"
        label="Akun"
        span="12"
        icon="ic-akun"
      />
      {props.member.memberTypeName === 'Reseller' &&
        props.member.trial && (
          <ProfileMenuButton
            link="/profil/upgrade-member"
            label="Trial 14 Hari"
            span="12"
            icon="ic-trial"
          />
        )}
      {props.member.memberTypeName === 'Member Non Reseller' &&
        props.member.trial === 0 && (
          <ProfileMenuButton
            link="/profil/upgrade-member"
            label="Upgrade"
            span="12"
            icon="ic-upgrade"
          />
        )}
    </Row>
    {/* END Half Block Menu */}

    {/* BEGIN Full Block Menu */}
    {props.member.memberTypeName === 'TDS' && (
      <Row type="flex" align="middle">
        <ProfileMenuButton
          link="/profil/penjualan"
          label="Menu Penjualan"
          span="24"
          icon="ic-menu-penjualan"
        />
        <ProfileMenuButton
          link="/profil/informasi-stok-barang"
          label="Informasi Stok Barang"
          span="24"
          icon="ic-informasi-stok-barang"
        />
      </Row>
    )}
    {/* END Full Block Menu */}
  </div>
);

export default ProfileMainMenu;
