import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import SupportTouch from 'react-swipeable-views';
import CustomSVG from './../../../components/CustomSVG/index';

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
        padding: '0 0px',
        transform: 'translateX(0px)',
        transition:
          '-webkit-transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
      },
      roots: {
        padding: '0 0px',
      },
      slideContainer: {
        padding: '0 0px',
        textAlign: 'left',
        width: '100%',
      },
      slide: {
        padding: 15,
        minHeight: 100,
        color: '#000',
      },
      slides: {
        padding: '0px',
        minHeight: 100,
        color: '#000',
        textAlign: 'center',
        padding: '15px 15px',
        position: 'relative',
      },
      svgStyle: {
        // textAlign: 'center',
        // marginLeft: '40%',
      },
    };
    return (
      <React.Fragment>
        <SupportTouch>
          <SwipeableViews
            style={styles.root}
            slideStyle={styles.slideContainer}
            onSwitching={this.onChangeIndex}
            index={this.state.index}
          >
            <div
              className="swiped__parallax"
              style={{
                transform: 'translateX(-205.5px)',
                transition:
                  '-webkit-transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
              }}
            >
              <CustomSVG className="svgStyle" name="ic-produk-ekslusif"/>
              <CustomSVG className="svgStyle" name="ic-produk-ekslusif"/>
              <CustomSVG className="svgStyle" name="ic-produk-ekslusif"/>
            </div>
          </SwipeableViews>
        </SupportTouch>
        <SupportTouch>
          <SwipeableViews
            style={styles.roots}
            // slideStyle={styles.slideContainer}
            onSwitching={this.onChangeIndex}
            index={this.state.index}
          >
            <div style={Object.assign({}, styles.slides, styles.slide1)}>
              Dengan menjadi Reseller, tentunya Anda akan mendapatkan harga
              reseller yang jauh lebih murah dari harga retail dengan potongan
              harga hingga 50%.
            </div>
            <div style={Object.assign({}, styles.slides)}>
              Setiap pembelanjaan senilai Rp 10.000, Anda akan mendapatkan 1
              poin (berlaku kelipatan). Poin ini bisa Anda tukarkan dengan
              berbagai reward menarik pastinya.
            </div>
            <div style={Object.assign({}, styles.slides)}>
              Berbagai hadiah seperti produk, voucher, handphone, motor, mobil
              hingga umroh bisa Anda dapatkan langsung tanpa diundi di setiap
              kesempatan.
            </div>
          </SwipeableViews>
        </SupportTouch>
      </React.Fragment>
    );
  }
}
export default SliderSwipe;
