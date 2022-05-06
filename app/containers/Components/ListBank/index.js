import React from 'react';
import { Row, Col, Radio, Collapse, Button } from 'antd';
const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
function callback(key) {
    console.log(key);
}

class ListBank extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataBank: props.dataBank,
        }
    }
    
    radioChange = (e) => {
        e.preventDefault();
        console.log(e);
        const index = e.target.value;
        this.props.id = index;
        const bankData = Object.assign([], this.state.dataBank);
        const bankSelected = bankData[index];
        this.props.db = bankData;
        this.props.onChangeBank(bankSelected);
        const {active} = this.state;
        this.setState({
            active:!this.state.active
        })
    }

    render(){
        return(
                   <div>
                       {
                       
                            <Collapse accordion defaultActiveKey={['1']}
                             onChange={this.radioChange}>
                            {
                              this.state.dataBank.map((dataBank)=>(
                              <Panel header={dataBank.name} key={dataBank.key}>
                              <p>{dataBank.descb}</p>
                              </Panel>
                              ))
                            }   
                            
                        </Collapse>
                      }
                   </div>
        )
    }
}
export default ListBank;