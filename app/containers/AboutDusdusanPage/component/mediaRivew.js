import React from 'react';
import Slider from 'react-slick';
import antv from '../../../../assets/images/media/antv.jpg';
import indosiar from '../../../../assets/images/media/indosiar.jpg';
import antara from '../../../../assets/images/media/antara.jpg';
import beritasatu from '../../../../assets/images/media/beritasatu.jpg';
import detik from '../../../../assets/images/media/detik.jpg';
import ds from '../../../../assets/images/media/ds.jpg';
import sctv from '../../../../assets/images/media/sctv.jpg';
import sindonews from '../../../../assets/images/media/sindonews.jpg';
import kompas from '../../../../assets/images/media/kompas.com.jpg';
import fimela from '../../../../assets/images/media/fimela.com.jpg';
import techinasia from '../../../../assets/images/media/techinasia.jpg';
import swa from '../../../../assets/images/media/swa.jpg';
import tempo from '../../../../assets/images/media/tempo.jpg';
import yahoo from '../../../../assets/images/media/yahoo.jpg';

class MediaReview extends React.Component {
  render() {
    const diliputby = {
      fontSize: '20px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#282828',
      // paddingTop: '80px',
    };
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1.5,
      slidesToScroll: 1,
    };
    return (
      <div>
        <div style={diliputby}> Diliput Oleh</div>
        <Slider {...settings}>
          <div>
            <img src={indosiar} alt="indosiar" className="MediaImageAdjustment"/>
          </div>
          <div>
            <img src={antv} alt="antv" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={antara} alt="antara" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={beritasatu} alt="berita satu" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={detik} alt="detik" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={ds} alt="ds" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={sctv} alt="sctv" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={sindonews} alt="ds" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={kompas} alt="kompas" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={fimela} alt="fimela" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={techinasia} alt="techinasia" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={swa} alt="swa" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={tempo} alt="tempo" className="MediaImageAdjustment" />
          </div>
          <div>
            <img src={yahoo} alt="yahoo" className="MediaImageAdjustment" />
          </div>
        </Slider>
      </div>
    );
  }
}
export default MediaReview;
