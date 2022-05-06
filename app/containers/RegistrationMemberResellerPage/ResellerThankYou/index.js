import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, Icon, Row, Col } from 'antd';
import CustomSVG from './../../../components/CustomSVG/index';

class ResellerThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    // console.log(this.props);
    return (
      <div
        className="curtain text-center"
        style={{ backgroundColor: '#fafafa' }}
      >
        <CustomSVG name="ic-thumbsup" style={{ marginTop: '30%' }} />
        <div className="font-weight-bold mt-25" style={{ fontSize: 20 }}>
          {this.props.title}
        </div>
        <div className="mt-20">{this.props.content}</div>
        <NavLink to={this.props.redirectTo}>
          <Button className="mt-20" type="primary">
            {this.props.buttonText}
          </Button>
        </NavLink>
      </div>
    );
  }
}

ResellerThankYou.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResellerThankYou);
