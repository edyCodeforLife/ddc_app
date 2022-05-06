import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

import * as actions from '../../../actions/index';
import constant from './../../../utils/configs/constant';
import DarkTitle from '../../../components/UI/DarkTitle';
import CustomImage from '../../../components/CustomImage';
import ListStockProduct from './component/listStockProduct';
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

class InventoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQty: false,
    };

    this.props.setToolbarState({
      title: null,
      hideBackButton: false,
      showProfile: true,
      showCart: true,
    });

    this.props.getTDSInventory();
  }
  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.state.showQty !== prevState.showQty) {
  //       this.setState({
  //         showQty:true,
  //       });
  //       console.log(this.state.showQty);
  //     }
  //   }
  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div style={wrapperStyle}>
        <DarkTitle title="Informasi Stok Barang Anda" />
        {this.props.inventory &&
          this.props.inventory.map((product) => (
            <ListStockProduct
              stock={product}
              id={product.id}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  inventory: state.get('requestTDS').inventory,
});

const mapDispatchToProps = (dispatch) => ({
  getTDSInventory: () => dispatch(actions.getTDSInventory()),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryPage);
