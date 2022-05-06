import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import SupportTouch from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import CustomSVG from './../../../components/CustomSVG/index';
import { Row } from 'antd';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export class SliderSwipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  onChangeIndex = (index, type) => {
    this.setState({
      index,
    });
  };

  render() {
    const styles = {
      root: {
        padding: '0 30px',
      },
      slideContainer: {
        padding: '0 10px',
      },
      slide: {
        padding: 15,
        minHeight: 100,
        color: '#fff',
      },
      slides2: {
        padding: 10,
        color:'#282828',
        textAlign: 'center',
      },
      slide1: {
        backgroundColor: '#FEA900',
      },
      slide2: {
        backgroundColor: '#B3DC4A',
      },
      slide3: {
        backgroundColor: '#6AC0FF',
      },
    };
    return (
      <React.Fragment>
        <SupportTouch>
          <AutoPlaySwipeableViews
            style={styles.root}
            slideStyle={styles.slideContainer}
            // onSwitching={this.onChangeIndex}
            // index={this.state.index}
            // enableMouseEvents
          >
            <Row
              style={Object.assign({}, styles.slide)}
              type="flex"
              align="middle"
              justify="center"
            >
              <CustomSVG className="svgStyle one" name="ic-produk-ekslusif" />
              <div style={Object.assign({}, styles.slides2)}>
              Dengan menjadi Reseller, tentunya Anda akan mendapatkan harga
              reseller yang jauh lebih murah dari harga retail dengan potongan
              harga hingga 50%.
            </div>
            </Row>
            <Row
              style={Object.assign({}, styles.slide)}
              type="flex"
              align="middle"
              justify="center"
            >
              <CustomSVG className="svgStyle" name="ic-point-reward-copy" />
              <div style={Object.assign({}, styles.slides2)}>
              Setiap pembelanjaan senilai Rp 10.000, Anda akan mendapatkan 1
              poin (berlaku kelipatan). Poin ini bisa Anda tukarkan dengan
              berbagai reward menarik pastinya.
            </div>
            </Row>
            <Row
              style={Object.assign({}, styles.slide)}
              type="flex"
              align="middle"
              justify="center"
            >
              <CustomSVG className="svgStyle" name="ic-hadiah-langsung" />
              <div style={Object.assign({}, styles.slides2)}>
              Berbagai hadiah seperti produk, voucher, handphone, motor, mobil
              hingga umroh bisa Anda dapatkan langsung tanpa diundi di setiap
              kesempatan.
            </div>
            </Row>
            <Row
              style={Object.assign({}, styles.slide)}
              type="flex"
              align="middle"
              justify="center"
            >
              <CustomSVG className="svgStyle" name="ic-murni-jualbeli" />
              <div style={Object.assign({}, styles.slides2)}>
              Tidak ada target, tidak ada tutup poin, tidak perlu repot rekrut
              orang. Saatnya Anda memiliki dan merintis bisnis yang mudah dan
              menghasilkan.
            </div>
            </Row>
            <Row
              style={Object.assign({}, styles.slide)}
              type="flex"
              align="middle"
              justify="center"
            >
              <CustomSVG className="svgStyle" name="ic-titip-dropship-icon" />
              <div style={Object.assign({}, styles.slides2)}>
              Cara mudah dan murah dengan titip dropship bersama para reseller
              yang tersebar di seluruh Indonesia. Serta nikmati juga fitur
              gratis ongkir dengan syarat dan ketentuan yang berlaku.
            </div>
            </Row>
          </AutoPlaySwipeableViews>
        </SupportTouch>
      </React.Fragment>
    );
  }
}
export default SliderSwipe;
