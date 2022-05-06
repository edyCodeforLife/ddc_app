import React from 'react';
import { Row } from 'antd';
import Countdown from 'react-countdown-now';
import moment from 'moment';

// Renderer callback with condition
const renderer = ({ total, days, hours, minutes, seconds, completed }) => {
  // const totalHours = days * 24 + hours;
  return days > 0 ? (
    <span>{days} hari lagi</span>
  ) : (
    <span>
      <div className="ddc_coundown__block">{hours}</div>
      <span style={{ margin: '0px 6.5px' }}>:</span>
      <div className="ddc_coundown__block">{minutes}</div>
      <span style={{ margin: '0px 6.5px' }}>:</span>
      <div className="ddc_coundown__block">{seconds}</div>
    </span>
  );
};

const PromoCountdown = (props) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="font-weight-bold"
    style={{
      backgroundColor: '#f5f5f5',
      fontSize: 12,
      height: 40,
    }}
  >
    <span style={{ marginRight: 10 }}>Sisa waktu promo </span>
    <Countdown date={moment(props.endDate)} renderer={renderer} />
  </Row>
);

export default PromoCountdown;
