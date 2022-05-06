import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Alert } from 'antd';

import validationMessages from '../../utils/configs/validationMessages';
import * as actions from '../../actions/index';
import constant from '../../utils/configs/constant';

const FormItem = Form.Item;

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setToolbarState({ title: 'Lupa Kata Sandi' });
  }

  componentWillUnmount() {
    this.props.storeResetPassword({ formSuccess: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const data = values;
      if (!err) {
        this.props.submitForgotPassword(data.email);
      } else {
        <p>Email tidak ditemukan</p>;
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let formError = {};

    if (this.props.formError) {
      formError = {
        email: {
          validateStatus: 'error',
          help: validationMessages.EMAIL_NOT_REGISTERED,
        },
      };
    }

    return !this.props.authentication.isAuthenticated ? (
      <div>
        {this.props.formSuccess ? (
          <Alert
            message="Silahkan cek email anda untuk mereset kata sandi."
            type="success"
          />
        ) : (
          <div>
            <div className="text-center">
              <h5 className="my-4">Lupa dengan kata sandi Anda ?</h5>
              <div>
                Tenang saja, masukan email yang kamu gunakan saat mendaftar.
                Kami akan mengirim pesan email beserta tautan untuk me-reset
                kata sandi Anda.
              </div>
            </div>

            {/* Registration Form */}
            <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
              <FormItem label="Email" {...formError.email}>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: validationMessages.EMAIL_REQUIRED,
                    },
                  ],
                })(<Input type="email" />)}
              </FormItem>
              <FormItem>
                <Button
                  className="btn-block"
                  type="primary"
                  size={'large'}
                  htmlType="submit"
                >
                  Kirim
                </Button>
              </FormItem>
            </Form>
            <div className="text-center copywrite">{constant.COPYRIGHT}</div>
          </div>
        )}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const forgotPasswordForm = Form.create()(ForgotPasswordPage);

const mapStateToProps = (state) => ({
  loading: state.get('forgotPassword').loading,
  authentication: state.get('authentication'),
  formError: state.get('forgotPassword').formError,
  formSuccess: state.get('forgotPassword').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  storeResetPassword: (data) => dispatch(actions.storeResetPassword(data)),
  submitForgotPassword: (data) => dispatch(actions.submitForgotPassword(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(forgotPasswordForm);
