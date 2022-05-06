import React from 'react';
import { Row, Col } from 'antd';
import CONSTANT from '../../../app/utils/configs/constant';

import CustomSVG from '../CustomSVG';

const helpButtonStyle = {
  height: 30,
  width: 30,
  marginTop: 5,
  marginRight: 10,
};
const styleMenu = {
  padding:5,
};

const FOOTER_URL = CONSTANT.FOOTER_HELPER;

const FooterHelper = (props) => (
  <div className="navigationItems__needHelp small footer-adjustment">
    <div className="font-weight-bold">Butuh Bantuan?</div>
    <div style={{ marginTop: 10 }}>
      Kami ada di Senin-Jumat, 08:00-17:00 WIB atau Anda bisa menekan tombol
      dibawah ini:
    </div>
    <Row style={{marginTop:10}}>
      <Col span={24} style={styleMenu}>
        <a href={`tel:  ${FOOTER_URL.CALL_CENTER}`}>
          <CustomSVG name={'button-call'} style={helpButtonStyle} />
          <span className="footer_helper-class">Hubungi Kami</span>
        </a>
      </Col>
      <Col span={24} style={styleMenu}>
        <a href="javascript:void($zopim.livechat.window.toggle())">
          <CustomSVG name={'button-chat'} style={helpButtonStyle} />
          <span className="footer_helper-class">Live Chat</span>
        </a>
      </Col>
      {/* <Col span={24} style={styleMenu}>
        <a
          href={`https://api.whatsapp.com/send?phone=${FOOTER_URL.WA_BUSINESS}`}
        >
          <CustomSVG name={'button-whatsapp'} style={helpButtonStyle} />
          <span className="footer_helper-class">Whatsapp</span>
        </a>
      </Col> */}
      <Col span={24} style={styleMenu}>
        <a href={`mailto: ${FOOTER_URL.EMAIL_SUPPORT}`}>
          <CustomSVG name={'button-email'} style={helpButtonStyle} />
          <span className="footer_helper-class">Email</span>
        </a>
      </Col>
    </Row>
  </div>
);

export default FooterHelper;
