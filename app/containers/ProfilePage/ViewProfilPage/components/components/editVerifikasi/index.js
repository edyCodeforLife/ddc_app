import React from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  Icon,
  Form,
  Input,
  message,
  Upload,
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../../actions/index';
import { withRouter, Redirect } from 'react-router-dom';
import validationMessages from '../../../../../../utils/configs/validationMessages';
import SamplePhotoKTP from '../../../../../../../assets/images/ktp-elektronik@2x.png';
import CustomProfileImage from '../../../../../../components/CustomProfileImage';
// import UploadPhoto from '../../../../../Components/UploadPhoto/uploadPhoto';

const FormItem = Form.Item;
class verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      image: null,
      fileList: [],
      uploading: false,
      visible: false,
    };
  }
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Verifikasi',
      hideBurgerMenu: true,
      showFooter: false,
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
      this.props.postUploadImageIDcard(info.file.originFileObj);
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          image: info.file.originFileObj,
          loading: false,
          name: info.file.originFileObj.name,
        })
      );
    } else {
      if (this.state.name !== info.file.originFileObj.name) {
        console.log('Manggil Lagi');
        this.props.postUploadImageIDcard(info.file.originFileObj);
        // Get this url from response in real world.
        this.setState({
          name: info.file.originFileObj.name,
        });
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            imageUrl,
            image: info.file.originFileObj,
            loading: false,
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
        this.props.submitVerificationProfil(
          values,
          this.props.token,
          this.state.image,
          this.props.verification.idCardNumber
        );
      }
      this.setState({
        visible: false,
      });
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
    // setTimeout(() => this.state.visible.destroy(), 10000);
  };

  // handleOk = (e) => {
  //   this.setState({
  //     visible: false,
  //   }, () => this.handleSubmit());
  //   // this.props.history.goBack();
  // }

  // handleCancel = (e) => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // }

  render(props) {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.props.formSuccess) {
      this.props.updateVerificationReset();
      this.props.history.goBack();
    }
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="camera-o" style={{ fontSize: 20, color: '#DCDCDC' }} />
      </div>
    );
    const style = {
      borderRadius: '50%',
    };
    const imageUrl = this.state.imageUrl;
    return this.props.verification !== null ? (
      <div>
        <Modal
          title="Kirim Verifikasi"
          closable={false}
          visible={this.state.visible}
          // onOk={this.handleOk}
          footer={[
            <Button
              key="ok"
              onClick={this.handleSubmit}
              style={{ border: 'none' }}
            >
              OK, Saya Mengerti
            </Button>,
          ]}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0,
            }}
          >
            Data Anda akan diperiksa terlebih dahulu oleh team Kami, apabila
            data yang Anda kirimkan sesuai dengan ketentuan maka Kami akan
            Memverifikasi Akun Anda, Terimakasih.
          </p>
        </Modal>
        <Form onSubmit={this.handleSubmit}>
          <div className="container-photo-detail">
            <div className="status__label" style={{ color: '#ccc' }}>
              Status
            </div>
            {this.props.verification.imageIdCard !== '' ? (
              <div
                className="status__verification"
                style={{ fontSize: '12px', color: '#16b8b2' }}
              >
                <span>Menunggu Terverifikasi</span>
              </div>
            ) : (
              <div
                className="status__verification"
                style={{ fontSize: '12px' }}
              >
                <span style={{ color: '#e61e3c' }}>Belum Verifikasi</span>
              </div>
            )}
            <div className="desc__attention">
              <p
                style={{
                  fontStyle: 'italic',
                  color: '#000000b5',
                  padding: '5px',
                  fontSize: '12px',
                }}
              >
                * Pastikan nama Anda sesuai dengan nama di member Anda
              </p>
            </div>
            <div className="status__verification" style={{ fontSize: '12px' }}>
              <span>Foto diri beserta KTP Anda</span>
            </div>
            <div className="desc__attention">
              <p
                style={{
                  fontStyle: 'italic',
                  color: '#000000b5',
                  padding: '5px',
                  fontSize: '12px',
                }}
              >
                * Nomor KTP dan wajah Anda harus terlihat jelas.
              </p>
            </div>
            <Row type="flex" middle="align" justify="center" gutter={15}>
              <Col xs={12}>
                <div className="upload__ktp">
                  <div className="my-2">
                    <Upload
                      name="image"
                      listType="picture-card"
                      className="avatar-uploader circle-icon"
                      showUploadList={false}
                      beforeUpload={this.beforeUpload}
                      onChange={this.onChangeUpload}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ maxWidth: '100%'}}
                        />
                      ) : this.props.verification &&
                      this.props.verification.imageIdCard ? (
                        <img
                          src={this.props.verification.imageIdCard}
                          alt="profile"
                          style={{ maxWidth: '100%' }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                    <div
                      className="text-label"
                      style={{
                        color: '#bfbfbf',
                        textAlign: 'center',
                        fontSize: '12px',
                      }}
                    >
                      Tambah Photo
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ width: '100%', padding: '8px 0px' }}>
                  <CustomProfileImage
                    style={{
                      backgroundImage: `url(${SamplePhotoKTP})`,
                      width: '100%',
                      height: '150px',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '3px',
                      backgroundPosition: 'center center',
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: '15px' }}>
            <FormItem label="No. Identitas (KTP)">
              {getFieldDecorator('idCardNumber', {
                initialValue: this.props.verification.idCardNumber,
                rules: [
                  {
                    required: true,
                    message: validationMessages.NIK_REQUIRED,
                  },
                  {
                    min: 8,
                    message: `NIK ${validationMessages.TOO_SHORT}`,
                  },
                  {
                    max: 25,
                    message: `NIK ${validationMessages.TOO_LONG}`,
                  },
                ],
              })(<Input type="number" />)}
            </FormItem>
            <FormItem>
              <Button
                className="btn-block"
                type="primary"
                size={'large'}
                htmlType="button"
                onClick={this.showModal}
                loading={this.props.loading}
              >
                Verifikasi Sekarang
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    ) : null;
  }
}

const Verification = Form.create()(verification);

const mapStateToProps = (state) => ({
  upload: state.get('upload'),
  member: state.get('authentication').member,
  token: state.get('authentication').token,
  authentication: state.get('authentication'),
  // formData: state.get('updateProfil').formData,
  formError: state.get('updateProfil').formError,
  formSuccess: state.get('updateProfil').formSuccess,
  loading: state.get('updateProfil').loading,
  verification: state.get('updateProfil').formData,
});

const mapDispatchToProps = (dispatch) => ({
  postUploadImageIDcard: (data) => dispatch(actions.postUploadImageIDcard(data)),
  submitVerificationProfil: (data, token, upload, idcard) =>
    dispatch(actions.submitVerificationProfil(data, token, upload, idcard)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  updateVerificationReset: () => dispatch(actions.updateVerificationReset()),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Verification)
);
