import React from 'react';
import ImageIcon from '../../../../../../../assets/images/placeholder/no-image.png';
import { Row, Col, Button, Modal, Icon, Form, Input, Select, message } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../../actions/index';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import validationMessages from '../../../../../../utils/configs/validationMessages';
import constant from './../../../../../../utils/configs/constant';

const FormItem = Form.Item;
const Option = Select.Option;
class editBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: [
        {
          id: '1',
          name: 'BCA',
        },
        {
          id: '2',
          name: 'BNI',
        },
        {
          id: '3',
          name: 'MANDIRI',
        },
        {
          id: '4',
          name: 'BRI',
        },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Edit Bank',
      hideBurgerMenu: true,
      showFooter: false,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
    this.props.getListBank();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.memberBankAccount.memberBankAccount !== null) {
          if (this.props.memberBankAccount.memberBankAccount.id === 0) {
            this.props.submitProfileAddBank(
              values,
              this.props.token,
              this.props.memberBankAccount.memberBankAccount.id
            );
          } else {
            this.props.submitUpdateBank(
              values,
              this.props.token,
              this.props.memberBankAccount.memberBankAccount.id
            );
          }
        }
      }
    });
  };
  render(props) {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }    
    if (this.props.formSuccess) {
      message.success('Edit bank sukses');
      this.props.addProfilBankReset();
      this.props.updateBankReset();
      this.props.history.goBack();
    }
    let formError = {};

    if (this.props.formError) {
      // Validate Phone
      if (this.props.formError.phone === 'Phone number is incorrect') {
        formError = {
          phone: {
            validateStatus: 'error',
            help: validationMessages.PHONE_NUMBER_INVALID,
          },
        };
      }
    }
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.memberBankAccount ?(
        <div>
          <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
            <div style={{ paddingTop: '15px' }}>
              <FormItem label="Pilih Bank">
                {getFieldDecorator('bankId', {
                  initialValue: this.props.memberBankAccount.memberBankAccount.bankId === 0 ? '' : this.props.memberBankAccount.memberBankAccount.bankId,
                  rules: [
                    {
                      required: true,
                      message: validationMessages.BANK_NAME_REQUIRED,
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Pilih Jenis Bank"
                    size="large"
                  >
                    {this.props.listBank !== null
                      ? this.props.listBank.map((data) => (
                        <Option key={data.id} value={data.id}>
                          {data.name}
                        </Option>
                        ))
                      : null}
                  </Select>
                )}
              </FormItem>
              <FormItem label="No Rekening">
                {getFieldDecorator('accountNumber', {
                  initialValue: this.props.memberBankAccount.memberBankAccount.accountNumber,
                  rules: [
                    {
                      required: true,
                      message: validationMessages.NOREK_REQUIRED,
                    },
                    {
                      min: 8,
                      message: `Nomor Rekening ${validationMessages.TOO_SHORT}`,
                    },
                    {
                      max: 20,
                      message: `Nomor Rekening ${validationMessages.TOO_LONG}`,
                    },
                    {
                      pattern: constant.REGEX_NUMBER_ONLY,
                      message: validationMessages.NOREK_IS_NUMBER,
                    },
                      
                  ],
                })(<Input type="tel" />)}
              </FormItem>
              <FormItem label="Nama Pemilik Rekening">
                {getFieldDecorator('accountName', {
                  initialValue: this.props.memberBankAccount.memberBankAccount.accountName,
                  rules: [
                    {
                      required: true,
                      message: validationMessages.ACCOUNT_NAME,
                    },
                  ],
                })(<Input type="text" />)}
              </FormItem>
              <FormItem>
                <Button
                  className="btn-block"
                  type="primary"
                  size={'large'}
                  htmlType="submit"
                  loading={this.props.loading}
                >
                  Simpan
                </Button>
              </FormItem>
            </div>
          </Form>
        </div>
      ):null
    );
  }
}

const EditBank = Form.create()(editBank);

const mapStateToProps = (state) => ({
  token: state.get('authentication').token,
  member: state.get('authentication').member,
  authentication: state.get('authentication'),
  formError: state.get('updateProfil').formError,
  formSuccess: state.get('updateProfil').formSuccess,
  loading: state.get('updateProfil').loading,
  memberBankAccount: state.get('updateProfil').formData,
  listBank: state.get('ListBank').formData,
});

const mapDispatchToProps = (dispatch) => ({
  submitProfileAddBank: (form, token, id) => dispatch(actions.submitProfileAddBank(form, token, id)),
  submitUpdateBank: (form, token, id) => dispatch(actions.submitUpdateBank(form, token, id)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  updateBankReset :() => dispatch (actions.updateBankReset()),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
  getListBank :() => dispatch(actions.getListBank()),
  addProfilBankReset: () => dispatch(actions.addProfilBankReset()),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditBank)
);
