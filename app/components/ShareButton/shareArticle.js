import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Row, Col, Modal } from 'antd';
import CustomSVG from '../../components/CustomSVG/index';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import constant from '../../utils/configs/constant';

class ShareArticle extends React.Component {
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
            Bagikan Artikel ini ke:
          </div>
          <Row type={'flex'} gutter={8}>
            <Col span={12}>
              <FacebookShareButton
                url={`${window.location.hostname}/komunitas/artikel/${this.props.artikel}`}
                // quote={this.props.product.name}
                className="clickable"
              >
                <Button className="btn-block facebook-color">Facebook</Button>
              </FacebookShareButton>
            </Col>
            <Col span={12}>
              <WhatsappShareButton
                url={`${window.location.hostname}/komunitas/artikel/${this.props.artikel}`}
                // title={this.props.product.name}
                // quote={this.props.product.description}
                // separator=":: "
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
          <CustomSVG className="icon--share-comment-article" name="ic-share" />
          <span style={{paddingLeft:5}}> Bagikan</span>
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
)(ShareArticle);
