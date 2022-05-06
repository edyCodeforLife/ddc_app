import React from 'react';
import { Row, Col, Button, Modal, Icon, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import validationMessages from '../../../../utils/configs/validationMessages';
import CustomProfileImage from '../../../../components/CustomProfileImage';
import EmpetyImg from '../../../../../assets/images/placeholder/no-image.png';
import BgaboutDDC from '../../../../../assets/images/kopdar-padang-01@2x.png';

const FormItem = Form.Item;
class profile extends React.Component {
  render(props) {
    return (
      <div
        style={{
          paddingBottom: '15px',
          paddingTop: '15px',
          padding: '0px 15px',
          marginTop: '20px',
        }}
      >
        <Row>
          <div>
            <Col span={22} className="title__pengiriman">
              Profil Saya
            </Col>
            <Col span={2} style={{ fontSize: '16px' }}>
              <NavLink to="/profil/akun/edit-profil">
                <Icon type="edit" />
              </NavLink>
            </Col>
          </div>
        </Row>
        <div className="container-photo-detail">
          <Row gutter={5}>
            <Col xs={3}>
              <div className="wrap">
                {this.props.profil.image !== ''  ? (
                  <CustomProfileImage
                    style={{
                      backgroundImage: `url(${this.props.profil.image})`,
                    }}
                    className="style__profil-global"
                  />
                ) : (
                  <CustomProfileImage
                    style={{ background:'#e1e1e1' }}
                    className="style__profil-global"
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '15px' }}>
          <div className="profile__label">Nama Lengkap</div>
          <div
            className="profile__value_alamat"
            style={{ paddingBottom: '20px' }}
          >
            {this.props.profil.firstName}
            {''}
            &nbsp;
            {this.props.profil.lastName}
          </div>
          <div className="profile__label">No.Handphone</div>
          <div
            className="profile__value_alamat"
            style={{ paddingBottom: '20px' }}
          >
            {this.props.profil.phone}
          </div>
          <div className="profile__label">Email</div>
          <div
            className="profile__value_alamat"
            style={{ paddingBottom: '0px' }}
          >
            {this.props.profil.email}
          </div>
        </div>
      </div>
    );
  }
}

export default profile;
