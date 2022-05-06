import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Divider } from 'antd';

import validationMessages from '../../../utils/configs/validationMessages';
import * as actions from '../../../actions/index';
import constant from '../../../utils/configs/constant';

const FormItem = Form.Item;

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      confirmDirty: false,
      autoCompleteResult: [],
      redirect: false,
      validation: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(err);
      if (!err) {
        // this.props.submitRegistrationForm(values);
        // console.log(values);
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

        // Infusionsoft integration
        const member = {
          name: values.name,
          email: values.email,
        };
        actions.infusionsoftApi(member, constant.INFUSIONSOFT.TAGS.PREREGISTER);

        this.setState({
          redirect: true,
        });
      } else if (err) {
        const validation = {};
        if (err.name) {
          validation.name = validationMessages.NAME_REQUIRED;
        }
        if (err.email) {
          validation.email = validationMessages.EMAIL_REQUIRED;
        }
        this.setState({
          validation,
        });
      }

      //   this.setState({
      //     validation: validationMessages.NAME_REQUIRED,
      //   });
      // } if (err.email) {
      //   this.setState({
      //     validation: validationMessages.EMAIL_REQUIRED,
      //   });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.state.redirect) {
      return <Redirect to="/registrasi-member-reseller" />;
    }

    return (
      <div className="landingPage__registration">
        <div className="my-3 p-15 font-color-white h5 text-center font-weight-normal">
          <p>
            Isi nama dan email Anda di bawah untuk mulai gabung jadi Reseller
            Dusdusan.com
          </p>
          {/* <p>
            Promo pendaftaran Dusdusan.com dari Rp 299.000 menjadi Rp 99.000
            gunakan kupon "99aja" Berlaku hanya sampai Kamis, 25 Oktober
          </p> */}
        </div>
        {/* <div style={{color:'#fff', fontSize:12, letterSpacing:'normal', marginBottom:20, textAlign:'center'}}>
        Mulai Resolusi 2019 Anda bersama Dusdusan.com, Daftar Dusdusan.com hanya Rp 99.000 dari 26 November - 31 Desember !
        </div> */}

        {/* Registration Form */}
        <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
          <FormItem className="FormVisible" label="Nama" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                },
                {
                  type: 'string',
                  message: '',
                },
              ],
            })(<Input type="text" placeholder={this.state.validation.name} />)}
          </FormItem>
          <FormItem className="FormVisible" label="Email" hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                },
                {
                  type: 'email',
                  message: ' ',
                },
              ],
            })(
              <Input type="email" placeholder={this.state.validation.email} />
            )}
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

        <div className="my-3 font-color-white text-center">
          Atau daftar dengan
        </div>

        {/* Social Media Button */}
        <Button
          className="btn-block facebook-color"
          href={`${
            constant.URL_MASTER_PUBLIC_PATH
          }socialAuth/facebook/registrasi-member-reseller`}
        >
          Daftar dengan Facebook
        </Button>
        {/* / Social Media Button */}

        <div className="text-center gradient-top">
          <span>Kamu sudah punya akun? </span>
          <span>
            <u className="font-weight-bold">
              <NavLink to={'/login'}>Masuk disini</NavLink>
            </u>
          </span>
        </div>
      </div>
    );
  }
}

const registration = Form.create()(Registration);

const mapStateToProps = (state) => ({
  // form: state.get('catalogDownload').form,
});

const mapDispatchToProps = (dispatch) => ({
  storeRegistrationSimpleForm: (form) =>
    dispatch(actions.storeRegistrationSimpleForm(form)),
  // submitRegistrationForm: (form) =>
  //   dispatch(actions.submitRegistrationForm(form)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registration);
