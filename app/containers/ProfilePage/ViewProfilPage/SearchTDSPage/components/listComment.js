import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Row, Col, Rate, Input, Form } from 'antd';
import moment, { now } from 'moment';
import ImageIcon from '../../../../../../assets/images/placeholder/no-image.png';
import CustomProfile from '../../../../../components/CustomSVG/index';
import * as actions from '../../../../../actions/index';
import validationMessages from '../../../../../utils/configs/validationMessages';
import FormComment from './formComment';
const FormItem = Form.Item;
const { TextArea } = Input;

export class listComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRepplyBtn: false,
      comment: null,
      Review: null,
    };
  }
  handleComment = () => {
    this.setState({
      showRepplyBtn: true,
    });
  };

  submitComment = (comment, id) => {
    const data = {
      comment,
      id,
    };
    this.setState({
      comment,
    });
    this.props.replyCommentTDS(data);
    console.log(data);
  };
  render() {
    const style = {
      marginTop: '0px',
      padding: '0px 0px',
      background: '#fff',
      paddingBottom: 0,
      //   border: '1px solid #dcdcdc',
      //   border: '1px solid #cccccc4a',
      //   boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    };
    const boxReview = {
      padding: 0,
      //   border: '1px solid #cccccc4a',
      marginTop: '20px',
      border: '1px solid #dcdcdc',
    };
    const paddingAll = {
      padding: '0px 16px',
    };
    return (
      <React.Fragment>
        <Row>
          <Row style={style}>
            <Row type="flex" align="middle" style={boxReview}>
              <Col span={4} style={paddingAll}>
                <label htmlFor="photo_url">
                  <div className="wrap">
                    <CustomProfile
                      style={{
                        background: '#e1e1e1',
                      }}
                      className="style__profil-global"
                    />
                  </div>
                </label>
              </Col>
              <Col span={20} style={paddingAll}>
                <div className="heade__shop-name">
                  {this.props.review.memberName}
                </div>
                <div className="list__tds-rate">
                  {moment(this.props.review.createAt).format('LL, h:mm')}{' '}
                  {'WIB'}
                </div>
                <div>
                  {' '}
                  <Rate
                    className="list_tds_rate"
                    disabled
                    allowHalf
                    defaultValue={this.props.review.rating}
                  />
                </div>
              </Col>
              <Col span={24} style={{ padding: '0px 15px' }}>
                <p
                  style={{
                    fontSize: 14,
                    letterSpacing: 'normal',
                    lineHeight: 'normal',
                    paddingTop: 15,
                    lineHeight: '1.43',
                    color: '#282828',
                  }}
                >
                  {this.props.review.comment}
                </p>
              </Col>
              {!this.props.review.branchReviewComment &&
                this.props.profil.branchId === this.props.review.branchId &&
                !this.state.comment && (
                  <Col
                    span={24}
                    style={{
                      textAlign: 'right',
                      padding: '10px 15px',
                      paddingBottom: 15,
                    }}
                    onClick={this.handleComment}
                  >
                    <CustomProfile
                      className="icon--reply-comment"
                      name="ic-share"
                    />
                    <strong>
                      <span className="clickable"> Balas</span>
                    </strong>
                  </Col>
                )}
            </Row>
            <Row style={style}>
              {this.props.review.branchReviewComment !== null &&
                this.props.review.branchReviewComment.comment !== '' && (
                  <Col
                    span={24}
                    style={{ background: '#f0f0f0', padding: '15px 0px' }}
                  >
                    <Col span={4} style={paddingAll}>
                      <label htmlFor="photo_url">
                        <div className="wrap" style={{ background: '#f0f0f0' }}>
                          <CustomProfile
                            style={{
                              background: '#e1e1e1',
                            }}
                            className="style__profil-global"
                          />
                        </div>
                      </label>
                    </Col>
                    <Col span={20} style={paddingAll}>
                      <div className="heade__shop-name">
                        {this.props.review.branchReviewComment[0].memberName}
                      </div>
                      <div className="list__tds-rate">
                        {moment(
                          this.props.review.branchReviewComment[0].createAt
                        ).format('LL, h:mm')}{' '}
                        {'WIB'}
                      </div>
                    </Col>
                    <Col span={24} style={{ padding: '0px 15px' }}>
                      <p
                        style={{
                          fontSize: 14,
                          letterSpacing: 'normal',
                          lineHeight: 'normal',
                          lineHeight: '1.43',
                          color: '#282828',
                        }}
                      >
                        {this.props.review.branchReviewComment[0].comment}
                      </p>
                    </Col>
                  </Col>
                )}
              {this.state.comment && (
                <Col
                  span={24}
                  style={{ background: '#f0f0f0', padding: '15px 0px' }}
                >
                  <Col span={4} style={paddingAll}>
                    <label htmlFor="photo_url">
                      <div className="wrap" style={{ background: '#f0f0f0' }}>
                        <CustomProfile
                          style={{
                            background: '#e1e1e1',
                          }}
                          className="style__profil-global"
                        />
                      </div>
                    </label>
                  </Col>
                  <Col span={20} style={paddingAll}>
                    <div className="heade__shop-name">{'Wibawa Tds'}</div>
                    <div className="list__tds-rate">
                      {moment(this.props.review.createAt).format('LL, h:mm')}{' '}
                      {'WIB'}
                    </div>
                    <div>
                      {' '}
                      <Rate
                        className="list_tds_rate"
                        disabled
                        allowHalf
                        defaultValue={this.props.review.rating}
                      />
                    </div>
                  </Col>
                  <Col span={24} style={{ padding: '0px 15px' }}>
                    <p
                      style={{
                        fontSize: 14,
                        letterSpacing: 'normal',
                        lineHeight: 'normal',
                        lineHeight: '1.43',
                        color: '#282828',
                      }}
                    >
                      {this.state.comment ? this.state.comment : null}
                    </p>
                  </Col>
                </Col>
              )}
            </Row>
            <Row>
              {this.state.showRepplyBtn &&
                !this.state.comment && (
                  <FormComment
                    id={this.props.review.id}
                    checkComment={this.props.review}
                    data={this.props.review.id}
                    submitComment={this.submitComment}
                  />
                )}
            </Row>
          </Row>
        </Row>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  reviewTDS: state.get('reviewTDS').data,
  member: state.get('authentication').member,
  formSuccess: state.get('TdsReviewComment').formSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  replyCommentTDS: (data) => dispatch(actions.replyCommentTDS(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(listComment);
