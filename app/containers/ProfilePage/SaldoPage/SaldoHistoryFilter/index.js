import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Button, Icon, Row, Col, Select, DatePicker } from 'antd';
moment.locale('id');

import * as actions from '../../../../actions/index';

const Option = Select.Option;

class SaldoHistoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterId: props.activeFilterId,
      startValue: null,
      endValue: null,
      endOpen: false,
    };
    this.currentYear = new Date().getFullYear();
    this.years = Array.from(
      new Array(5),
      (val, index) => index + this.currentYear - 4
    );
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  // onClickFilterId = (filterId) => {
  //   this.setState({
  //     filterId,
  //   });
  // };

  // onClickFilter = () => {
  //   const query2 = `filterId__in:${this.state.filterId}`;
  //   const data = {
  //     query2,
  //   };
  // console.log(query2);

  // };

  handleOnclik = () => {
    this.props.onClickShowFilter(false);
    const query = {
      fromDate: moment(this.state.startValue).format('YYYY-MM-DD'),
      toDate: moment(this.state.endValue)
        .add(1, 'days')
        .format('YYYY-MM-DD'),
    };
    this.props.getSaldoIns(query);
    this.props.getSaldoOuts(query);
    // this.props.getSearchSaldoDetail({
    //   fromDate: moment(this.state.startValue).format('YYYY-MM-DD'),
    //   toDate: moment(this.state.endValue)
    //     .add(1, 'days')
    //     .format('YYYY-MM-DD'),
    // });
  };

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  };
  render() {
    const { startValue, endValue, endOpen } = this.state;
    const currentYear = new Date().getFullYear();
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
        <div
          className="p-15 bg-white"
          style={{ marginTop: 65, paddingTop: 10 }}
        >
          <div style={{ minHeight: '75vh' }}>
            <div className="font-weight-bold">
              Tentukan kisaran bulan dan tahun untuk melihat detil saldo Anda.
            </div>
            <div>
              <Row style={{ marginTop: 30 }} className="history__filter">
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  format="DD-MM-YYYY"
                  value={startValue}
                  placeholder="Start"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  format="DD-MM-YYYY"
                  value={endValue}
                  placeholder="End"
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              </Row>
            </div>
          </div>
          <Button
            className="btn-block"
            type="primary"
            onClick={this.handleOnclik}
          >
            Filter
          </Button>
        </div>
      </div>
    );
  }
}

SaldoHistoryFilter.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  // getSearchSaldoDetail: (data) => dispatch(actions.getSearchSaldoDetail(data)),
  getSaldoIns: (data) => dispatch(actions.getSaldoIns(data)),
  getSaldoOuts: (data) => dispatch(actions.getSaldoOuts(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaldoHistoryFilter);
