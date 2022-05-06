import React from 'react';
import { Row, Button, Form, DatePicker, Col } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker;

function disabledDate(current) {
  // Can not select days before today and today
  return current <= moment().startOf('day');
}

function disabledHours(time) {}
class SaldoFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
    };
  }
  onChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      fromDate: date[0],
      toDate: date[1],
    });
  };

  handleOnclik = () => {
    const data = {
      show: false,
      title: null,
    };
    this.props.toggleCurtain(data);
    this.props.getSearchWithdrawSaldoDetail({
      fromDate: moment(this.state.fromDate).format('YYYY-MM-DD'),
      toDate: moment(this.state.toDate)
        .add(1, 'days')
        .format('YYYY-MM-DD'),
    });
  };
  render() {
    const style = {
      fontSize: '14px',
      color: '#282828',
      lineHeight: '20px',
      fontWeight: '500',
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{ padding: '0px 15px' }}>
        <div style={{ marginTop: 70 }}>
          <React.Fragment>
            <p style={style}>
              Tentukan kisaran bulan dan tahun untuk melihat detail penarikan saldo Anda
            </p>
            <Form>
              <Form.Item>
                <RangePicker
                  // disabledDate={disabledDate}
                  onChange={this.onChange}
                  className="dateRange"
                />
              </Form.Item>
              <Form.Item>
                <Col
                  span={24}
                  className="button__filter-saldo"
                  style={{ top: '50vh' }}
                >
                  <Button
                    type="primary"
                    className="btn-block"
                    htmlType="button"
                    onClick={this.handleOnclik}
                  >
                    Filter
                  </Button>
                </Col>
              </Form.Item>
            </Form>
          </React.Fragment>
        </div>
      </Row>
    );
  }
}
const saldoFilter = Form.create()(SaldoFilter);

const mapStateToProps = (state) => ({
  saldo: state.get('saldo').formData,
  
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  getSearchWithdrawSaldoDetail: (data) => dispatch(actions.getSearchWithdrawSaldoDetail(data)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(saldoFilter)
);
