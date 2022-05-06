import { Modal, Button } from 'antd';
import Constant from '../../utils/configs/constant';

const modalComponent = (props) => {
  switch (props.type) {
    case Constant.MODAL_ERROR:
      const modalError = Modal.error({
        title: props.title,
        content: props.content,
        onOk: props.onClick,
        footer:props.footer,
        
      });
      break;

    case Constant.MODAL_SUCCESS:
      const modalSuccess = Modal.success({
        title: props.title,
        content: props.content,
        onOk: props.onClick,

      });
      
      break;

    case Constant.MODAL_WARNING:
      const modalWarning = Modal.warning({
        title: props.title,
        content: props.content,
      });
      break;
    default:
      const modalInfo = Modal.info({
        title: props.title,
        content: props.content,
      });
  }
};

export default modalComponent;
