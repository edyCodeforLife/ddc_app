import React from 'react';
import {Modal} from 'antd';

export default (props) =>{
    return(
        <Modal.confirm
        className = {props.config.className}
        title = {props.config.title}
        visible ={false}
        keyboard = {props.config.keyboard}
        centered = {props.config.centered}
        content = {props.config.text}
        >
        <p className="text-center modal-adjustment"></p>
        </Modal.confirm>
    );
};