import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input,Radio, Button,Row,Col,Select, Tabs, Collapse } from 'antd';
// import RegionService from '../../Parameters/RegionService';
import validationMessages from '../../../utils/configs/validationMessages';
import PilihMetodePengiriman from '../../Components/PilihMetodePembayaran';
import * as actions from '../../../actions/index';
import Constant from '../../../utils/configs/constant';
const {TextArea} = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.group;
const Panel = Collapse.Panel;
function callback(key) {
  console.log(key);
}

class MetodePengiriman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      value:1,
      active:false,
      pilihBank:'',
      bankTransfer:Constant.PAYMENT_METHOD_TRANSFER_BANK.BCA,
      Defaultshipping:Constant.SHIPPING_METHOD.TIKI,
      data:[],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.storeRegistrationStep4(values);
      }
    });
  };

  nextRadio = (e) =>{
    this.setState({Defaultshipping:e.target.value});
  }
  changeBank =(e)=>
  {
    console.log(e);
    // this.setState({bankTransfer:e.target.value});

  }
  selectBank =(description)=>
  {
    console.log(description);
    this.setState({bankTransfer:description});
  }
  handleChange =(value) =>{
      this.setState({
          value:value
      });
  }
  componentDidMount(){
  this.props.setToolbarState({ title: 'Metode Pengiriman' });
  this.props.getPaymentMethod();
  this.props.getShippingMethod();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="registrasi">
      <h5>Metode Pengiriman</h5>
      <Form layout="vertical" noValidate>              
                            <Row>
                              <Col xs={24}>
                              <FormItem>
            
                                   {getFieldDecorator('metodePengiriman', {
                                        rules:  [
                                                    {
                                                        required: true, message: 'Metode Pengiriman harus dipilih!',
                                                    },
                                                ]
                                        }   )(
                                
                                <Radio.Group className="radio_button--style-shipping"onChange={this.nextRadio}>
                                {
                                  this.props.shippings !== null ?
                                  this.props.shippings.map((data)=>(
                                <Col xs={12}>
                                <div className="button__shipping">
                                    <Radio.Button value={data.id} className="button__shipping-btn">{data.name}</Radio.Button>
                                </div>
                                </Col>
                                  )):null
                                }
                                </Radio.Group> 
                                
                                        )}
                                
                            </FormItem>
                            </Col>
                                </Row>                   
      <FormItem>
      <Col xs={24}>
      <div className="description__methode-payment">
      <h5>Metode Pembayaran</h5>
      <div>
           <Collapse accordion defaultActiveKey={['1']}
              onChange={this.radioChange}>
             {
               this.props.payments ?(
               this.props.payments.map((payment)=>(
               <Panel header={payment.paymentCategoryName} key={payment.id} className="custom__radio-button">
               {/* {
                 payment.id === 1 ?
                 <h5 className="title__bank">Bank yang Anda gunakan</h5>:
                 payment.id === 2 ?
                 <p>{payment.name}</p>:
                 payment.id === 3 ?
                 <p>{payment.name}</p>:
                 payment.id === 4 ?
                 <p>{payment.name}</p>:null
               } */}
               <Col xs={24}> 
                   <div className="payment__method-button">
                   <Radio.Group defaultValue={['1']} className="radio_button--pilihBank" onChange={this.changeBank}
                   >
                   {
                     payment.banks !==undefined ? payment.banks.map((bank)=>(
                      <Col xs={8}>
                      <Radio.Button key={bank.id}  value={bank.id} className="radio__custom" onClick={()=>this.selectBank(bank.Description)}>{bank.name}</Radio.Button>
                      </Col>
                     
                       )):null
                   }
                    </Radio.Group>
                    </div>
                    <div>
                    {
                      this.state.bankTransfer  
                    }

                    </div>
               </Col>
               </Panel>
               ))
              ):(
                <p>Empty ..</p>
              ) 
             } 
           </Collapse>
      </div>
      </div>
     </Col>
      </FormItem>
      <FormItem>
          <Button
            className="btn-block"
            type="primary"
            size={'large'}
            htmlType="submit"
          >
            Selanjutnya
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}
// MetodePengiriman.propTypes = {
//   payment: PropTypes.arrayOf(PropTypes.object),
// };

// MetodePengiriman.defaultProps = {
//   payment: [],
// };
const metodePengiriman = Form.create()(MetodePengiriman);
const mapStateToProps = (state) => ({
  payments: state.get('shippingMethod').payment,
  shippings :state.get('shippingMethod').shipping,
});

const mapDispatchToProps = (dispatch) => ({
  getPaymentMethod: () => dispatch(actions.getPaymentMethod()),
  getShippingMethod: () => dispatch(actions.getShippingMethod()),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(metodePengiriman);
