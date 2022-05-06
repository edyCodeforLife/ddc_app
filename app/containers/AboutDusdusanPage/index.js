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
import MediaReview from './component/mediaRivew';
import CustomImage from '../../components/CustomImage';
import BgaboutDDC from '../../../assets/images/kopdar-padang-01@2x.png';
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
      paddingTop: '46px',
      marginTop: '-100px',
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
            style={{ backgroundImage: `url(${BgaboutDDC})` }}
            className="abouutDDC-bg"
          />
          <div className="title__aboutDDC" style={gradientReseller}>
            Tentang Dusdusan
          </div>
          <div className="contain-aboutDDC">
            <span className="contain-aboutDDC-text">
              {' '}
              Dusdusan.com adalah platform komunitas reseller terbesar di
              Indonesia. Model bisnis kami yang sangat praktis dan mudah, telah
              terbukti membantu puluhan ribu Ibu Rumah Tangga, Karyawan
              Kantoran, dan para Pemilik Toko dalam merintis bisnis mereka
              masing-masing. Selengkapnya, simak video berikut ini:
            </span>
          </div>
          <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ marginTop: '-90px' }}
          >
            <Col span={22}>
              <iframe
                style={{ width: '100%', minHeight: 180 }}
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/UftcW9liYZc"
                allowFullScreen
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: 60, paddingBottom: 38 }}>
            <div className="ddc__partnership">Partnership</div>
          </Row>
          <Row type="flex" align="middle" justify="center" gutter={18}>
            <Col span={7}>
              <CustomImage name="medina@2x.png" style={{ width: '100%' }} />
            </Col>
            <Col span={7}>
              <CustomImage name="homeco@2x.png" style={{ width: '100%' }} />
            </Col>
            <Col span={7}>
              <CustomImage name="green-leaf@2x.png" style={{ width: '100%' }} />
            </Col>
          </Row>
          <Row type="flex" justify="center" gutter={18} style={techno}>
            <Col span={10}>
              <CustomImage
                name="technoplast@2x.png"
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
          <Row
            type="flex"
            align="middle"
            justify="center"
            gutter={18}
            style={partnershipPaymen}
          >
            <Col span={7}>
              <CustomImage
                name="bank-central-asia@2x.png"
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={7}>
              <CustomImage
                name="bank-mandiri-logo@2x.png"
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={7}>
              <CustomImage name="bri-logo@2x.png" style={{ width: '100%' }} />
            </Col>
          </Row>
          <Row
            type="flex"
            align="middle"
            justify="center"
            gutter={18}
            style={shipping}
          >
            <Col span={7}>
              <CustomImage name="midtrans@2x.png" style={{ width: '100%' }} />
            </Col>
            <Col span={7}>
              <CustomImage
                name="visa-and-mastercard-logo@2x.png"
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
          <Row
            type="flex"
            align="middle"
            justify="center"
            gutter={18}
            style={{ paddingBottom: '29px' }}
          >
            <Col span={7}>
              <CustomImage name="tiki@2x.png" style={{ width: '100%' }} />
            </Col>
            <Col span={7}>
              <CustomImage name="j-t@2x.png" style={{ width: '100%' }} />
            </Col>
            <Col span={7}>
              <CustomImage
                name="pos-indonesia@2x.png"
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" gutter={18}>
            <Col span={10}>
              <CustomImage name="sicepat@2x.png" style={{ width: '90%', paddingBottom: '60px', paddingTop: '10px' }} />
            </Col>
          </Row>
          <div>
            <MediaReview />
          </div>
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
