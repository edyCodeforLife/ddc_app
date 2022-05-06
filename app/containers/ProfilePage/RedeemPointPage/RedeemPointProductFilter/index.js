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
    onClick={() => props.onClickFilterId(props.filterId)}
  >
    <Col>{props.label} poin</Col>
    <Col>
      {props.filterId === props.activeFilterId && (
        <Icon type="check" style={{ fontSize: 18 }} />
      )}
    </Col>
  </Row>
);

const filterArray = [
  { label: '100 - 250', purchase_point__gte: 100, purchase_point__lte: 250 },
  { label: '251 - 500', purchase_point__gte: 251, purchase_point__lte: 500 },
  { label: '501 - 1.000', purchase_point__gte: 501, purchase_point__lte: 1000 },
  {
    label: '1.001 - 10.000',
    purchase_point__gte: 1001,
    purchase_point__lte: 10000,
  },
  {
    label: '>10.000',
    purchase_point__gte: 10000,
    purchase_point__lte: 1000000000,
  },
];

class RedeemPointProductFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterId: props.activeFilterId,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  onClickFilterId = (filterId) => {
    this.setState({
      filterId,
    });
  };

  onClickFilter = () => {
    const query = `typeReward:1,purchase_point__gte:${
      filterArray[this.state.filterId].purchase_point__gte
    },purchase_point__lte:${
      filterArray[this.state.filterId].purchase_point__lte
    }`;
    const data = {
      query,
    };
    this.props.getRedeemPointProducts(data);
    this.props.setActiveFilterId(
      this.state.filterId,
      filterArray[this.state.filterId].label
    );
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
            {filterArray.map((filter, index) => (
              <FilterStatus
                activeFilterId={this.state.filterId}
                filterId={index}
                label={filter.label}
                onClickFilterId={this.onClickFilterId}
              />
            ))}
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

RedeemPointProductFilter.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getRedeemPointProducts: (data) =>
    dispatch(actions.getRedeemPointProducts(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedeemPointProductFilter);
