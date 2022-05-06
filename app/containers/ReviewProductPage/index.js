/**
 *
 * ReviewProductPage
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Input, Form, Rate } from 'antd';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';
import validationMessages from '../../utils/configs/validationMessages';

const wrapperStyle = {
  backgroundColor: '#ffffff',
  marginLeft: -15,
  marginRight: -15,
  marginBottom: -15,
  minHeight: '90vh',
  boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
  padding: 15,
};

const FormItem = Form.Item;
const { TextArea } = Input;

export class ReviewProductPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = { rating: 0 };

    this.props.setToolbarState({
      title: 'Beri Ulasan',
      icon: 'close',
      hideBurgerMenu: true,
      showFooter: false,
      redirect: false,
    });

    // const productUuid = this.props.match.params.productUuid;
    // this.props.getProduct({ uuid: productUuid });
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    const reviewId = this.props.match.params.productUuid;
    const review = this.props.authentication.member.productUnreview.find(
      (data) => data.id == reviewId
    );
    if (review) {
      this.props.getProduct({ uuid: review.uuid });
    } else {
      this.setState({
        redirect: true,
      });
    }

    // console.log(review);
  }

  /**
   * On Change Rating
   * @param {number} value
   */
  onChangeRating = (value) => {
    this.setState({ rating: value });
  };

  /**
   * On Click Review Product
   */
  submitReviewProduct = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          ...values,
          productId: this.props.product.id,
          rating: this.state.rating,
        };
        this.props.postReviewProduct(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    // If not login
    if (!this.props.authentication.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (this.state.redirect) {
      return <Redirect to="/beranda" />;
    }

    // If Product null
    if (!this.props.product) {
      return null;
    }

    // If Form Success
    if (this.props.reviewProduct.formSuccess) {
      this.props.storeReviewProduct({ formSuccess: false });
      // return <Redirect to={`/produk/${this.props.match.params.productUuid}`} />;
      return <Redirect to="/beranda" />;
    }

    return (
      <div style={wrapperStyle}>
        <div className="font-weight-bold text-center">
          {this.props.product.name}
        </div>
        <div className="text-center" style={{ marginTop: 10 }}>
          Beri Rating
        </div>
        <div className="text-center" style={{ marginTop: 10 }}>
          <Rate onChange={this.onChangeRating} value={this.state.rating} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Form
            onSubmit={this.submitReviewProduct}
            layout="vertical"
            noValidate
          >
            <FormItem label="Judul">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="Isi Ulasan">
              {getFieldDecorator('comment', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED,
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem>
              <Button
                className="btn-block"
                type="primary"
                htmlType="submit"
                loading={this.props.reviewProduct.loading}
                onClick={this.submitReviewProduct}
              >
                Kirim
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

ReviewProductPage.propTypes = {
  product: PropTypes.object,
  authentication: PropTypes.object,
  reviewProduct: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authentication: state.get('authentication'),
  product: state.get('product').product,
  reviewProduct: state.get('reviewProduct'),
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (data) => dispatch(actions.getProduct(data)),
  postReviewProduct: (data) => dispatch(actions.postReviewProduct(data)),
  storeReviewProduct: (data) => dispatch(actions.storeReviewProduct(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

const ReviewProductForm = Form.create()(ReviewProductPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewProductForm);
