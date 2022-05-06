import React from 'react';
import { NavLink } from 'react-router-dom';

import constant from './../../utils/configs/constant';
import CustomSVG from '../../components/CustomSVG';

const iconStyle = { marginRight: 15, height: 24, width: 24 };
const FOOTER_URL = constant.FOOTER_HELPER;

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div>
          <div style={{ fontSize: 12 }}>Butuh Bantuan? Kami ada di</div>
          <div
            className="font-weight-bold"
            style={{ fontSize: 18, marginTop: 10 }}
          >
            Senin - Jumat: 08.00 - 17.00 WIB
          </div>
          <div>Hari Besar Nasional Libur</div>
        </div>

        <ul className="footer__ul">
          <li className="footer__list">
            <a href="javascript:void($zopim.livechat.window.toggle())">
              <CustomSVG name={'message-square'} style={iconStyle} />
              <span style={{ color: '#fff' }}>Live Chat Dusdusan.com</span>
            </a>
          </li>
          <li className="footer__list">
            <a href={`tel: ${FOOTER_URL.CALL_CENTER}`}>
              <CustomSVG name={'ic-phone'} style={iconStyle} />
              <span style={{ color: '#fff' }}>021-53661376</span>
            </a>
          </li>
          <li className="footer__list">
            <a href={`mailto: ${FOOTER_URL.EMAIL_SUPPORT}`}>
              <CustomSVG name={'ic-mail'} style={iconStyle} />
              <span style={{ color: '#fff' }}>Support@dusdusan.com</span>
            </a>
          </li>
          <li className="footer__list">
            <a href={`${'https://web.facebook.com/DusdusanID'}`}>
              <CustomSVG name={'ic-users'} style={iconStyle} />
              <span style={{ color: '#fff' }}>Ke : Fanspages Dusdusan.com</span>
            </a>
          </li>
          <NavLink to="/karir">
            <li className="footer__list">
              <CustomSVG name={'ic-career'} style={iconStyle} />
              <span style={{ color: '#fff' }}>Karir</span>
            </li>
          </NavLink>
          <NavLink to="/Faq">
            <li className="footer__list">
              <CustomSVG name={'ic-faq'} style={iconStyle} />
              <span style={{ color: '#fff' }}>Faq</span>
            </li>
          </NavLink>
        </ul>
        <div className="footer__block">
          <span className="font-weight-bold">Ikuti Sosial Media Kami:</span>
          <div style={{ marginTop: 20 }}>
            <a href={`${'https://web.facebook.com/DusdusanID'}`}>
              <CustomSVG name={'facebook'} style={iconStyle} />
            </a>
            <a href={FOOTER_URL.IG}>
              <CustomSVG name={'instagram'} style={iconStyle} />
            </a>
          </div>
        </div>

        <div className="footer__copywrite">{constant.COPYRIGHT}</div>
      </div>
    );
  }
}

export default Footer;
