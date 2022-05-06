import React from 'react';
import {Row, Col, Form, Radio, message} from 'antd';
import ListBank from '../ListBank';

const RadioGroup = Radio.Group;

class MetodePembayaran extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dataBank: props.dataBank,
            bankSelected: "",
        }
        this.changeRadio = this.changeRadio.bind(this);
    }

    changeRadio = (value) => {
        this.setState({bankSelected: value});
    }

    submitData = (e) => {
        e.preventDefault();
        if(this.state.bankSelected == ""){
            message.error('Metode pembayaran harus dipilih !')
        }else{
            message.success('Metode pembayaran berhasil dipilih !');
        } 
    }

    render(){

        return(
                <div className="metode-pembayaran-container">
                    <Form onSubmit={this.submitData}>
                        <div className="payment__method">
                            {
                               
                                <ListBank onChangeBank={this.changeRadio} dataBank={this.state.dataBank}/>
                            }
                        </div>
                    </Form>
                   
                </div>
        )

    }

}

export default MetodePembayaran;