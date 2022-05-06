import React from 'react';
import { Row, Col, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import CustomSVG from './../../../../../components/CustomSVG/index';

const AddressCard = (props) => (
  <div
    onClick={() => props.onClickAddress(props.address)}
    style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
      padding: 15,
      marginBottom: 10,
    }}
  >
    {props.address.default === 1 && (
      <Row type="flex" justify="end">
        <div
          style={{
            borderRadius: 3,
            backgroundColor: 'rgba(245, 130, 31, 0.05)',
            border: 'solid 0.5px rgb(245, 130, 31)',
            paddingLeft: 5,
            paddingRight: 5,
            fontSize: 10,
            color: '#f5821f',
          }}
        >
          Alamat Utama
        </div>
      </Row>
    )}

    <Row type="flex" justify="space-between">
      <Col span={2}>
        <Radio checked={props.selectedAddressId === props.address.id} />
      </Col>
      <Col span={22}>
        <div className="font-weight-bold" style={{ marginBottom: 10 }}>
          {props.address.name}
        </div>
        <div>{props.address.phone}</div>
        <div>{props.address.Address}</div>
        {/* <Row type="flex" justify="space-between" style={{ marginTop: 20 }}>
          <NavLink to={''}>
            <Row type="flex" align="middle">
              <CustomSVG name={'ic-edit'} />
              <span style={{ marginLeft: 5 }}>Ubah</span>
            </Row>
          </NavLink>
          {props.address.default !== 1 && (
            <NavLink to={''}>
              <Row type="flex" align="middle">
                <CustomSVG name={'ic-trash'} />
                <span style={{ marginLeft: 5 }}>Hapus</span>
              </Row>
            </NavLink>
          )}
        </Row> */}
      </Col>
    </Row>
  </div>
);

export default AddressCard;
