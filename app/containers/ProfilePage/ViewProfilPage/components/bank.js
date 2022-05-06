import React from 'react';
import ImageIcon from '../../../../../assets/images/placeholder/no-image.png';
import { Row, Col, Button, Modal, Icon, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import validationMessages from '../../../../utils/configs/validationMessages';

const FormItem = Form.Item;
class akunBank extends React.Component {
  render() {
    return this.props.bank ? (
      <div style={{ padding: '0px 15px', marginTop: -8 }}>
        <div className="container-photo-detail">
          <Row>
            <div>
              <Col span={22} className="title__pengiriman">
                Bank
              </Col>
              <Col span={2} style={{ fontSize: '16px' }}>
                <NavLink to="/profil/akun/edit-bank">
                  <Icon type="edit" />
                </NavLink>
              </Col>
            </div>
          </Row>
          {this.props.bank.id ? (
            <div>
              <div className="profile__label">Nama Bank</div>
              <div className="profile__value" style={{ paddingBottom: '20px' }}>
                {this.props.bank.bankName}
              </div>
              <div className="profile__label">No Rekening</div>
              <div className="profile__value" style={{ paddingBottom: '20px' }}>
                {this.props.bank.accountNumber}
              </div>
              <div className="profile__label">Nama Pemilik Rekening</div>
              <div className="profile__value" style={{ paddingBottom: '0px' }}>
                {this.props.bank.accountName}
              </div>
            </div>
          ) : (
            <div>silahkan lengkapi data bank Anda</div>
          )}
        </div>
      </div>
    ) : (
      <p>silahkan lengkapi akun bank anda</p>
    );
  }
}
export default akunBank;
