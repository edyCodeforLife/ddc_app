import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col, Rate, Form, Input } from 'antd';
import * as actions from '../../actions/index';
import CustomProfileImage from '../../components/CustomProfileImage';

// import * as actions from '../../../../actions/index';
// import TextArea from 'antd/lib/input/TextArea';
const { TextArea } = Input;

class ReviewTDSPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatusId: props.activeOrderStatusId,
      rating: 0,
      review: null,
      TDSName: '',
      image: null,
      redirect: false,
    };
  }

  componentDidMount() {
    /**
   * On Change Rating
  //  *value
   */
    const reviewID = this.props.match.params.idReview;
    this.props.getReviewTDS({ idReview: reviewID });
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps);
    let dataTDS = {};
    // console.log(this.props.reviewTDS);
    if (this.props.reviewTDS) {
      // console.log(this.props.reviewTDS);
      if (this.props.reviewTDS.data) {
        dataTDS = newProps.reviewTDS.data.branchMember;
        // console.log(dataTDS);
        this.setState({
          TDSName: `${dataTDS.firstName} ${dataTDS.lastName}`,
          image: dataTDS.image,
        });
      }
    }
  }

  onChangeRating = (value) => {
    this.setState({
      rating: value,
    });
    // console.log(this.state.rating);
  };

  onInputChange = (e) => {
    this.setState({
      review: e.target.value,
    });
    // console.log(this.state.review);
  };

  submitReviewTDS = (e) => {
    e.preventDefault();
    const reviewID = this.props.match.params.idReview;
    const data = {
      idReview: reviewID,
      title: '',
      comment: this.state.review,
      rating: this.state.rating,
    };
    this.props.putReviewTDS(data);
  };

  render() {
    const style = {
      paddingTop: 30,
    };
    const styleBeriRating = {
      paddingBottom: '15px',
    };
    const title = {
      fontSize: '16px',
      fontWeight: '500',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#282828',
      padding: '0px 20px',
    };
    if (this.props.reviewTDS.formSuccess) {
      this.props.storeReviewTDS({ formSuccess: false });

      const token = localStorage.getItem('token');
      this.props.getLoginInformation({ token });

      return <Redirect to="/katalog" />;
    }

    // Tidak bisa komen jika sudah ada komen
    // if (this.state.redirect) {
    //   return <Redirect to="/beranda" />;
    // }

    return (
      <div
        id="curtainform"
        className="curtain margin-left-review"
        style={{ backgroundColor: '#fafafa' }}
      >
        <div className="toolbar">
          <Row type="flex" justify="center">
            {/* <Icon
              type="close"
              className="clickable"
              style={{ fontSize: 24, marginLeft: 10 }}
              // onClick={() => this.props.onClickShowFilter(false)}
            /> */}
            <span className="font-weight-bold" style={title}>
              Berikan Ulasan
            </span>
          </Row>
        </div>
        <Row
          style={{
            background: '#fafafa',
            marginTop: 67,
            boxShadow: 'rgba(40, 40, 40, 0.2) 0px 0px 0px 0px',
            border: '0.9px solid rgba(220, 220, 220, 0.2)',
          }}
        >
          <Row
            className="bg-white"
            style={{ boxShadow: 'rgba(40, 40, 40, 0.2) 0px 0px 0.05px 0px' }}
          >
            <Form onSubmit={this.submitReviewTDS}>
              <div id="container-body">
                <div className="view-container mt-4">
                  <Row gutter={5}>
                    <Col xs={4}>
                      <div className="wrap" style={{ width: 60 }}>
                        {this.state.image !== '' ? (
                          <CustomProfileImage
                            style={{
                              backgroundImage: `url(${
                                this.state.image
                              })`,
                            }}
                            className="review__tds-picture"
                          />
                        ) : (
                          <CustomProfileImage
                            style={{
                              background: '#e1e1e1',
                            }}
                            className="review__tds-picture"
                          />
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="text-container">
                  <span className="label__member-reviewtds">Nama Member</span>
                </div>
                <Row
                  type="flex"
                  align="middle"
                  justify="center"
                  className="member__name-reviewtds"
                >
                </Row>

                <div className="text-container">
                  <span>
                    <strong>{this.state.TDSName}</strong>
                  </span>
                </div>

                <div
                  className="text-container space-filled pt-30"
                  style={styleBeriRating}
                >
                  <span className="beri__rating-tds">Beri Rating</span>
                </div>

                <div className="text-container">
                  <Rate id="rating" onChange={this.onChangeRating} />
                </div>

                <div
                  style={{
                    padding: '0px 15px',
                    paddingTop:'30px',
                    fontSize: '12px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    fontStretch: 'normal',
                    lineheight: 'normal',
                    letterSpacing: 'normal',
                    color: '#282828',
                  }}
                >
                  <label htmlFor="review">Isi Ulasan</label>
                </div>
                <div className="containerarea mb-3">
                  <TextArea
                    id="review"
                    placeholder="Contoh: fast respon, packing rapih ,dll.."
                    onChange={this.onInputChange}
                    required
                  />
                </div>
              </div>
              <div className="p-15">
                <Button
                  className="btn-block"
                  type="primary"
                  disabled={this.state.review === '' || this.state.rating === 0}
                  onClick={this.submitReviewTDS}
                >
                  Kirim Ulasan
                </Button>
              </div>
            </Form>
          </Row>
        </Row>
      </div>
    );
  }
}

// ReviewTDSPage.propTypes = {};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  reviewTDS: state.get('reviewTDS'),
});

const mapDispatchToProps = (dispatch) => ({
  getLoginInformation: (data) => dispatch(actions.getLoginInformation(data)),
  getReviewTDS: (data) => dispatch(actions.getReviewTDS(data)),
  putReviewTDS: (data) => dispatch(actions.putReviewTDS(data)),
  storeReviewTDS: (data) => dispatch(actions.storeReviewTDS(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewTDSPage);
