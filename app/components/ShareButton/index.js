import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Row, Col, Modal } from 'antd';

import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import constant from '../../utils/configs/constant';

class ShareBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalSocialShare: false,
    };
  }

  showModalSocialShare = () => {
    this.setState({
      showModalSocialShare: true,
    });
  };

  /**
   * Close Modal Social Share
   */
  closeModalSocialShare = () => {
    this.setState({ showModalSocialShare: false });
  };
  render() {
    return (
      <div key={this.props.key}>
        <Modal
          visible={this.state.showModalSocialShare}
          onCancel={this.closeModalSocialShare}
          footer={null}
          width={400}
        >
          <div style={{ marginTop: 15, marginBottom: 15 }}>
            Bagikan produk ini ke:
          </div>
          <Row type={'flex'} gutter={8}>
            <Col span={12}>
              <FacebookShareButton
                url={`${window.location.hostname}/produk/${this.props.product.uuid}`}
                quote={this.props.product.name}
                className="clickable"
              >
                <Button className="btn-block facebook-color">Facebook</Button>
              </FacebookShareButton>
            </Col>
            <Col span={12}>
              <WhatsappShareButton
                url={`${window.location.hostname}/produk/${this.props.product.uuid}`}
                title={this.props.product.name}
                quote={this.props.product.description}
                separator=":: "
                className="clickable"
              >
                <Button className="btn-block whatsapp-color">Whatsapp</Button>
              </WhatsappShareButton>
            </Col>
          </Row>
        </Modal>

        <Row
          type="flex"
          align="middle"
          className="clickable"
          onClick={() => this.showModalSocialShare()}
        >
          <Icon type="share-alt" className="icon__button" />
          <div style={{ marginLeft: 5 }}>
            {this.props.showText && <span>Bagi</span>}
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareBtn);
