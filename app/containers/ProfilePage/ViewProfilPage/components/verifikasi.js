import React from 'react';
import ImageIcon from '../../../../../assets/images/placeholder/no-image.png';
import { Row, Col, Button, Modal, Icon, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import validationMessages from '../../../../utils/configs/validationMessages';

const FormItem = Form.Item;
class verifikasi extends React.Component {
  render() {
    const style = {
      fontSize: '10px',
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(22, 184, 178)',
      padding: '5px',
      borderRadius: '10px',
    };
    return (
      <div style={{ padding: '0px 15px', marginTop:-8 }}>
        <div className="container-photo-detail">
          <div>
            <Col span={22} className="title__pengiriman">
              Verifikasi
            </Col>
            {this.props.verifikasi.imageIdCard === '' && (
              <Col span={2} style={{ fontSize: '16px' }}>
                <NavLink to="/profil/akun/verifikasi">
                  <Icon type="edit" />
                </NavLink>
              </Col>
            )}
          </div>
          <div>
            <div className="profile__label">Status</div>
            <Row gutter={9}>
              <Col span={15}>
                {this.props.verifikasi.idCardStatus == 'Verifikasi' ? (
                  <span style={{ color: '#16b8b2' }}>
                    Verifikasi{' '}
                    <Icon
                      type="check-circle"
                      theme="outlined"
                      style={{ color: '#16b8b2' }}
                    />
                  </span>
                ) : this.props.verifikasi.imageIdCard !== '' ? (
                  <div className="profile__value">Menunggu Verifikasi</div>
                ) : (
                  <div className="profile__value" style={{ color: '#e61e3c' }}>
                    Belum Terverifikasi
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default verifikasi;
