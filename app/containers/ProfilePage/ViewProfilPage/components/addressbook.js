import React from 'react';
import ImageIcon from '../../../../../assets/images/placeholder/no-image.png';
import { Row, Col, Icon, Radio, message, Spin, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/index';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

class addressBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: null,
    };
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }
  componentDidMount() {
    this.props.setToolbarState({
      showCart: true,
      showProfile: true,
      hideBurgerMenu: false,
      showFooter: false,
    });
  }
  deleteItem = (id) => {
    console.log(id);
    this.props.SubmitdeleteListMemberAddress(id);
  };

  handleSelect = (address, index) => {
    // console.log(address);
    address.default = 1;
    // const data = {
    //   default: 1,
    // };
    this.props.submitUpdateAddress(address, this.props.token, address.id);
    this.setState({
      selectedAddress: index,
    });
  };

  handleClick = (id) => {
    console.log(id);
    Modal.confirm({
      title: 'Peringatan!',
      visible: false,
      keyboard: true,
      centered: true,
      content: 'Yakin Hapus Alamat Ini?',
      className: 'modal-adjustment',
      onOk: () => { this.deleteItem(id); },
      onCancel: false,
    });
  }

  render() {
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const style = {
      background: '#fff',
      marginLeft: '-15px',
      marginRight: '-15px',
      marginTop: '-15px',
    };
    const paddingRow = {
      padding: '15px',
    };
    const paddingRows = {
      padding: '15px 15px',
    };
    if (this.props.formSuccess) {
      message.success('Alamat telah berhasil dihapus');
      this.props.getProfileDetail(this.props.token);
      this.props.updateAddressReset();
      // this.props.history.goBack();
    }
    return (
      <React.Fragment>
        <Row style={style}>
          <Col span={24} style={{ padding: '0px 0px' }}>
            <Row
              className="address__book-new"
              style={{
                background: '#fafafa',
                borderBottom: '1px solid #bfbfbf59',
              }}
              type="flex"
              align="middle"
              justify="center"
            >
              <Col span={12} style={paddingRow} className="buku__alamat-add">
                Buku Alamat
              </Col>
              <Col span={12} style={paddingRows}>
                <NavLink to="buku-alamat/tambah-alamat">
                  <Button
                    className="btn-block custom"
                    type="primary"
                    htmlType="button"
                    style={{ fontSize: '12px' }}
                  >
                    <Icon type="plus" /> Tambah Alamat
                  </Button>
                </NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.memberDeliveryAddress &&
        this.props.memberDeliveryAddress.memberDeliveryAddress ? (
          this.props.memberDeliveryAddress.memberDeliveryAddress.map(
            (address, index) => (
              <div
                key={address.id}
                style={{
                  marginLeft: -15,
                  marginRight: -15,
                  marginTop: -15,
                  padding: '0px 0px',
                  marginBottom: '27px',
                }}
              >
                <div className="address__book">
                  {address.default === 1 && (
                    <Row type="flex" justify="end" align="middle" style={{ padding: '0px 15px' }}>
                      <label className="label__main-address">
                        Alamat Utama
                      </label>
                    </Row>
                  )
                  }
                  <div className="container__address-book">
                    <Row type="flex" justify="center">
                      <Col span={24} style={{ fontWeight: '500' }}>
                        {address.name}
                      </Col>
                      <Col
                        span={24}
                        style={{ fontWeight: '500', lineHeight: '25px' }}
                      >
                        {address.receiverName}
                      </Col>
                    </Row>
                    <Row type="flex">
                      <Col span={2}>
                        {/* <fieldset>
                    <input
                      type="radio"
                      checked={address.default === 1}
                      onChange={() => this.handleSelect(address, index)}
                      className="radio"
                    />
                  </fieldset> */}

                        {/* <Radio
                          value={this.state.value}
                          checked={address.default === 1}
                          onChange={() => this.handleSelect(address, index)}
                        /> */}
                      </Col>
                      <Col span={24}>
                        <fieldset className="text__describ-addressBook">
                          <label htmlFor="address">
                            <Row>
                            {address.phone}
                            </Row>
                            <Row>{address.Address}</Row>
                            {/* <Row>{address.districtId}, {address.cityId}</Row>
                            <Row>{address.provinceId}, {address.postalCode}</Row> */}
                          </label>
                        </fieldset>
                      </Col>
                    </Row>
                    <Row style={{ padding: '0px 0px' }}>
                      <Col span={16}>
                        <span style={{ fontSize: '12px' }}>
                          {/* <NavLink
                            to={`/profil/buku-alamat/edit-alamat/${index}`}
                          >
                            <Icon type="edit" /> Ubah
                          </NavLink> */}
                        </span>
                      </Col>
                      {address.default !== 1 ? (
                        <Col span={6} push={4}>
                          <span style={{ fontSize: '12px' }}>
                            <a
                              onClick={() => this.handleClick(address.id)}
                            // {() => this.deleteItem(address.id)}
                            >
                              <Icon type="delete" /> hapus
                            </a>
                          </span>
                        </Col>
                      ) : null}
                    </Row>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="loading--state">
            <Spin />
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  token: state.get('authentication').token,
  authentication: state.get('authentication'),
  // formData: state.get('updateProfil').formData,
  formError: state.get('updateProfil').formError,
  formSuccess: state.get('updateProfil').formSuccess,
  memberDeliveryAddress: state.get('updateProfil').formData,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  submitUpdateAddress: (data, token, id) =>
    dispatch(actions.submitUpdateAddress(data, token, id)),
  getProfileDetail: (token) => dispatch(actions.getProfileDetail(token)),
  updateAddressReset: () => dispatch(actions.updateAddressReset()),
  SubmitdeleteListMemberAddress: (id) =>
    dispatch(actions.SubmitdeleteListMemberAddress(id)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(addressBook)
);
