import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Form, Input, Button, Divider } from 'antd';
import queryString from 'query-string';

import validationMessages from '../../../utils/configs/validationMessages';
import * as actions from '../../../actions/index';
import constant from '../../../utils/configs/constant';

const FormItem = Form.Item;

class RegistrationSimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      hasToken: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    /**
     * Check query parameter from Social
     */
    const queryParam = queryString.parse(this.props.location.search);
    // console.log(queryParam);
    if (queryParam.token && queryParam.email) {
      // console.log(queryParam);
      /**
       * If social account not registered
       * Fill Registration Form
       */
      this.props.form.setFieldsValue({
        name: queryParam.fullName,
        firstName: queryParam.firstName,
        lastName: queryParam.lastName,
        email: queryParam.email,
      });
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log(values);
          values.firstName = queryParam.firstName;
          values.lastName = queryParam.lastName;
          this.props.storeRegistrationSimpleForm(values);
        }
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // Infusionsoft integration
        const member = {
          name: values.name,
          email: values.email,
        };
        actions.infusionsoftApi(member, constant.INFUSIONSOFT.TAGS.PREREGISTER);
        
        /**
         * Seperate fullName
         */
        const name = values.name;
        let firstName = name;
        let lastName = '';
        if (name.indexOf(' ') !== -1) {
          // There whitespace
          firstName = name.substr(0, name.indexOf(' '));
          lastName = name.substr(name.indexOf(' ') + 1);
        }
        values.firstName = firstName;
        values.lastName = lastName;
        this.props.storeRegistrationSimpleForm(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let formError = {};
    if (this.props.formError) {
      // Validate Email
      if (this.props.formError.email === 'Email has already been registered') {
        formError = {
          email: {
            validateStatus: 'error',
            help: validationMessages.EMAIL_REGISTERED,
          },
        };
      }
    }

    return (
      <div>
        <div className="my-3 h5 text-center font-weight-normal">
          Bersama Dusdusan, jadilah bagian dari komunitas Reseller terbesar di
          Indonesia.
        </div>

        {/* Registration Form */}
        <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
          <FormItem label="Nama">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: validationMessages.NAME_REQUIRED,
                },
              ],
            })(<Input type="text" />)}
          </FormItem>
          <FormItem label="Email" {...formError.email}>
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
          <FormItem>
            <Button
              className="btn-block"
              type="primary"
              size={'large'}
              htmlType="submit"
            >
              Daftar Sekarang
            </Button>
          </FormItem>
        </Form>
        {/* / Registration Form */}

        <Divider className="my-3">Atau daftar dengan</Divider>

        {/* Social Media Button */}
        <Button
          className="btn-block facebook-color"
          href={`${
            constant.URL_MASTER_PUBLIC_PATH
          }socialAuth/facebook/registrasi-member-reseller`}
        >
          Facebook
        </Button>
        {/* / Social Media Button */}

        <div className="my-4 text-center">
          <span>Kamu sudah punya akun? </span>
          <span>
            <NavLink to={'/login'}>Masuk disini</NavLink>
          </span>
        </div>
      </div>
    );
  }
}

const registrationSimpleForm = Form.create()(RegistrationSimpleForm);

const mapStateToProps = (state) => ({
  // form: state.get('catalogDownload').form,
});

const mapDispatchToProps = (dispatch) => ({
  storeRegistrationSimpleForm: (form) =>
    dispatch(actions.storeRegistrationSimpleForm(form)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(registrationSimpleForm)
);
