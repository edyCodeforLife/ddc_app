import { Modal, Button } from 'antd';
import Constant from '../../utils/configs/constant';

const modalComponent = (props) => {
  <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
};

export default modalComponent;
