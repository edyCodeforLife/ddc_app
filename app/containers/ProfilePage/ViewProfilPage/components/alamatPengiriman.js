import React from 'react';
import ImageIcon from '../../../../../assets/images/placeholder/no-image.png';
import { Row, Col, Button, Modal, Icon, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import validationMessages from '../../../../utils/configs/validationMessages';

const FormItem = Form.Item;
class alamatPengiriman extends React.Component {
  render() {
    return (
      <div style={{ padding: '0px 15px', marginTop:-8}}>
        {this.props.pengiriman.memberDeliveryAddress.length > 0 ?( 
        this.props.pengiriman.memberDeliveryAddress.map(
              (address, index) =>
                address.default !== 0 && (
                  <div className="container-photo-detail">
                    <div style={{marginTop:'0px' }}>
                      <Col span={22} style={{paddingBottom:15}}>
                        <span className="title__pengiriman">Alamat Saya</span>
                      </Col>
                      <Col span={2}>
                        <NavLink to={`/profil/akun/edit-alamat/${index}`}>
                          <Icon type="edit" style={{fontSize:16}}/>
                        </NavLink>
                      </Col>
                      <div className="profile__label">Alamat</div>
                      <div
                        className="profile__value"
                        style={{ lineHeight: '20px', marginTop:-3 }}
                      >
                        {address.Address}
                      </div>
                    </div>
                  </div>
                ))
            ):(
              <Row>
              <Col span={22}>
              <span className="title__pengiriman">Alamat Saya</span>
              <p>Silahkan lengkapi data alamat Anda</p>
            </Col>
            <Col span={2}>
              <NavLink to={`/profil/buku-alamat/tambah-alamat`}>
                <Icon type="edit" />
              </NavLink>
            </Col>
            </Row>
            )}
      </div>
    );
  }
}

export default alamatPengiriman;
