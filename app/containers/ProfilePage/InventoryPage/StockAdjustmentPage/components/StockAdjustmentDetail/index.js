import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, InputNumber, Icon, Modal, Input } from 'antd';

import * as actions from '../../../../../../actions/index';
import constant from '../../../../../../utils/configs/constant';

const { TextArea } = Input;
const productNameStyle = {
  fontWeight: 'bold',
};

const productQuantityStyle = {
  fontWeight: 'bold',
  color: '#f5821f',
};

class StockAdjustmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showQuantity: false,
      productId: this.props.product.productId,
      quantity: this.props.product.quantity,
      maxQuantity: this.props.product.maxQuantity,
      marginQuantity: this.props.product.marginQuantity,
      name: this.props.product.name,
      id: this.props.product.id,
      branchId: this.props.product.branchId,
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
  componentDidUpdate(prevProps, prevState) {
    if (this.state.showQty !== this.props.showQty) {
      this.state.showQty = true;
    }
    // if (this.state.note !== '') {
    //   this.props.updateAdjustments(this.state);
    // }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.adjustments !== prevProps.adjustments) {
  //     this.props.adjustments();
  //     // console.log(this.props.adjustments);
  //   }
  // }
  onInputChange = (e) => {
    this.setState({
      note: e.target.value,
    });
  };

  onChangeQuantity(quantity) {
    this.setState({
      quantity,
      marginQuantity: this.state.maxQuantity - quantity,
    });
    const data = {
      productId: this.state.product.productId,
      name: this.state.product.productName,
      maxQuantity: this.state.maxQuantity,
      quantity,
      marginQuantity: this.state.maxQuantity - quantity,
      branchId: this.state.product.branchId,
      id: this.state.product.id,
    };
    this.props.updateAdjustments(data);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    this.props.updateAdjustments(data);
    this.handleOk();
  };

  render() {
    const bg = {
      background: '#fff',
    };
    return (
      <React.Fragment>
        {/* BEGIN Modal */}
        <Modal
          title="Alasan Pengurangan"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={
            <Button
              type="primary"
              className="btn-block"
              disabled={this.state.note.length === 0}
              onClick={(e) => this.handleSubmit(e)}
            >
              Simpan
            </Button>
          }
        >
          <Row>
            <div className="font-size-small mb-10">Tulis alasan</div>
            <TextArea
              className="font-size-small"
              style={{ width: '100%' }}
              placeholder="Contoh: 1 Transaksi Offline"
              onChange={(e) => this.onInputChange(e)}
              required
              rows={6}
            />
          </Row>
        </Modal>
        {/* END Modal */}
        <div className="box-shadow border-radius p-15" style={bg}>
          <div className="font-weight-bold">{this.state.name}</div>
          <Row type="flex" justify="space-between">
            <div>
              <div>
                Jumlah Produk :{' '}
                <span className="font-weight-bold font-color-orange">
                  {this.state.maxQuantity}
                </span>
              </div>
              <div className="font-size-smaller font-color-gray">
                {this.state.marginQuantity} Stok dikurangi
              </div>
            </div>
            <div>
              <InputNumber
                min={0}
                max={this.state.maxQuantity}
                defaultValue={this.state.quantity}
                onChange={(e) => this.onChangeQuantity(e)}
              />
            </div>
          </Row>
          <div className="font-size-smaller font-color-gray clickable" onClick={this.showModal}>
            {this.state.note !== '' ? (
              <div>{this.state.note}</div>
            ) : (
              <div className="font-color-red">
                <Icon type="edit" />
                <span> Alasan Pengurangan Stock</span>
              </div>
            )}
          </div>
          <div />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  member: state.get('authentication'),
  //   inventory: state.get('requestTDS').inventory,
  adjustments: state.get('requestTDS').adjustments,
});

const mapDispatchToProps = (dispatch) => ({
  updateAdjustments: (data) => dispatch(actions.updateAdjustments(data)),
  //   setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockAdjustmentDetail);
