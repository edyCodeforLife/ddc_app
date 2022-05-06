import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Row, Col, Rate, Input, Form } from 'antd';
import moment, { now } from 'moment';
import ImageIcon from '../../../../../../assets/images/placeholder/no-image.png';
import CustomProfile from '../../../../../components/CustomSVG/index';
import * as actions from '../../../../../actions/index';
import validationMessages from '../../../../../utils/configs/validationMessages';
const FormItem = Form.Item;
const { TextArea } = Input;

export class formComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
    };
  }
  handleInput = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  render() {
    console.log(this.props.data);
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Col span={24} style={{ padding: '15px 0px' }}>
          <TextArea rows={6} onChange={(e) => this.handleInput(e)} />
          <Button
            style={{ marginTop: '10px' }}
            type="primary"
            className="btn-clock"
            onClick={() =>
              this.props.submitComment(this.state.comment, this.props.data)
            }
          >
            Kirim
          </Button>
          {/* <div onClick={() => this.props.submitComment(this.state.e)}></div> */}
        </Col>
      </React.Fragment>
    );
  }
}
const FormComment = Form.create()(formComment);
export default FormComment;
