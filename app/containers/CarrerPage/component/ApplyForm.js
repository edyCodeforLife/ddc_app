/**
 *
 * ApplyForm
 *
 */

import React from 'react';
import { Form, Input, Button, Select, Icon, Upload } from 'antd';
import { connect } from 'react-redux';
import validationMessages from '../../../utils/configs/validationMessages';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
export class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      hasToken: false,
      referralCode: null,
      position: [
        {
          id: '1',
          position: 'Web Developer',
        },
        {
          id: '2',
          position: 'Project Manager',
        },
        {
          id: '3',
          position: 'Scrum Master',
        },
      ],
    };
  }

  render() {
    const formApply = {
      padding: '0px 15px',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={formApply}>
        <Form onSubmit={this.handleSubmit} layout="vertical" noValidate>
          <div style={{ paddingTop: '15px' }}>
            <FormItem label="Nama Lengkap">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.NAME_REQUIRED,
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="No. Handphone">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.PHONE_NUMBER_REQUIRED,
                  },
                ],
              })(<Input type="tel" />)}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.EMAIL_REQUIRED,
                  },
                ],
              })(<Input type="email" />)}
            </FormItem>
            <FormItem label="Posisi yang dilamar">
              {getFieldDecorator('position', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.REQUIRED_POSITION_TO_APPLY,
                  },
                ],
              })(
                <Select style={{ width: '100%' }}>
                  {this.state.position !== null
                    ? this.state.position.map((data) => (
                      <Option key={data.id} value={data.id}>
                        {data.position}
                      </Option>
                      ))
                    : null}
                </Select>
              )}
            </FormItem>
            <FormItem label="Tulis Pesan">
              {getFieldDecorator('pesan', {
                rules: [
                  {
                    required: true,
                    message: validationMessages.PESAN_REQUIRED,
                  },
                ],
              })(<TextArea rows={5} />)}
            </FormItem>
            <Form.Item label="Resume">
              <Upload action="//jsonplaceholder.typicode.com/posts/" directory>
                <Button style={{ border: '1px solid #16b8b2' }}>
                  <span className="uploaded--resume">
                    <icon type="upload" /> Upload Resume
                  </span>
                </Button>
              </Upload>
            </Form.Item>
            <FormItem>
              <Button className="btn-block" type="primary" htmlType="submit">
                Kirim Lamaran Sekarang
              </Button>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}

const applyForm = Form.create()(ApplyForm);
export default applyForm;
