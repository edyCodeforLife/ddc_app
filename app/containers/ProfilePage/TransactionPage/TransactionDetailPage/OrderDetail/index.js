import React from 'react';
import { Row, Col, Icon } from 'antd';
import NumberFormat from 'react-number-format';

import constant from '../../../../../utils/configs/constant';

export class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllDescription: false,
    };
  }

  onClickShowAllDescription = () => {
    this.setState({ showAllDescription: !this.state.showAllDescription });
  };

  render() {
    let descriptions = [];
    if (this.props.order.deliveryMethod === 'Ambil Sendiri') {
      descriptions = [
        {
          label: 'Pengiriman',
          value: this.props.order.deliveryMethod,
        },
        {
          label: 'Nama Penerima',
          value: this.props.order.receiverName,
        },
        {
          label: 'Ambil Barang di',
          value: this.props.order.branchNameOrigin,
        },
        {
          label: 'No. Handphone',
          value: this.props.order.phoneOrigin,
        },
        {
          label: 'Alamat',
          value: this.props.order.addressOrigin,
        },
        {
          label: 'Provinsi',
          value: this.props.order.provinceOrigin,
        },
        {
          label: 'Kota / Kabupaten',
          value: this.props.order.cityOrigin,
        },
      ];
    } else {
      descriptions = [
        {
          label: 'Pengiriman',
          value: this.props.order.deliveryMethod,
        },
        {
          label: 'Nama Penerima',
          value: this.props.order.receiverName,
        },
        {
          label: 'No. Handphone',
          value: this.props.order.phoneDestination,
        },
        {
          label: 'Alamat',
          value: this.props.order.addressDestination,
        },
        {
          label: 'Provinsi',
          value: this.props.order.provinceDestination,
        },
        {
          label: 'Kota / Kabupaten',
          value: this.props.order.cityDestination,
        },
        {
          label: 'Kecamatan',
          value: this.props.order.districtDestination,
        },
        {
          label: 'Kode Pos',
          value: this.props.order.postalCodeDestination,
        },
        {
          label: 'Rekomendasi',
          value: this.props.order.recommendType,
        },
        {
          label: 'Dikirim Oleh',
          value: this.props.order.branchNameOrigin,
        },
        {
          label: 'Kurir',
          value: this.props.order.shippingName,
        },
        {
          label: 'Biaya',
          value: this.props.product.totalPrice,
        },
        {
          label: 'Estimasi',
          value: this.props.order.shippingEtd,
        },
      ];
    }

    return (
      <div className="pt-15 pl-15 pr-15 font-size-small">
        <Row>
          <Col span={6}>
            <div
              style={{
                minHeight: 60,
                maxHeight: 80,
                width: '80%',
                backgroundColor: '#e6e6e6',
              }}
            >
              <img
                style={{ width: '100%' }}
                src={ this.props.product.image}
              />
            </div>
          </Col>
          <Col span={18}>
            <div className="font-weight-bold">{this.props.product.name}</div>
            <div className="mt-1">
              <NumberFormat
                value={this.props.product.price}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp '}
                suffix={'/pc'}
              />
              &nbsp; x&nbsp;
              <NumberFormat
                value={this.props.product.quantity}
                displayType={'text'}
                thousandSeparator
              />
            </div>
            <div className="font-weight-bold">
              ={' '}
              <NumberFormat
                value={this.props.product.totalPrice}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp '}
              />
            </div>
            <div className="mt-1" style={{ fontSize: 10 }}>
              Berat Total:{' '}
              <NumberFormat
                value={this.props.order.totalWeight / 1000}
                displayType={'text'}
                thousandSeparator
                suffix={' kg'}
              />
            </div>
          </Col>
        </Row>

        {/* BEGIN Shipping Information */}
        {this.state.showAllDescription &&
          !this.props.isLast && (
            <div className="mt-15">
              {descriptions.map((description, index) => (
                <Row key={index}>
                  <Col span={9}>{description.label}</Col>
                  <Col span={1}>:</Col>
                  <Col span={14}>
                    {description.label === 'Biaya' ? (
                      <NumberFormat
                        value={description.value}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp '}
                      />
                    ) : (
                      description.value
                    )}
                  </Col>
                </Row>
              ))}
            </div>
          )}

        {this.props.isLast && (
          <div className="mt-15">
            {descriptions
              .slice(0, this.state.showAllDescription ? 30 : 4)
              .map((description, index) => (
                <Row key={index}>
                  <Col span={9}>{description.label}</Col>
                  <Col span={1}>:</Col>
                  <Col span={14}>
                    {description.label === 'Biaya' ? (
                      <NumberFormat
                        value={description.value}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp '}
                      />
                    ) : (
                      description.value
                    )}
                  </Col>
                </Row>
              ))}
          </div>
        )}
        {/* END Shipping Information */}

        <Row
          type="flex"
          justify="center"
          style={{ marginTop: 15, fontSize: 18 }}
        >
          <Icon
            className="clickable"
            type={this.state.showAllDescription ? 'up' : 'down'}
            onClick={this.onClickShowAllDescription}
            style={{ color: '#8c8c8c' }}
          />
        </Row>

        <div
          style={{
            marginLeft: -15,
            marginRight: -15,
            marginTop: 15,
            borderBottom: '1px solid #28282833',
          }}
        />
      </div>
    );
  }
}

export default OrderDetail;
