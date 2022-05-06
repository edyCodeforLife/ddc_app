/**
 *
 * LoginPage
 *
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Spin,
  Divider,
  Alert,
  Icon,
  Row,
  Col,
  Checkbox,
} from 'antd';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import constant from './../../utils/configs/constant';
import validationMessages from '../../utils/configs/validationMessages';
import * as actions from '../../actions/index';

const FormItem = Form.Item;

export class LoginPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
    };
    this.showHide = this.showHide.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({ title: 'Masuk Akun' });
    const queryParam = queryString.parse(this.props.location.search);
    if (queryParam.token) {
      this.props.getLoginInformation(queryParam);
    }
  }

  /**
   * Toggle show and hide password field
   * @param {*} e
   */
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'password' ? 'input' : 'password',
    });
  }

  /**
   * Do submit form
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submitLogin(values);
      }
    });
  };

  render() {
    // console.log(this.props.formError.formError);
    const { getFieldDecorator } = this.props.form;

    if (this.props.formSuccess) {
      return <Redirect to="/beranda" />;
    }

    return (
      <div>
        {this.props.formError !== null &&
          (this.props.formError.validation ===
            'Incorrect email or password' && (
            <Alert message={validationMessages.LOGIN_INVALID} type="error" />
          ))}
        {this.props.formError === 'client-error' && (
          <Alert message={validationMessages.TRY_AGAIN} type="error" />
        )}
        {this.props.formError === 'Banned' && (
          <Alert message={validationMessages.BANNED} type="error" />
        )}
        {this.props.formError === 'Locked' && (
          <Alert message={validationMessages.LOCKED} type="error" />
        )}
        {!this.props.formSuccess && (
          <Spin spinning={this.props.loading}>
            <Form
              className="mt-3"
              onSubmit={this.handleSubmit}
              layout="vertical"
              noValidate
            >
              <FormItem label="Email">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: validationMessages.EMAIL_INVALID,
                    },
                    {
                      required: true,
                      message: validationMessages.EMAIL_REQUIRED,
                    },
                  ],
                })(<Input type="email" />)}
              </FormItem>
              <FormItem label="Kata Sandi">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.PASSWORD_REQUIRED,
                    },
                    {
                      min: 6,
                      message: `Kata Sandi ${validationMessages.TOO_SHORT}`,
                    },
                  ],
                })(
                  <Input
                    type={this.state.type}
                    suffix={
                      <Icon
                        type="eye-o"
                        className="input__icon clickable"
                        onClick={this.showHide}
                      />
                    }
                  />
                )}
              </FormItem>

              <Row className="mb-3">
                <Col span={12}>
                  <Checkbox>Ingat Saya</Checkbox>
                </Col>
                <Col span={12} className="text-right">
                  <NavLink to={'lupa-kata-sandi'} className="font-weight-bold">
                    Lupa Kata Sandi?
                  </NavLink>
                </Col>
              </Row>

              <Button
                className="my-3 btn-block"
                type="primary"
                size={'large'}
                htmlType="submit"
              >
                Masuk
              </Button>
            </Form>

            <Divider className="my-3">Atau</Divider>

            <Row>
              <Col>
                <Button
                  className="my-2 btn-block facebook-color"
                  href={`${
                    constant.URL_MASTER_PUBLIC_PATH
                  }socialAuth/facebook/registrasi-member-reseller`}
                >
                  Masuk dengan Facebook
                </Button>
              </Col>
            </Row>

            <div className="text-center copywrite">{constant.COPYRIGHT}</div>
          </Spin>
        )}
      </div>
    );
  }
}

const LoginForm = Form.create()(LoginPage);

const mapStateToProps = (state) => ({
  loading: state.get('authentication').loading,
  formError: state.get('authentication').formError,
  formSuccess: state.get('authentication').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (form) => dispatch(actions.submitLogin(form)),
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
