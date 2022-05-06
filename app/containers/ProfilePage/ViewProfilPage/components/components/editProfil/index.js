import React from 'react';
import ImageIcon from '../../../../../../../assets/images/placeholder/no-image.png';
import {
  Row,
  Col,
  Button,
  Icon,
  Form,
  Input,
  Alert,
  message,
  Upload,
} from 'antd';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { browserHistory } from 'react-router';
import * as actions from '../../../../../../actions/index';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import validationMessages from '../../../../../../utils/configs/validationMessages';
import constant from './../../../../../../utils/configs/constant';
import CustomProfileImage from '../../../../../../components/CustomProfileImage';

const FormItem = Form.Item;
class editProfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      imageUrl: null,
      image: null,
      fileList: [],
      uploading: false,
      visible: false,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Edit Profil',
      hideBurgerMenu: true,
      showFooter: false,
    });
    const queryParam = queryString.parse(this.props.location.search);
    this.setState({
      token: queryParam.token,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  /**
   * Validate Upload
   */
  beforeUpload = (file) => {
    const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const isValid = fileTypes.includes(file.type.toLowerCase());
    console.log(isValid);
    if (!isValid) {
      message.error('Hanya dapat upload format JPG, JPEG and PNG');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Ukuran maksimal foto 5MB');
    }
    return isValid && isLt5M;
  };
  onChangeUpload = (info) => {
    if (!this.state.name) {
      console.log('coba cek');
      this.props.postUploadImageProfile(info.file.originFileObj);
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          image: info.file.originFileObj,
          loading: false,
          visible: false,
          name: info.file.originFileObj.name,
        })
      );
    } else {
      if (this.state.name !== info.file.originFileObj.name) {
        console.log('Manggil Lagi');
        this.props.postUploadImageProfile(info.file.originFileObj);
        // Get this url from response in real world.
        this.setState({
          name: info.file.originFileObj.name,
        });
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            imageUrl,
            image: info.file.originFileObj,
            loading: false,
            visible: false,
          })
        );
        console.log(info.file.originFileObj);
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.image = this.props.upload.imagePath;
        this.props.submitEditProfil(values);
      }
    });
  };
  render() {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }
    let formError = {};
    if (this.props.formError.phone === 'Phone has already been registered') {
      formError = {
        phone: {
          validateStatus: 'error',
          help: validationMessages.PHONE_NUMBER_REGISTERED,
        },
      };
    } else if (this.props.formError.phone === 'Phone number is incorrect') {
      formError = {
        phone: {
          validateStatus: 'error',
          help: validationMessages.PHONE_NUMBER_INVALID,
        },
      };
    }
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
    const { getFieldDecorator } = this.props.form;
    if (this.props.formSuccess) {
      message.success('Edit Profil sukses');
      this.props.editProfilReset();
      this.props.history.goBack();
    }
    const uploadButton = (
      <div>
        <Icon type="camera-o" style={{ fontSize: 20, color: '#DCDCDC' }} />
      </div>
    );
    const style = {
      borderRadius: '50%',
    };
    const imageUrl = this.state.imageUrl;
    return (
      this.props.formData !== null && (
        <div>
          {this.props.formSuccess ? (
            <Alert message="Update profil berhasil." type="success" />
          ) : (
            <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
              <div className="container-photo-detail">
                <Row gutter={5}>
                  <Col xs={3}>
                    <Upload
                      name="image"
                      listType="picture-card"
                      className="avatar-uploader circle-icon"
                      showUploadList={false}
                      beforeUpload={this.beforeUpload}
                      onChange={this.onChangeUpload}
                      action={
                        constant.URL_MASTER_PUBLIC_PATH +
                        constant.URL_UPLOAD_PHOTO
                      }
                    >
                      {imageUrl ? (
                        <div className="wrap" style={{ width: 100 }}>
                          <CustomProfileImage
                            style={{
                              backgroundImage: `url(${imageUrl})`,
                              width: '100px',
                              height: '100px',
                            }}
                            className="style__profil-global"
                          />
                        </div>
                      ) : this.props.formData && this.props.formData.image ? (
                        <div
                          className="wrap"
                          style={{ width: '100px', marginRight: 0 }}
                        >
                          <CustomProfileImage
                            style={{
                              backgroundImage: `url(${
                                this.props.formData.image
                              })`,
                              width: '100px',
                              height: '100px',
                            }}
                            className="style__profil-global"
                          />
                        </div>
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Col>
                </Row>
              </div>
              <div style={{ paddingTop: '15px' }}>
                <FormItem label="Nama depan">
                  {getFieldDecorator('firstName', {
                    initialValue: this.props.formData.firstName,
                    rules: [
                      {
                        required: true,
                        message: validationMessages.FIRST_NAME_REQUIRED,
                      },
                    ],
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="Nama belakang">
                  {getFieldDecorator('lastName', {
                    initialValue: this.props.formData.lastName,
                    rules: [
                      {
                        required: true,
                        message: validationMessages.LAST_NAME_REQUIRED,
                      },
                    ],
                  })(<Input type="text" />)}
                </FormItem>
                <FormItem label="No. Handphone" {...formError.phone}>
                  {getFieldDecorator('phone', {
                    initialValue: this.props.formData.phone,
                    rules: [
                      {
                        required: true,
                        message: validationMessages.PHONE_NUMBER_REQUIRED,
                      },
                      {
                        pattern: constant.REGEX_PHONE_NUMBER,
                        message: validationMessages.PHONE_INVALID,
                      },
                      {
                        pattern: constant.REGEX_NUMBER_ONLY,
                        message: validationMessages.PHONE_NUMBER_ONLY,
                      },
                      {
                        min: 8,
                        message: 'Min 8 karakter',
                      },
                      {
                        max: 13,
                        message: 'Max 13 karakter',
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                <FormItem label="Email" {...formError.email}>
                  {getFieldDecorator('email', {
                    initialValue: this.props.formData.email,
                    rules: [
                      {
                        required: true,
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
                    loading={this.props.loading || this.props.upload.loading}
                  >
                    Simpan
                  </Button>
                </FormItem>
              </div>
            </Form>
          )}
        </div>
      )
    );
  }
}

const EditProfil = Form.create()(editProfil);

const mapStateToProps = (state) => ({
  upload: state.get('upload'),
  member: state.get('authentication').member,
  authentication: state.get('authentication'),
  token: state.get('authentication').token,
  formData: state.get('updateProfil').formData,
  formError: state.get('updateProfil').formError,
  formSuccess: state.get('updateProfil').formSuccess,
  loading: state.get('updateProfil').loading,
});

const mapDispatchToProps = (dispatch) => ({
  postUploadImageProfile: (data) => dispatch(actions.postUploadImageProfile(data)),
  submitEditProfil: (form) => dispatch(actions.submitEditProfil(form)),
  editProfilReset: () => dispatch(actions.editProfilReset()),
  // editProfilResetLoading: () => dispatch(actions.editProfilResetLoading()),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditProfil)
);
