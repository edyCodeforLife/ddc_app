import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Spin, Alert } from 'antd';

import constant from '../../../utils/configs/constant';

import validationMessages from '../../../utils/configs/validationMessages';
import * as actions from '../../../actions/index';
import KatalogImage from '../../../../assets/images/download_katalog/katalog_ddc_1.jpg';

const FormItem = Form.Item;

class CatalogDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Submit Form Data
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submitCatalogDownloadForm(values);

        // Infusionsoft integration
        const member = {
          name: values.fullName,
          email: values.email,
        };
        actions.infusionsoftApi(
          member,
          constant.INFUSIONSOFT.TAGS.DOWNLOAD_ECATALOG
        );
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let formError = {};

    if (this.props.formError) {
      // Validate Email
      formError = {
        email: {
          validateStatus: 'error',
          help: validationMessages.SEND_KATALOG,
        },
      };
    }
    return (
      <div>
        {this.props.formSuccess ? (
          <Alert
            message="Success, Silahkan cek email anda untuk download katalog."
            type="success"
          />
        ) : (
          <div className="downloadCatalog">
            {/* Download Catalog */}
            <Row gutter={16}>
              <Col span={8} style={{ width: 100, height: 100 }}>
                <img
                  src={KatalogImage}
                  alt="katalog_dusdusan"
                  className="downloadCatalog__image"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col>
                <div>
                  Dapatkan E-katalog Resmi Dusdusan secara{' '}
                  <span className="font-weight-bold">GRATIS</span> untuk Anda!
                </div>
              </Col>
            </Row>
            {/* / Download Catalog */}

            {/* Download Catalog Form */}
            <Row className="mt-3">
              <Col>
                <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
                  <FormItem label="Nama Lengkap">
                    {getFieldDecorator('fullName', {
                      rules: [
                        {
                          required: true,
                          message: 'Nama lengkap tidak boleh kosong.',
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

                  <Button
                    className="btn-block"
                    type="primary"
                    size={'large'}
                    htmlType="submit"
                  >
                    Download Sekarang
                  </Button>
                </Form>
              </Col>
            </Row>
            {/* / Download Catalog Form */}
          </div>
        )}
      </div>
    );
  }
}

const catalogDownload = Form.create()(CatalogDownload);

const mapStateToProps = (state) => ({
  // form: state.get('catalogDownload').form,
  formError: state.get('catalogDownload').formError,
  formSuccess: state.get('catalogDownload').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  submitCatalogDownloadForm: (form) =>
    dispatch(actions.submitCatalogDownloadForm(form)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(catalogDownload);
