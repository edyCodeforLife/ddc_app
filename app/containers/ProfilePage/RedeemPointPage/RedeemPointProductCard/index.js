import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Icon, Button } from 'antd';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

import constant from './../../../../utils/configs/constant';
import CustomImage from '../../../../components/CustomImage';

const RedeemPointProductCard = (props) => (
  <div
    className="box-shadow"
    style={{
      backgroundColor: '#ffffff',
      padding: 15,
    }}
  >
    <Row type="flex" align="start" justify="space-between">
      <Col span={8}>
        {props.product.imageList[0] ? (
          <img
            src={props.product.imageList[0].imagePath}
            style={{ maxWidth: '90%', maxHeight: 120 }}
          />
        ) : (
          <CustomImage
            name={constant.PLACEHOLDER.PRODUCT_IMAGE}
            style={{ maxWidth: '90%', maxHeight: 120 }}
          />
        )}
      </Col>
      <Col span={16}>
        <div className="font-size-small">{props.product.name}</div>
        <div className="mt-15 font-size-big font-weight-bolder">
          <NumberFormat
            value={props.product.purchasePoint}
            displayType={'text'}
            thousandSeparator
          />{' '}
          Poin
        </div>
        <div>
          {props.canSubmit ? (
            <Button
              className="mt-15"
              type="primary"
              loading={props.loading}
              onClick={props.onClickRedeem}
            >
              Tukar Poin Sekarang
            </Button>
          ) : (
            <NavLink to={`/profil/tukar-poin/${props.product.uuid}`}>
              <Button className="mt-15" type="primary">
                Tukar Poin
              </Button>
            </NavLink>
          )}
        </div>
      </Col>
    </Row>
  </div>
);

export default RedeemPointProductCard;
