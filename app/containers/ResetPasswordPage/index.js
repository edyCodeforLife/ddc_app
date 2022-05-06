import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Alert } from 'antd';
import queryString from 'query-string';

import {Redirect} from 'react-router-dom';
import validationMessages from '../../utils/configs/validationMessages';
import * as actions from '../../actions/index';
import constant from '../../utils/configs/constant';

const FormItem = Form.Item;

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      type: 'password',
      type2: 'password',
      token: this.props.match.params.token,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showHide = this.showHide.bind(this);
  }

  componentDidMount() {
    this.props.setToolbarState({
      title: 'Kata Sandi Baru',
      hideBackButton: true,
    });
  }

  handleConfirmPasswordBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  /**
   * Compare confirm_password to password
   */
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(validationMessages.CONFIRM_PASSWORD_NOT_MATCH);
    } else {
      callback();
    }
  };

  /**
   * Compare password to confirm_password
   */
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm_password'], { force: true });
    }
    callback();
  };

  showHide(field) {
    // e.preventDefault();
    // e.stopPropagation();
    if (field === 'password') {
      this.setState({
        type: this.state.type === 'password' ? 'input' : 'password',
      });
    } else {
      this.setState({
        type2: this.state.type2 === 'password' ? 'input' : 'password',
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        this.props.submitResetPassword(values.password, this.state.token);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      // this.props.isAuthenticated ?(
      <div>
        {this.props.formError && (
          <Alert
            message="Session reset password anda telah expired."
            type="error"
          />
        )}
        <div className="my-3 h4 text-center">
          <h5>Masukan kata sandi baru Anda </h5>
        </div>

        {/* Reset Password Form */}
        <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
          <FormItem label="Kata Sandi">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: validationMessages.PASSWORD_REQUIRED,
                },
                {
                  validator: this.validateToNextPassword,
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
                    onClick={() => this.showHide('password')}
                  />
                }
              />
            )}
          </FormItem>
          <FormItem label="Ketik Ulang Kata Sandi">
            {getFieldDecorator('confirm_password', {
              rules: [
                {
                  required: true,
                  message: validationMessages.CONFIRM_PASSWORD_REQUIRED,
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                type={this.state.type2}
                suffix={
                  <Icon
                    type="eye-o"
                    className="input__icon clickable"
                    onClick={() => this.showHide('repassword')}
                  />
                }
              />
            )}
          </FormItem>

          <FormItem>
            <Button
              className="btn-block"
              type="primary"
              size={'large'}
              loading={this.props.loading}
              htmlType="submit"
            >
              Ganti Kata Sandi
            </Button>
          </FormItem>
        </Form>
        <div className="text-center copywrite">{constant.COPYRIGHT}</div>
      </div>
      // ):(
      //   <Redirect to="/" />
      // )
    );
  }
}

const resetPasswordForm = Form.create()(ResetPasswordPage);

const mapStateToProps = (state) => ({
  loading: state.get('forgotPassword').loading,
  formError: state.get('forgotPassword').formError,
  formSuccess: state.get('forgotPassword').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  submitResetPassword: (form, token) =>
    dispatch(actions.submitResetPassword(form, token)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resetPasswordForm);
