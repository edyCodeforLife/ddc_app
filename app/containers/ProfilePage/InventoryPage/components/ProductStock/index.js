import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, InputNumber, Icon } from 'antd';

import * as actions from '../../../../../actions/index';
import constant from '../../../../../utils/configs/constant';
import CustomImage from '../../../../../components/CustomImage';

const productNameStyle = {
  fontWeight: 'bold',
};

const productQuantityStyle = {
  fontWeight: 'bold',
  color: '#f5821f',
};

const bookedQuantity = {
  fontWeight: 'bolder',
  color: 'black',
};

class ProductStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuantity: false,
      product: this.props.product,
      quantity: this.props.product.quantity,
      maxQuantity: this.props.product.quantity,
      branchId: this.props.product.branchId,
      id: this.props.product.id,
      note: '',
    };
  }

  componentDidMount() {
    const adjustments = this.props.adjustments;
    if (adjustments) {
      // If adjustments not null
      const product = adjustments.find(
        (product) => product.productId === this.props.product.productId
      );
      // console.log(product);
      if (product) {
        // If Product already exist
        this.setState({
          showQuantity: true,
          quantity: product.quantity,
        });
      }
    }
  }

  handleStock = () => {
    this.setState({
      showQuantity: true,
    });
    this.onChangeQuantity(this.state.quantity - 1);
  };

  onChangeQuantity(quantity) {
    let showQuantity = true;
    if (quantity === this.state.maxQuantity) {
      showQuantity = false;
    }
    this.setState({
      quantity,
      showQuantity,
    });

    const data = {
      productId: this.state.product.productId,
      name: this.state.product.productName,
      maxQuantity: this.state.maxQuantity,
      quantity,
      marginQuantity: this.state.maxQuantity - quantity,
      note: '',
      branchId: this.state.product.id,
      id: this.state.product.id,
    };
    this.props.updateAdjustments(data);
  }

  render() {
    return (
      <Row
        type="flex"
        style={{
          borderBottom: 'solid 1px #f0f0f0',
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <Col span={4}>
          {this.props.product.productImage ? (
            <img
              src={this.props.product.productImage[0].imagePath}
              style={{ width: 40, height: 40, borderRadius: 3 }}
            />
          ) : (
            <CustomImage
              name={constant.PLACEHOLDER.PRODUCT_IMAGE}
              style={{ width: 40, height: 40, borderRadius: 3 }}
            />
          )}
        </Col>
        <Col span={20}>
          <div style={productNameStyle}>{this.props.product.productName}</div>
          <Row type="flex" justify="space-between">
            <Col style={productQuantityStyle}>
              Jumlah Produk :{` ${this.props.product.quantity}`}
            </Col>
            <div>
              {this.state.showQuantity ? (
                <InputNumber
                  min={0}
                  max={this.state.maxQuantity}
                  defaultValue={this.state.quantity}
                  onChange={(e) => this.onChangeQuantity(e)}
                />
              ) : (
                <Button
                  className="inventory__btn--decrease"
                  size="small"
                  disabled={this.state.maxQuantity === 0}
                  onClick={this.handleStock}
                >
                  Kurangi
                </Button>
              )}
            </div>
          </Row>
          <Col style={bookedQuantity}>
            Dipesan : {this.props.product.bookedQuantity}
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  member: state.get('authentication'),
  adjustments: state.get('requestTDS').adjustments,
});

const mapDispatchToProps = (dispatch) => ({
  updateAdjustments: (data) => dispatch(actions.updateAdjustments(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductStock);
