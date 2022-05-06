import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Icon, Row, Button } from 'antd';

import AddressCard from './AddressCard';

class PilihAlamat extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  /**
   * On Click Select Address
   * @param {object} address
   */
  onClickAddress = (address) => {
    // console.log(address);
    this.props.onClickShowPilihAlamat(false);
    this.props.onClickAddress(address);
  };

  render() {
    return (
      <div
        className="curtain"
        style={{ marginLeft: -15, backgroundColor: '#fafafa' }}
      >
        <div className="toolbar">
          <Row type="flex" justify="center">
            <Icon
              type="close"
              className="clickable"
              style={{ fontSize: 24, marginLeft: 10 }}
              onClick={() => this.props.onClickShowPilihAlamat(false)}
            />
            <span
              className="font-weight-bold"
              style={{ marginTop: 2, marginLeft: 10, fontSize: 18 }}
            >
              Alamat
            </span>
          </Row>
        </div>
        <div style={{ marginTop: 65 }}>
          <Row type="flex" justify="end" style={{ margin: 10 }}>
            <NavLink to="/profil/buku-alamat">
              <Button type="primary">Buku Alamat</Button>
            </NavLink>
          </Row>
          {this.props.deliveryAddresses &&
            this.props.deliveryAddresses.map((address) => (
              <AddressCard
                address={address}
                selectedAddressId={this.props.selectedAddressId}
                onClickAddress={this.onClickAddress}
                key={address.id}
              />
            ))}
        </div>
      </div>
    );
  }
}

PilihAlamat.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PilihAlamat);
