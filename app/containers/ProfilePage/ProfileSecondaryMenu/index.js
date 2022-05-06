import React from 'react';

import ProfileSecondaryMenuButton from './ProfileSecondaryMenuButton';

const ProfileSecondaryMenu = (props) => (
  <React.Fragment>
    <div
      style={{
        marginTop: 10,
        backgroundColor: '#ffffff',
        // boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
      }}
    >
      {props.member.memberTypeName === 'TDS' && (
        <React.Fragment>
          <ProfileSecondaryMenuButton
            link="/profil/cek-member"
            label="Cek Member"
            icon="ic-cek-member"
          />
          <ProfileSecondaryMenuButton
            label="Titip Dropship?"
            icon="ic-titip-dropship"
            showStoreOpen={props.showStoreOpen}
            storeIsOpen={props.storeIsOpen}
            onChangeOpenCloseStore={props.onChangeOpenCloseStore}
          />
        </React.Fragment>
      )}

      {props.member.memberTypeName === 'Reseller' &&
        !props.member.trial && (
          <React.Fragment>
            <ProfileSecondaryMenuButton
              link="/profil/cek-member"
              label="Cek Member"
              icon="ic-cek-member"
            />
          </React.Fragment>
        )}

      {props.member.memberTypeName === 'Reseller' &&
        props.member.memberLevelId == 4 && (
          <React.Fragment>
            <div className="clickable">
              <ProfileSecondaryMenuButton
                label="Request Jadi TDS"
                icon="ic-request-jadi-tds"
                onClickRequestTDS={props.onClickRequestTDS}
                showStatusRequestTDS={props.showStatusRequestTDS}
              />
            </div>
          </React.Fragment>
        )}

      <ProfileSecondaryMenuButton
        link="/profil/buku-alamat"
        label="Buku Alamat"
        icon="ic-buku-alamat"
      />
      {props.member.memberTypeName !== 'Member Non Reseller' &&
        !props.member.trial && (
          <React.Fragment>
            <ProfileSecondaryMenuButton
              link="/profil/ajak-teman"
              label="Ajak Teman"
              icon="ic-ajak-teman"
            />
          </React.Fragment>
        )}
      <ProfileSecondaryMenuButton
        link="/komunitas/artikel"
        label="Komunitas"
        icon="ic-komunitas"
      />
    </div>
    <div
      style={{
        marginTop: 10,
        backgroundColor: '#ffffff',
        // boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
      }}
    >
      <div className="clickable">
        <ProfileSecondaryMenuButton
          label="Keluar"
          icon="ic-keluar"
          onClickLogout={props.onClickLogout}
        />
      </div>
    </div>
  </React.Fragment>
);

export default ProfileSecondaryMenu;
