import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Button, InputNumber, Alert, Icon } from 'antd';

import * as actions from '../../../../actions/index';
import constant from '../../../../utils/configs/constant';
import DarkTitle from '../../../../components/UI/DarkTitle';
import CustomImage from '../../../../components/CustomImage';
import NumberFormat from 'react-number-format';
// import CustomSVG from './../../components/CustomSVG';

const wrapperStyle = {
  margin: -15,
};

const productNameStyle = {
  fontWeight: 'bold',
};

const productQuantityStyle = {
  fontWeight: 'bold',
  color: '#f5821f',
};
const buttonKurangiStock = {
  backgroundColor: '#f5821f',
  //   borderRadius: '3px',
  textAlign: 'center',
  boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
};

class listStockProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQty: false,
      Quantity: null,
      maxQuantity: this.props.stock.quantity,
      closeAlert: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showQty !== this.props.showQty) {
      this.state.showQty = true;
    }
  }

  handleStock = () => {
    this.setState({
      showQty: !this.state.showQty,
    });
  };

  changeOrderQuantity(value) {
    this.setState({
      value,
    });
  }

  closableAlert = () => {
    this.setState({
      closeAlert: true,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.value > this.props.stock.quantity && (
            <Alert
              message="Error"
              description={`Stock Semula Anda ${this.props.stock.quantity}`}
              type="error"
              onClose={this.closableAlert}
              showIcon
            />
          )}
        </div>
        {this.props.stock !== null && (
          <Row
            key={this.props.stock.productId}
            type="flex"
            style={{
              borderBottom: 'solid 1px #f0f0f0',
              paddingTop: 15,
              paddingBottom: 15,
              marginLeft: '15px',
              marginRight: '15px',
            }}
          >
            <Col>
              {this.props.stock.productImage ? (
                <img
                  src={this.props.stock.productImage[0].imagePath}
                  style={{ width: 40, height: 40, borderRadius: 3 }}
                />
              ) : (
                <CustomImage
                  name={constant.PLACEHOLDER.PRODUCT_IMAGE}
                  style={{ width: 40, height: 40, borderRadius: 3 }}
                />
              )}
            </Col>
            <Col style={{ marginLeft: 5 }} span={20}>
              <div style={productNameStyle}>{this.props.stock.productName}</div>
              <Col span={19}>
                <div>
                  Jumlah Produk :{' '}
                  <span style={productQuantityStyle}>
                    {this.props.stock.quantity}
                  </span>
                </div>
              </Col>
              {this.state.showQty ? (
                <Col span={5}>
                  <InputNumber
                    min={1}
                    max={this.state.maxQuantity}
                    defaultValue={this.props.stock.quantity - 1}
                    onChange={(e) => this.changeOrderQuantity(e)}
                  />
                </Col>
              ) : (
                <Col span={5} className="clickable" onClick={this.handleStock}>
                  <div style={buttonKurangiStock}>
                    <span className="kurangi__stock-produk">Kurangi</span>
                  </div>
                </Col>
              )}
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  //   authentication: state.get('authentication'),
  //   inventory: state.get('requestTDS').inventory,
});

const mapDispatchToProps = (dispatch) => ({
  //   getTDSInventory: () => dispatch(actions.getTDSInventory()),
  //   setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(listStockProduct);
