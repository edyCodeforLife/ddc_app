import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col } from 'antd';

import * as actions from '../../../../actions/index';
import TextArea from 'antd/lib/input/TextArea';

const FilterStatus = (props) => (
  <Row
    className="clickable"
    type="flex"
    justify="space-between"
    style={{ padding: 15, height: 55 }}
    onClick={() => props.onClickOrderStatusId(props.orderStatusId)}
  >
    <Col>{props.label}</Col>
    <Col>
      {props.orderStatusId === props.activeOrderStatusId && (
        <Icon type="check" style={{ fontSize: 18 }} />
      )}
    </Col>
  </Row>
);

class SalesFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatusId: props.activeOrderStatusId,
      uuid: this.props.uuid,
      reason: '',
    };
  }

  /**
   * After rendering (DOM available)
   */

  componentDidUpdate(prevProps, prevState) {}

  onClickOrderStatusId = (orderStatusId) => {
    this.setState({
      orderStatusId,
    });
  };

  onClickFilter = () => {
    const query2 = `orderStatusId__in:${this.state.orderStatusId}`;
    const data = {
      query2,
    };
    // console.log(query2);
    this.props.getTDSOrders(data);
    this.props.setActiveOrderStatusId(this.state.orderStatusId);
    this.props.onClickShowFilter(false);
  };

  onClickOrderStatus = (orderStatusId) => {
    const formData = {
      uuid: this.props.uuid,
      orderStatusId,
      reason: this.state.reason,
    };
    this.props.putTDSOrder(formData);
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div
        id="curtainform"
        className="curtain"
        style={{ backgroundColor: '#fafafa' }}
      >
        <div className="toolbar">
          <Row type="flex" justify="center">
            <Icon
              type="close"
              className="clickable"
              style={{ fontSize: 24, marginLeft: 10 }}
              onClick={() => this.props.onClickShowFilter(false)}
            />
            <span
              className="font-weight-bold"
              style={{ marginTop: 2, marginLeft: 10, fontSize: 18 }}
            >
              Tolak Pesanan
            </span>
          </Row>
        </div>
        <div className="bg-white" style={{ marginTop: 55, paddingTop: 10 }}>
          <div style={{ minHeight: '50vh' }}>
            <hr id="horizontalline" />
            <div>
              <label htmlFor="reason" className="ml-3">
                Berikan alasan Anda
              </label>
            </div>
            <div className="containerarea">
              <TextArea
                id="reason"
                placeholder="Contoh: stok habis,sedang offline,dll.."
                onChange={this.onInputChange}
                value={this.state.reason}
                required
              />
            </div>
          </div>
          <div className="p-15">
            <Button
              className="btn-block"
              type="primary"
              onClick={() => this.onClickOrderStatus(13)}
            >
              Kirim
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

SalesFilter.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getTDSOrders: (data) => dispatch(actions.getTDSOrders(data)),
  putTDSOrder: (data) => dispatch(actions.putTDSOrder(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesFilter);
