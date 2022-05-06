import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Row, Col, Rate, Input, Form } from 'antd';
import moment, { now } from 'moment';
import ImageIcon from '../../../../../../assets/images/placeholder/no-image.png';
import CustomProfile from '../../../../../components/CustomSVG/index';
import * as actions from '../../../../../actions/index';
import validationMessages from '../../../../../utils/configs/validationMessages';
import ListComment from './listComment';

moment.locale('id');
const FormItem = Form.Item;
const { TextArea } = Input;

class ReviewsTDS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      comment: null,
      validateComment: null,
      textAreaRow: '',
      replyButton: false,
      showFormComment: false,
    };
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.getReviewsTDS({ id: this.state.id });
  }
  // componentDidUpdate(prevProps, prevState) {}

  handleComment = () => {
    this.setState({
      // comment: value.data.id,
      showRepplyBtn: !this.state.showRepplyBtn,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.replyCommentTDS(values);
      }
      this.setState({
        textAreaRow: '',
      });
    });
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.reviewTDS !== prevProps.reviewTDS) {
  //     this.props.getReviewsTDS({ id: this.state.id });
  //     this.props.resetReviewTdsStore();
  //   }
  // }
  render() {
    const { getFieldDecorator } = this.props.form;
    const style = {
      marginTop: '66px',
      padding: '0px 15px',
      background: '#fff',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    };
    const boxReview = {
      padding: 0,
      border: '1px solid #cccccc4a',
      marginTop: '20px',
    };
    const paddingAll = {
      padding: '0px 16px',
    };
    return (
      <div
        className="curtain"
        style={{ backgroundColor: '#fafafa' }}
      >
        <div className="toolbar">
          <Row type="flex" justify="center">
            <Icon
              type="close"
              className="clickable"
              style={{ fontSize: 24, marginLeft: 10 }}
              onClick={() => this.props.onClickShowReview(false)}
            />
            <span
              className="font-weight-bold"
              style={{ marginTop: 2, marginLeft: 10, fontSize: 18 }}
            >
              Review
            </span>
          </Row>
        </div>
        {this.props.reviewTDS.Review == null ? (
          <div style={{ paddingTop: '50%' }}>
            <Row type="flex" justify="center" style={{ marginTop: 25 }}>
              <Col>
                <div>Belum ada Review</div>
              </Col>
            </Row>
            <Row type="flex" justify="center" style={{ marginTop: 20 }} />
          </div>
        ) : (
          <Row style={{ background: '#fff', marginTop:70, padding: '0px 15px', height:'100vh'}}>
            {this.props.reviewTDS.Review.map((review) => (
              <ListComment review={review} profil={this.props.member}/>
            ))}
          </Row>
        )}
      </div>
    );
  }
}

ReviewsTDS.propTypes = {};

const mapStateToProps = (state) => ({
  reviewTDS: state.get('reviewTDS').data,
  member: state.get('authentication').member,
  formSuccess: state.get('TdsReviewComment').formSuccess,
});

const reviewsTDS = Form.create()(ReviewsTDS);

const mapDispatchToProps = (dispatch) => ({
  postReviewTDS: (data) => dispatch(actions.postReviewTDS(data)),
  getRedeemPointProducts: (data) =>
    dispatch(actions.getRedeemPointProducts(data)),
  getReviewsTDS: (data) => dispatch(actions.getReviewsTDS(data)),
  replyCommentTDS: (data) => dispatch(actions.replyCommentTDS(data)),
  resetReviewTdsStore: () => dispatch(actions.resetReviewTdsStore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reviewsTDS);
