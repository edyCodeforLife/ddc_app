import React from 'react';
import ImageIcon from '../../../../../../../assets/images/placeholder/no-image.png';
import {
  Row,
  Col,
  Button,
  Icon,
  Form,
  Input,
  message,
  Upload,
  Spin,
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../../../actions/index';
import { NavLink, withRouter, Redirect } from 'react-router-dom';
import validationMessages from '../../../../../../utils/configs/validationMessages';
// import UploadPhoto from '../../../../../Components/UploadPhoto/uploadPhoto';
import constant from './../../../../../../utils/configs/constant';
import CustomProfileImage from '../../../../../../components/CustomProfileImage';

const FormItem = Form.Item;
class editToko extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // imageUrl:constant.URL_MASTER_PATH + this.props.memberStore.memberStore.image,
      image: null,
      fileList: [],
      uploading: false,
    };
  }
  componentDidMount() {
    this.props.setToolbarState({
      title: 'Edit Toko',
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
      this.props.postUploadImageStore(info.file.originFileObj);
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
        this.props.postUploadImageStore(info.file.originFileObj);
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
        if (this.props.memberStore !== null) {
          if (this.props.memberStore.memberStore.id !== 0) {
            values.image = this.props.upload.imagePath;
            this.props.submitEditToko(
              values,
              this.props.memberStore.memberStore.id
            );
          } else {
            values.image = this.props.upload.imagePath;
            this.props.submitPostEditToko(values);
          }
        }
      }
    });
  };
  render(props) {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    if (this.props.formSuccess) {
      message.success('Edit Toko sukses');
      this.props.editTokoReset();
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
    return this.props.memberStore ? (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div className="container-photo-detail">
            <Row gutter={5}>
              <Col xs={3}>
                <div>
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
                      ) : this.props.memberStore &&
                      this.props.memberStore.memberStore.image ? (
                        <div
                          className="wrap"
                          style={{ width: 100, marginRight: 0 }}
                        >
                          <CustomProfileImage
                            style={{
                              backgroundImage: `url(${
                                this.props.memberStore.memberStore.image
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
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="text-label" style={{ color: '#bfbfbf' }}>
            File format jpg, jpeg, png.
          </div>
          <div className="text-label" style={{ color: '#bfbfbf' }}>
            <i>* Max size file 5 MB.</i>
          </div>
          <div style={{ paddingTop: '15px' }}>
            <FormItem label="Nama Toko">
              {getFieldDecorator('name', {
                initialValue: this.props.memberStore.memberStore.name,
                rules: [
                  {
                    required: true,
                    message: validationMessages.NAME_SHOP_REQUIRED,
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
                loading={this.props.loading || this.props.upload.loading}
              >
                Simpan
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    ) : (
      <div className="loading--state">
        <Spin />
      </div>
    );
  }
}

const EditToko = Form.create()(editToko);

const mapStateToProps = (state) => ({
  upload: state.get('upload'),
  member: state.get('authentication').member,
  authentication: state.get('authentication'),
  token: state.get('authentication').token,
  // formData: state.get('updateProfil').formData,
  formError: state.get('updateProfil').formError,
  formSuccess: state.get('updateProfil').formSuccess,
  loading: state.get('updateProfil').loading,
  memberStore: state.get('updateProfil').formData,
});

const mapDispatchToProps = (dispatch) => ({
  postUploadImageStore: (data) => dispatch(actions.postUploadImageStore(data)),
  submitPostEditToko: (data, token, upload) =>
    dispatch(actions.submitPostEditToko(data, token, upload)),
  // submitEditPictureToko: () => dispatch(actions.submitEditPictureToko()),
  submitEditToko: (data, token, id, upload) =>
    dispatch(actions.submitEditToko(data, token, id, upload)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  editTokoReset: () => dispatch(actions.editTokoReset()),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditToko)
);
