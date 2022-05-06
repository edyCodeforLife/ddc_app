/**
 *
 * ArticlesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Collapse, Col } from 'antd';

import * as actions from '../../actions/index';
import { Redirect } from 'react-router-dom';
import Career from './component/Career';
import BackgroundCareer from '../../../assets/images/img-karir@2x.png';
const Panel = Collapse.Panel;

export class CareerPage extends React.Component {
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
    this.props.getCareer();
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
      paddingTop: '138px',
      marginTop: '-160px',
    };
    const partnership = {
      paddingBottom: '64px',
    };
    const partnershipPaymen = {
      paddingBottom: '33px',
    };
    const techno = {
      paddingTop: '33px',
      paddingBottom: '64px',
    };
    const shipping = {
      paddingBottom: '73px',
    };
    const container = {
      background: '#fff',
      marginLeft: '-15px',
      marginRight: '-15px',
    };
    return (
      <React.Fragment>
        <Row
          style={{
            marginLeft: '-15px',
            marginRight: '-15px',
            marginTop: '-15px',
            background: '#fff',
          }}
        >
          <div
            style={{ backgroundImage: `url(${BackgroundCareer})` }}
            className="carrerDDC-bg"
          />
          <div className="title__carrerDDC" style={gradientReseller}>
            Karir
          </div>
          <div className="contain-carrerDDC">
            <span className="containt-carrerDDC-text">
              {' '}
              Team Dusdusan.com yang sedang berkembang sangat cepat, selalu
              mencari dan membutuhkan talent-talent baru untuk bersama-sama
              mewujudkan Visi dan Misi{' '}
              <span>PT. Dusdusan Dotcom Indonesia </span>
              Dusdusan
              <p style={{ paddingTop: 20 }}>
                membuka lowongan bagi Anda yang memiliki mental dan karakter di
                bawah ini:
              </p>
              <ul
                style={{ listStyleType: 'circle' }}
                className="list__requirmentCarrerDDC"
              >
                <li>Semangat berjuang, Tangguh, dan Pantang Menyerah</li>
                <li>Open Minded, dan memiliki sifat yang Positif</li>
                <li>Memiliki semangat belajar dan mau membantu orang lain</li>
                <li>
                  Rendah hati, tapi juga memiliki keberanian dan kecepatan yang
                  tinggi
                </li>
              </ul>
            </span>
          </div>
        </Row>
        <Row style={container}>
          {this.props.Karir && <Career career={this.props.Karir} />}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication').isAuthenticated,
  Karir: state.get('Career').dataCareer,
});

const mapDispatchToProps = (dispatch) => ({
  getCareer: () => dispatch(actions.getCareer()),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CareerPage);
