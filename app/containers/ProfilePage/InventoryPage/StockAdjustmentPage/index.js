import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Button, message } from 'antd';

import * as actions from '../../../../actions/index';
import StockAdjustmentDetail from './components/StockAdjustmentDetail';

const wrapperStyle = {
  margin: -15,
};

class StockAdjustmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };

    this.props.setToolbarState({
      title: 'Konfirmasi Pengurangan Stok',
      hideBackButton: false,
      showProfile: false,
      showCart: false,
      hideBurgerMenu: true,
    });
  }

  handleSubmit = () => {
    const isNotValid = this.props.adjustments.find(
      (adjustment) => adjustment.note.length === 0
    );
    if (isNotValid) {
      message.error('Alasan pengurangan harus diisi');
    } else {
      const stockAdjusment = this.props.adjustments.map((stock) => {
        const arrayData = {
          id: stock.id,
          branchId: stock.branchId,
          productId: stock.productId,
          quantity: stock.marginQuantity,
          note: stock.note,
        };
        return arrayData;
      });
      this.setState({
        stockAdjusment,
      });
      const datas = { stockAdjusment };
      this.props.postStockAdjusment(datas);
    }
  };
  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    } else if (
      !this.props.adjustmentQuantityCount ||
      this.props.adjustmentQuantityCount === 0
    ) {
      // If no item for adjusment
      return <Redirect to="/profil/informasi-stok-barang" />;
    }

    if (this.props.formSuccess) {
      this.props.storeRequestTDS({
        formSuccess: false,
        adjustments: null,
        adjustmentProductCount: null,
        adjustmentQuantityCount: null,
      });
      return <Redirect to="/profil/informasi-stok-barang" />;
    }

    return (
      <div style={wrapperStyle}>
        <div
          style={{
            backgroundColor: '#fafafa',
            boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
            padding: 15,
            minHeight: 70,
            fontSize: 12,
          }}
        >
          {/* BEGIN Loop Product */}
          {this.props.adjustments &&
            this.props.adjustments.map((product) => (
              <StockAdjustmentDetail
                product={product}
                key={product.productId}
              />
            ))}
          {/* END Loop Product */}
          <Row className="font-color-red mt-15" style={{ fontSize: 11 }}>
            *Note : Lengkapi Alasan Pengurangan
          </Row>
          <Row
            className="box-shadow border-radius p-15 mt-15"
            type="flex"
            justify="space-between"
          >
            <div className="font-weight-bold">Total Pengurangan Stok</div>
            <div className="font-size-normal">
              <span className="font-color-orange">
                {this.props.adjustmentQuantityCount}
              </span>{' '}
              Barang
            </div>
          </Row>

          <Button
            className="btn-block mt-30"
            type="primary"
            loading={this.props.loading}
            disabled={this.props.adjustmentQuantityCount === 0}
            onClick={this.handleSubmit}
          >
            Konfirmasi Pengurangan
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  member: state.get('authentication').member,
  formSuccess: state.get('requestTDS').formSuccess,
  loading: state.get('requestTDS').loading,
  adjustments: state.get('requestTDS').adjustments,
  adjustmentProductCount: state.get('requestTDS').adjustmentProductCount,
  adjustmentQuantityCount: state.get('requestTDS').adjustmentQuantityCount,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  postStockAdjusment: (data) => dispatch(actions.postStockAdjusment(data)),
  storeRequestTDS: (data) => dispatch(actions.storeRequestTDS(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockAdjustmentPage);
