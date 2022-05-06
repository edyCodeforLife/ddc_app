import React from 'react';
import { Modal, Button } from 'antd';

const ModalBranchPrice = (props) => (
  <Modal visible={props.visible} closable={false} footer={null} width={320}>
    <p className="text-center">
      Untuk harga Tier Terendah hanya didapatkan dengan pembelian Melalui&nbsp;
      <b>Gudang</b>. Selain melalui gudang akan mendapatkan <b>Harga Member</b>
    </p>
    <div>
      <Button
        className="btn-block"
        type="primary"
        onClick={props.onClickCloseModalBranchPrice}
      >
        Saya Mengerti
      </Button>
    </div>
  </Modal>
);

export default ModalBranchPrice;
