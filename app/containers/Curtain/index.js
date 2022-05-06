import React from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import CatalogSort from './CatalogSort';
import CatalogFilter from './CatalogFilter';
import CatalogSearch from './CatalogSearch';
import ThankYou from './ThankYou';
import AmbilSendiri from '../OrderPage/AmbilSendiri';
import CheckShippingCost from './CheckShippingCost/index';
import SaldoFilter from './SaldoFilter';
import TarikSaldoFilter from './TarikSaldoFilter';

export class Curtain extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCurtain = this.toggleCurtain.bind(this);
  }

  /**
   * Toggle close curtain
   * @param {string} title
   */
  toggleCurtain() {
    const data = {
      show: false,
      title: null,
    };
    this.props.toggleCurtain(data);
  }

  renderCurtainContent(title) {
    switch (title) {
      case 'Urutkan':
        return <CatalogSort />;
      case 'Kategori Produk':
        return <CatalogFilter />;
      case 'Filter Saldo Masuk':
        return <SaldoFilter />;
      case 'Filter Penarikan Saldo':
        return <TarikSaldoFilter />;
      case 'Search':
        return <CatalogSearch toggleCurtainClicked={this.toggleCurtain} />;
      case 'Registration Member Non Reseller Success':
        return (
          <ThankYou title={title} toggleCurtainClicked={this.toggleCurtain} />
        );
      case 'Registration Member Reseller Success':
        return (
          <ThankYou title={title} toggleCurtainClicked={this.toggleCurtain} />
        );
      case 'Reset Password Success':
        return (
          <ThankYou title={title} toggleCurtainClicked={this.toggleCurtain} />
        );
      case 'Ubah Alamat Pengambilan':
        return (
          <AmbilSendiri
            isChange
            toggleCurtainClicked={this.toggleCurtain}
          />
        );
      case 'Cek Ongkir':
        return <CheckShippingCost />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="curtain">
        {this.props.curtain.title !==
          ('Registration Member Non Reseller Success' ||
            'Reset Password Success') && (
            <div className="toolbar">
              {/* Show toolbar if not Curtain Search */}
              {this.props.curtain.title !== 'Search' && (
              <Row type="flex" justify="center">
                <Icon
                  type="close"
                  className="clickable"
                  style={{ fontSize: 24, marginLeft: 10 }}
                  onClick={this.props.toggleCurtain}
                />
                <span
                  className="font-weight-bold"
                  style={{ marginTop: 2, marginLeft: 10, fontSize: 18 }}
                >
                  {this.props.curtain.title}
                </span>
              </Row>
            )}
            </div>
        )}

        {this.renderCurtainContent(this.props.curtain.title)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // products: state.get('product').products,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curtain);
