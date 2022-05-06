import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import NumberFormat from 'react-number-format';

import * as actions from '../../../actions/index';
import constant from '../../../utils/configs/constant';
import CustomSVG from './../../../components/CustomSVG/index';
import CustomImage from '../../../components/CustomImage';

const disableStyle = {
  opacity: 0.2,
};

export class ProductDetailCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllDescription: false,
    };
  }

  onClickShowAllDescription = () => {
    this.setState({ showAllDescription: !this.state.showAllDescription });
  };

  /**
   * Delete cart by id
   */
  onClickDeleteCart = (cartId) => {
    // console.log(cartId);
    this.props.deleteCart({ id: cartId });
  };

  render() {
    let descriptions = [];

    // Get new cart
    if (this.props.formSuccess) {
      this.props.getCarts();
      this.props.storeCart({ formSuccess: false });
    }
    if (this.props.cart.deliveryMethod === 'Ambil Sendiri') {
      descriptions = [
        {
          label: 'Pengiriman',
          value: this.props.cart.deliveryMethod,
        },
        {
          label: 'Nama Penerima',
          value: this.props.cart.receiverName,
        },
        {
          label: 'Ambil Barang di',
          value: this.props.cart.branchNameOrigin,
        },
        {
          label: 'No. Handphone',
          value: this.props.cart.phoneOrigin,
        },
        {
          label: 'Alamat',
          value: this.props.cart.addressOrigin,
        },
        {
          label: 'Provinsi',
          value: this.props.cart.provinceOrigin,
        },
        {
          label: 'Kota / Kabupaten',
          value: this.props.cart.cityOrigin,
        },
      ];
    } else {
      descriptions = [
        {
          label: 'Pengiriman',
          value: this.props.cart.deliveryMethod,
        },
        {
          label: 'Nama Penerima',
          value: this.props.cart.receiverName,
        },
        {
          label: 'No. Handphone',
          value: this.props.cart.phoneDestination,
        },
        {
          label: 'Alamat',
          value: this.props.cart.addressDestination,
        },
        {
          label: 'Provinsi',
          value: this.props.cart.provinceDestination,
        },
        {
          label: 'Kota / Kabupaten',
          value: this.props.cart.cityDestination,
        },
        {
          label: 'Kecamatan',
          value: this.props.cart.districtDestination,
        },
        {
          label: 'Kode Pos',
          value: this.props.cart.postalCodeDestination,
        },
        {
          label: 'Rekomendasi',
          value: this.props.cart.recommendType,
        },
        {
          label: 'Dikirim Oleh',
          value: this.props.cart.branchNameOrigin,
        },
        {
          label: 'Kurir',
          value: this.props.cart.shippingName,
        },
        {
          label: 'Biaya',
          value: this.props.product.totalPrice,
        },
        {
          label: 'Estimasi',
          value: this.props.cart.shippingEtd,
        },
      ];
    }

    return (
      <div>
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
              {this.props.product.productImage ? (
                <img
                  style={{ width: '100%' }}
                  src={this.props.product.productImage}
                />
              ) : (
                <CustomImage
                  name={constant.PLACEHOLDER.PRODUCT_IMAGE}
                  style={{ width: '100%' }}
                />
              )}
            </div>
          </Col>
          <Col span={18}>
            <div className="font-weight-bold">
              {this.props.product.productName}
            </div>
            <div className="mt-1">
              <NumberFormat
                value={this.props.product.price}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp '}
                suffix={'/pc'}
              />
              &nbsp;
              {this.props.product.discountValue > 0 &&
                `(-${this.props.product.discountValue}%)`}
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
                value={this.props.product.totalWeight/1000}
                displayType={'text'}
                thousandSeparator
                decimalScale={1}
                suffix={' kg'}
              />
            </div>
          </Col>
        </Row>

        {this.props.product.productByOneGetOne.id !== 0 && (
          <div
            style={{
              marginTop: 15,
              padding: 15,
              borderRadius: 3,
              border: 'solid 0.5px #dcdcdc',
            }}
          >
            <Row className="font-size-small font-weight-bold">
              <Col span={6}>
                <div
                  style={{
                    minHeight: 50,
                    maxHeight: 50,
                    width: '80%',
                    backgroundColor: '#e6e6e6',
                  }}
                >
                  {this.props.product.productImage ? (
                    <img
                      style={{ width: '100%' }}
                      src={this.props.product.productImage}
                    />
                  ) : (
                    <CustomImage
                      name={constant.PLACEHOLDER.PRODUCT_IMAGE}
                      style={{ width: '100%' }}
                    />
                  )}
                </div>
              </Col>
              <Col span={14}>
                <div>
                  <span>Free&nbsp;</span>
                  {this.props.product.productByOneGetOne.productName}
                </div>
                <div>(Buy One Get One)</div>
              </Col>
              <Col span={4}>
                <div
                  className="text-center"
                  style={{
                    color: '#ff0a00',
                    border: 'solid 1px #ff0a00',
                  }}
                >
                  Free
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* BEGIN Shipping Information */}
        {this.state.showAllDescription &&
          !this.props.isLast && (
            <div
              style={{
                marginTop: 15,
                padding: 15,
                borderRadius: 3,
                border: 'solid 0.5px #dcdcdc',
              }}
            >
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
          <div
            style={{
              marginTop: 15,
              padding: 15,
              borderRadius: 3,
              border: 'solid 0.5px #dcdcdc',
            }}
          >
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
          justify="space-between"
          style={{ marginTop: 15, marginBottom: 15, fontSize: 18 }}
        >
          {this.props.isWaitingShippingFee ? (
            // Disable
            <React.Fragment>
              <div>
                <CustomSVG
                  className="clickable"
                  name={'ic-trash'}
                  style={this.props.isWaitingShippingFee ? disableStyle : null}
                />
              </div>
              <Icon
                className="clickable"
                type={this.state.showAllDescription ? 'up' : 'down'}
                onClick={this.onClickShowAllDescription}
                style={{ color: '#8c8c8c' }}
              />
              <CustomSVG
                className="clickable"
                name={'ic-edit'}
                style={this.props.isWaitingShippingFee ? disableStyle : null}
              />
            </React.Fragment>
          ) : (
            // Enable
            <React.Fragment>
              <div
                onClick={() => this.onClickDeleteCart(this.props.product.uuid)}
              >
                <CustomSVG
                  className="clickable"
                  name={'ic-trash'}
                  style={this.props.isWaitingShippingFee ? disableStyle : null}
                />
              </div>
              <Icon
                className="clickable"
                type={this.state.showAllDescription ? 'up' : 'down'}
                onClick={this.onClickShowAllDescription}
                style={{ color: '#8c8c8c' }}
              />
              <NavLink to={`/order/ubah/${this.props.product.uuid}`}>
                <CustomSVG
                  className="clickable"
                  name={'ic-edit'}
                  style={this.props.isWaitingShippingFee ? disableStyle : null}
                />
              </NavLink>
            </React.Fragment>
          )}
        </Row>

        <div
          style={{
            marginLeft: -15,
            marginRight: -15,
            marginBottom: 15,
            borderBottom: '1px solid #28282833',
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  formSuccess: state.get('cart').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  getCarts: () => dispatch(actions.getCarts()),
  deleteCart: (data) => dispatch(actions.deleteCart(data)),
  storeCart: (data) => dispatch(actions.storeCart(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailCart);
