import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Checkbox, Row, Button, Icon } from 'antd';

import * as actions from '../../../actions/index';
import Rekomendasi from './Rekomendasi';
import PilihGudangAtauTDS from './PilihGudangAtauTDS';
import PilihAlamat from './PilihAlamat';

class KirimAlamat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPilihAlamat: false,
      isDropship: false,
      isManualOption: false,
      // isManualOption: true,
      destinationBranch: {},
      ...this.props.order,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    const getBranchesConfig = {
      productid: this.props.product.id,
    };
    this.props.getBranches(getBranchesConfig);
    this.getDefaultAddress();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.order !== prevProps.order) {
      this.setState({
        ...this.props.order,
      });
    }

    if (
      this.props.authentication.member.memberDeliveryAddress !==
      prevProps.authentication.member.memberDeliveryAddress
    ) {
      this.getDefaultAddress();
    }
  }

  /**
   * On Change Checkbox Is Dropship
   */
  onChangeIsDropship = (e) => {
    // console.log(e.target.checked);
    this.setState({
      isDropship: e.target.checked,
    });
  };

  toggleManualOption = (e) => {
    this.setState({
      isManualOption: e.target.checked,
    });
  };

  /**
   * On Click Show PilihAlamat
   */
  onClickShowPilihAlamat = (flag) => {
    this.setState({
      showPilihAlamat: flag,
    });
  };

  /**
   * On Click Select Address
   * @param {object} address
   */
  onClickAddress = (address) => {
    // console.log(address);
    this.setState({
      destinationBranch: address,
    });
  };

  /**
   * Get Default Delivery Address
   */
  getDefaultAddress = () => {
    const destinationBranch = this.props.authentication.member.memberDeliveryAddress.find(
      (address) => address.default === 1
    );
    // console.log(destinationBranch);
    this.setState({
      destinationBranch,
    });
  };

  render() {
    return (
      <div
        className={this.state.showPilihAlamat ? 'no-overflow' : null}
        style={{ marginBottom: -25 }}
      >
        {/* BEGIN Member Address */}
        <div className="order__delivery__member__address">
          {this.state.destinationBranch.default == 1 && (
            <Row type="flex" justify="end">
              <div className="text-badge">Alamat Utama</div>
            </Row>
          )}

          <div className="font-weight-bold">
            {this.state.destinationBranch.name}
          </div>
          <div className="font-weight-bold">
            {this.state.destinationBranch.firstName}{' '}
            {this.state.destinationBranch.lastName}
          </div>
          <div>{this.state.destinationBranch.phone}</div>
          <div>{this.state.destinationBranch.Address}</div>
        </div>

        <div className="my-3" style={{ fontSize: 12 }}>
          <Checkbox
            checked={this.state.isDropship}
            onChange={this.onChangeIsDropship}
            style={{ fontSize: 12 }}
          >
            Dropship dengan logo saya
          </Checkbox>
          <div style={{ paddingLeft: 25, color: '#8c8c8c' }}>
            * Dengan memilih dropship invoice tidak akan diberikan dalam
            pengiriman
          </div>
        </div>

        <Button
          className="btn-block"
          type="dashed"
          style={{
            fontWeight: 'normal',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onClick={() => this.onClickShowPilihAlamat(true)}
        >
          Kirim ke alamat lain <Icon type="right" />
        </Button>

        {this.state.showPilihAlamat && (
          <PilihAlamat
            deliveryAddresses={
              this.props.authentication.member.memberDeliveryAddress
            }
            selectedAddressId={this.state.destinationBranch.id}
            onClickAddress={this.onClickAddress}
            onClickShowPilihAlamat={() => this.onClickShowPilihAlamat()}
          />
        )}
        {/* END Member Address */}

        {/* IF Order Under 3 Mio */}
        {this.props.order.subtotalPrice < 3000000 && (
          <React.Fragment>
            <Checkbox
              className="my-4"
              checked={this.state.isManualOption}
              onChange={this.toggleManualOption}
              style={{ fontSize: 12 }}
            >
              Opsi Manual
            </Checkbox>
            {!this.state.isManualOption && <Rekomendasi order={this.state} />}
          </React.Fragment>
        )}

        {/* IF Order Under 3 Mio and Not Manual Option */}
        {(this.state.isManualOption ||
          this.props.order.subtotalPrice >= 3000000) && (
          <PilihGudangAtauTDS order={this.state} />
        )}
      </div>
    );
  }
}

KirimAlamat.propTypes = {
  authentication: PropTypes.object,
  order: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  product: state.get('product').product,
});

const mapDispatchToProps = (dispatch) => ({
  getBranches: (data) => dispatch(actions.getBranches(data)),
  getBranchFreeShipping: (data) =>
    dispatch(actions.getBranchFreeShipping(data)),
  getShippingCost: (data) => dispatch(actions.getShippingCost(data)),
  getBranchRecommendation: (data) =>
    dispatch(actions.getBranchRecommendation(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KirimAlamat);
