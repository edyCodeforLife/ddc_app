import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions/index';
import { Row, Form, Input, Button, Col } from 'antd';
import { Redirect } from 'react-router-dom';
import ShareBtn from '../../../components/ShareButton/shareCodeReferal';
import constant from '../../../utils/configs/constant';
const FormItem = Form.Item;

class ajakTeman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.setToolbarState({
      hideBackButton: false,
      showCart: true,
      showProfile: true,
      showFooter: false,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }
  handleFocus = (event) => {
    event.target.select();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.isAuthenticated ? (
      <div className="container__ajak-teman">
        <Row className="describe__headline-ajak-teman">
          Ajak teman Anda untuk bergabung menjadi Reseller Dusdusan Sekarang
          juga
        </Row>
        <Row className="describe__content-ajak-teman">
          Bagikan kode referal Anda dan dapatkan 200 poin reward yang bisa
          digunakan untuk tukar reward dengan produk ekslusif Dusdusan atau
          reward lainya.
        </Row>
        <Row className="myCode__referal-title">Kode Referal Saya</Row>
        <Row>
          <Form>
            <FormItem>
              <Input
                type="text"
                className="referal__code-view"
                value={this.props.member.referralCode}
                onFocus={this.handleFocus}
              />
            </FormItem>
            <Row type="flex" align="middle" justify="center">
              <Col span={12} col-offset={6}>
                <FormItem>
                  <ShareBtn referal={this.props.member.referralCode} />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <div className="referal__code-notes">
                <span className="notes__point-referal">Catatan : </span>
                <p>
                  Poin otomatis masuk jika teman Anda berhasil daftar dengan
                  kode referal Anda dan Akunya telah aktif.
                </p>
              </div>
            </Row>
          </Form>
        </Row>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const AjakTeman = Form.create()(ajakTeman);
const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  isAuthenticated: state.get('authentication').isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AjakTeman);
