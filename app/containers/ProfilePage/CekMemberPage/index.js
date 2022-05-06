import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Col, Input, Button, Row } from 'antd';
import * as actions from '../../../actions/index';
import validationMessages from '../../../utils/configs/validationMessages';

const FormItem = Form.Item;

class searchMemberPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: null,
      confirmDirty: false,
      hasFeedBack: false,
    };
  }
  componentDidMount() {
    this.props.setToolbarState({
      hideBurgerMenu: false,
      showCart: true,
      showProfile: true,
      showFooter: false,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const phone = values.name;
      if (!err) {
        let isValid = true;
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(phone) && isValid;
        if (isValid) {
          this.props.checkMemberAktifbyEmail(phone);
        } else {
          let isValid = true;
          const pattern = /^\d+$/;
          isValid = pattern.test(phone) && isValid;
          if (isValid) {
            this.props.checkMemberAktifbyPhone(phone);
          }
        }
      }
    });
  };

  render() {
    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    let memberAktif = {};
    let validateStatus = null;
    let help = null;
    if (this.props.loading) {
      validateStatus = 'validating';
    } else if (this.props.formSuccess) {
      if (this.props.resultMemberActive !== null) {
        if (this.props.resultMemberActive.phone) {
          if (
            this.props.resultMemberActive.phone ===
            'Phone has already been registered'
          ) {
            validateStatus = 'success';
            help = 'Member sudah terdaftar dan aktif';
          }
          if (this.props.resultMemberActive.phone === 'Phone is available') {
            validateStatus = 'error';
            help = 'Member belum terdaftar ';
          }
        } else if (this.props.formSuccess) {
          if (this.props.resultMemberActive.email) {
            if (
              this.props.resultMemberActive.email ===
              'Email has already been registered'
            ) {
              validateStatus = 'success';
              help = 'Member sudah terdaftar dan aktif.';
            }
            if (this.props.resultMemberActive.email === 'Email is available') {
              validateStatus = 'error';
              help = 'Member belum terdaftar.';
            }
          }
        }
      }
    }

    memberAktif = {
      name: {
        validateStatus,
        help,
      },
    };

    const style = {
      background: '#fff',
      marginLeft: '-15px',
      marginRight: '-15px',
      marginTop: '15px',
      padding: '15px',
      height: '80vh',
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Row
          style={{
            background: '#fafafa',
            marginLeft: '-15px',
            marginRight: '-15px',
            padding: '5px 15px',
          }}
        >
          <div>
            <Col span={24}>
              <span
                className="saldo__page-member-label"
                style={{
                  color: '#282828',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Cek Member
              </span>
            </Col>
          </div>
        </Row>
        <div style={style}>
          <div className="font-size-small">
            Silahkan masukan alamat email atau nomor telepon yang dituju, untuk
            mengetahui status member
          </div>
          <Row className="mt-15">
            <Form onSubmit={this.handleSubmit} noValidate>
              <FormItem {...memberAktif.name} hasFeedback>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.ID_MEMBER_REQUIRED,
                    },
                  ],
                })(
                  <Input
                    type="text"
                    className="prefixCheck__member"
                    placeholder="Masukan alamat email atau no telephone"
                    id="success"
                  />
                )}
              </FormItem>

              <Form.Item>
                <Button
                  className="btn-block span"
                  type="primary"
                  htmlType="submit"
                >
                  Cek
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
const SearchMemberPage = Form.create()(searchMemberPage);
const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  token: state.get('authentication').token,
  authentication: state.get('authentication'),
  formSuccess: state.get('searchMemberAktif').formSuccess,
  loading: state.get('searchMemberAktif').loading,
  resultMemberActive: state.get('searchMemberAktif').memberAktif,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  checkMemberAktifbyPhone: (data) =>
    dispatch(actions.checkMemberAktifbyPhone(data)),
  checkMemberAktifbyEmail: (data) =>
    dispatch(actions.checkMemberAktifbyEmail(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
  checkMemberAktifReset: () => dispatch(actions.checkMemberAktifReset()),
  checkMemberAktifbyEmailReset: () =>
    dispatch(actions.checkMemberAktifbyEmailReset()),
  logout: () => dispatch(actions.logout()),
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchMemberPage)
);
