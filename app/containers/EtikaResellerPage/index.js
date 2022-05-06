/**
 *
 * ArticlesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Collapse } from 'antd';

import * as actions from '../../actions/index';
import { Redirect } from 'react-router-dom';
import EtikaResellerbg from '../../../assets/images/head-of-sales-dusdusan-com-tati-mulyati@2x.png';
import EtikaReseller from './component/listEtika';
const Panel = Collapse.Panel;

export class EtikaResellerPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      kategori: false,
    };
    this.toggleCurtain = this.toggleCurtain.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      showProfile: true,
      showCart: true,
      showFooter: true,
    });
  }

  /**
   * Toggle show curtain
   * @param {string} title
   */
  toggleCurtain(title) {
    const data = {
      show: true,
      title,
    };
    this.props.toggleCurtain(data);
  }
  render() {
    const gradient = {
      background: '#16b8b2',
    };
    const gradientReseller = {
      paddingTop: '163px',
    marginTop: '-209px',
    };
    // if (!this.props.authentication) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <React.Fragment>
        <Row style={{ marginLeft: '-15px', marginRight: '-15px', marginTop:-15 }}>
          <div style={{ backgroundImage: `url(${EtikaResellerbg})` }} className="Etika__Reseller-ddc" />
          <div className="title__etika-reseller" style={gradientReseller}>
            Menjadi Reseller Dusdusan yang Ber-etika
          </div>
          <div className="contain-etika-reseller">
            <span className="contain-etika-reseller-fill">
              Dusdusan adalah komunitas reseller dan juga supplier terbesar
              untuk peralatan rumah tangga dan dapur. Selain menyediakan
              berbagai produk rumah tangga terbaik, kami juga memberikan
              berbagai pelatihan dan pengetahuan untuk berbisnis baik online
              maupun offline. Dusdusan bukan MLM dan tentu saja tidak ada
              istilah upline, downline, jaringan, target, ataupun tutup poin.
              Semua reseller punya kesempatan sama dan yang akan Anda hasilkan,
              sepenuhnya berasal dari dan untuk Anda sendiri. Dengan bergabung
              menjadi reseller Dusdusan, berarti ada kode etik yang harus
              diikuti oleh setiap reseller. Berikut rincian kode etiknya:
            </span>
          </div>
          <div><EtikaReseller /></div>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication').isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtikaResellerPage);
