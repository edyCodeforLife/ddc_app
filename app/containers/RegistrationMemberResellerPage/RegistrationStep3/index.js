import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Radio } from 'antd';
import NumberFormat from 'react-number-format';
import axios from 'axios';

import * as actions from '../../../actions/index';
import CustomImage from '../../../components/CustomImage';
import constant from './../../../utils/configs/constant';
import RegistrationPayment from '../RegistrationPayment';
import ResellerThankYou from '../ResellerThankYou';

const FormItem = Form.Item;

class RegistrationSteps3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPayment: false,
      confirmDirty: false,
      starterKitProduct: null,
      productId: null,
      isTrial: false,
      showThankYou: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.getStaterKitProducts({
      query: 'type_starter_kit:1',
      offset: 0,
      limit: 50,
      sortby: 'typePriceStarterKit',
      order: 'asc',
    });
    if (this.props.formData) {
      this.props.form.setFieldsValue(this.props.formData);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authentication.member !== prevProps.authentication.member) {
      // console.log(this.props.authentication.token);
      if (this.state.isTrial) {
        axios.defaults.headers.common = {
          Authorization: this.props.authentication.token,
        };
        const data = {
          isMembership: true,
          productId: this.state.starterKitProduct.id,
        };
        this.props.postPayment(data);
      }
    }

    if (
      this.props.starterKitProducts &&
      this.props.starterKitProducts !== prevProps.starterKitProducts
    ) {
      // Set Default Starter Kit
      if (this.props.starterKitProducts.length > 0) {
        const starterKitProduct = this.props.starterKitProducts[0];
        this.selectStaterKitProduct(starterKitProduct);
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // Infusionsoft integration
        const member = {
          name: this.props.formData.name,
          email: this.props.formData.email,
        };
        actions.infusionsoftApi(
          member,
          constant.INFUSIONSOFT.TAGS.NEW_RESELLER_WAITING_PAYMENT
        );

        this.props.storeRegistrationStep3({
          productId: this.state.productId,
        });
        this.props.submitRegistrationMemberReseller(this.props.formData);
        if (this.state.starterKitProduct.isTrial === 1) {
          // Only if Trial
          // console.log('Beli Trial');
          this.setState({
            isTrial: true,
          });
        } else {
          this.onClickShowPayment(true);
        }
      }
    });
  };

  /**
   * Select Starter Kit Product
   */
  selectStaterKitProduct = (e) => {
    const starterKitProduct = e.target ? e.target.value : e;

    // Check if get Voucher Discount
    if (this.props.formData.voucherEnable) {
      if (starterKitProduct.id === constant.CONFIG_ORDER.PAKET_DAFTAR_ID) {
        starterKitProduct.typePriceStarterKit = 99000;
      }
      // if (
      //   constant.CONFIG_PROMO.PAKET_DAFTAR_IDS.includes(starterKitProduct.id)
      // ) {
      //   starterKitProduct.typePriceStarterKit +=
      //     constant.CONFIG_PROMO.PROMO_POTONGAN_HARGA;
      // }
      if (starterKitProduct.id === 2215) {
        starterKitProduct.typePriceStarterKit = 299000;
      } else if (
        starterKitProduct.id === 2224 ||
        starterKitProduct.id === 2225
      ) {
        starterKitProduct.typePriceStarterKit = 99000;
      }
    }
    this.setState({
      starterKitProduct,
      productId: starterKitProduct.id,
    });
  };

  /**
   * On Click Show Payment
   */
  onClickShowPayment = (flag) => {
    // console.log(flag);
    this.setState({
      showPayment: flag,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.props.authentication.isAuthenticated) {
      if (this.state.showPayment === false && !this.state.isTrial) {
        // console.log(this.props.authentication.isAuthenticated);
        this.onClickShowPayment(true);
      }
    }

    if (this.props.payment.formSuccess) {
      this.setState({ showThankYou: true });
      this.props.storePayment({ formSuccess: false });
      this.props.logout({ enableReload: false });
    }

    if (this.state.showThankYou) {
      return (
        <div style={{ marginLeft: -15 }}>
          <ResellerThankYou
            title="Terima Kasih Telah Mendaftar"
            content="Rincian login Anda telah kami kirimkan melalui email & SMS. Cek email atau handphone Anda sekarang."
            redirectTo="/login"
            buttonText="Login"
          />
        </div>
      );
    }

    /**
     * Add class no-overflow if show curtain
     */
    const bodyTag = document.getElementsByTagName('BODY')[0];
    if (this.state.showPayment) {
      bodyTag.classList.add('no-overflow');
    } else {
      bodyTag.classList.remove('no-overflow');
    }

    return (
      <React.Fragment>
        <div className="registrasi">
          <div>
            <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
              <Row>
                <Col xs={24}>
                  <FormItem>
                    {getFieldDecorator('productId', {
                      initialValue:
                        this.props.starterKitProducts !== null
                          ? this.props.starterKitProducts[0]
                          : null,
                      rules: [
                        {
                          required: true,
                          message: 'Paket produk harus dipilih!',
                        },
                      ],
                    })(
                      <Radio.Group
                        buttonStyle="solid"
                        onChange={this.selectStaterKitProduct}
                        style={{ width: '100%' }}
                      >
                        {this.props.starterKitProducts !== null
                          ? this.props.starterKitProducts.map(
                              (data) =>
                                data.quantity > 0 && (
                                  <Col
                                    span={12}
                                    key={data.id}
                                    style={{ padding: 5 }}
                                  >
                                    <Radio.Button
                                      value={data}
                                      className="btn-block text-center"
                                    >
                                      {data.name}
                                    </Radio.Button>
                                  </Col>
                                )
                            )
                          : null}
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
              </Row>

              {/* BEGIN Starter Kit Description */}
              {this.state.starterKitProduct && (
                <div
                  className="bg-gray p-15"
                  style={{ marginLeft: -15, marginRight: -15, marginTop: -20 }}
                >
                  <div className="text-center">
                    {this.state.starterKitProduct.imageList[0] ? (
                      <img
                        src={
                          this.state.starterKitProduct.imageList[0].imagePath
                        }
                        style={{ maxWidth: '100%' }}
                      />
                    ) : (
                      <CustomImage
                        name={constant.PLACEHOLDER.PRODUCT_IMAGE}
                        style={{ maxWidth: '100%' }}
                      />
                    )}
                  </div>
                  <div
                    className="mt-15"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: this.state.starterKitProduct.description,
                    }}
                  />
                  {this.state.starterKitProduct.isTrial == 0 && (
                    <div className="mt-10 font-weight-bold">
                      Harga Normal:{' '}
                      <NumberFormat
                        value={this.state.starterKitProduct.standardRetailPrice}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp. '}
                        style={{ textDecoration: 'line-through' }}
                      />
                    </div>
                  )}
                  <div className="my-4 font-weight-bold">
                    <span
                      className="font-weight-bolder"
                      style={{ fontSize: 20 }}
                    >
                      <NumberFormat
                        value={this.state.starterKitProduct.typePriceStarterKit}
                        displayType={'text'}
                        thousandSeparator
                        prefix={'Rp. '}
                      />
                    </span>
                    {this.state.starterKitProduct.isTrial == 1 &&
                      ` (gratis untuk ${
                        constant.CONFIG_GLOBAL.TRIAL_ACTIVE_DAYS
                      } hari)`}
                  </div>
                </div>
              )}
              {/* END Starter Kit Description */}

              <FormItem className="mt-15">
                <Button
                  className="btn-block"
                  id="buttonRegistrationMemberReseller"
                  type="primary"
                  size={'large'}
                  htmlType="submit"
                  disabled={
                    this.state.productId === null ||
                    this.props.payment.loading ||
                    this.props.loading
                  }
                >
                  Selanjutnya
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
        {this.state.showPayment && this.state.starterKitProduct && (
          <div style={{ marginLeft: -15, marginRight: -15 }}>
            <RegistrationPayment
              product={this.state.starterKitProduct}
              formData={this.props.formData}
              onClickShowPayment={() => this.onClickShowPayment()}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}
const registrationStep3 = Form.create()(RegistrationSteps3);

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  formData: state.get('registrationMemberReseller').formData,
  formError: state.get('registrationMemberReseller').formError,
  formSuccess: state.get('registrationMemberReseller').formSuccess,
  loading: state.get('registrationMemberReseller').loading,
  starterKitProducts: state.get('registrationMemberReseller')
    .starterKitProducts,
  payment: state.get('payment'),
});

const mapDispatchToProps = (dispatch) => ({
  storeRegistrationStep3: (form) =>
    dispatch(actions.storeRegistrationStep3(form)),
  submitRegistrationMemberReseller: (form) =>
    dispatch(actions.submitRegistrationMemberReseller(form)),
  getStaterKitProducts: (data) => dispatch(actions.getStaterKitProducts(data)),
  postPayment: (data) => dispatch(actions.postPayment(data)),
  storePayment: (data) => dispatch(actions.storePayment(data)),
  logout: (data) => dispatch(actions.logout(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registrationStep3);
