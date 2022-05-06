import React from 'react';
import ImageIcon from '../../../../../assets/images/placeholder/no-image.png';
import { Row, Col, Button, Modal, Icon, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import validationMessages from '../../../../utils/configs/validationMessages';
import constant from './../../../../utils/configs/constant';
import CustomProfileImage from '../../../../components/CustomProfileImage';

const FormItem = Form.Item;
class toko extends React.Component {
  render(props) {
    const style = {
      padding: '15px 15px',
    };
    return (
      <div style={style}>
        <div style={{ paddingBottom: '15px' }}>
          <Col span={22} className="title__pengiriman">
            Toko Saya
          </Col>
          <Col span={2} style={{ fontSize: '16px' }}>
            <NavLink to="/profil/akun/edit-toko">
              <Icon type="edit" />
            </NavLink>
          </Col>
        </div>
        <div className="container-photo-detail">
          <Row gutter={5}>
            <Col xs={3}>
              <div className="wrap">
                {this.props.toko.memberStore.image !== '' ? (
                  <CustomProfileImage
                    style={{
                      backgroundImage: `url(${
                        this.props.toko.memberStore.image
                      })`,
                    }}
                    className="style__profil-global"
                  />
                ) : (
                  <CustomProfileImage
                    style={{
                      background: '#e1e1e1',
                    }}
                    className="style__profil-global"
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <div className="profile__label" style={{ paddingTop: 15 }}>
            Nama Toko
          </div>
          <div className="nama__warung-class" style={{ paddingTop: '10px' }}>
            {this.props.toko.memberStore.name}
          </div>
        </div>
      </div>
    );
  }
}

export default toko;
