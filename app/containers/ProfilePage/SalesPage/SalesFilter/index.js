import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col } from 'antd';

import * as actions from '../../../../actions/index';

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
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

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

  render() {
    return (
      <div className="curtain" style={{ backgroundColor: '#fafafa' }}>
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
              Filter
            </span>
          </Row>
        </div>
        <div className="bg-white" style={{ marginTop: 55, paddingTop: 10 }}>
          <div style={{ minHeight: '75vh' }}>
            <FilterStatus
              activeOrderStatusId={this.state.orderStatusId}
              orderStatusId={6}
              label="Pesanan Diterima"
              onClickOrderStatusId={this.onClickOrderStatusId}
            />
            <FilterStatus
              activeOrderStatusId={this.state.orderStatusId}
              orderStatusId={11}
              label="Pesanan Ditolak"
              onClickOrderStatusId={this.onClickOrderStatusId}
            />
            <FilterStatus
              activeOrderStatusId={this.state.orderStatusId}
              orderStatusId={10}
              label="Dibatalkan Sistem"
              onClickOrderStatusId={this.onClickOrderStatusId}
            />
          </div>
          <div className="p-15">
            <Button
              className="btn-block"
              type="primary"
              onClick={this.onClickFilter}
            >
              Filter
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesFilter);
