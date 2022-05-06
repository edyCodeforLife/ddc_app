import React from 'react';
import { Row, Col, Icon, Button } from 'antd';
import CustomSVG from '../../../components/CustomSVG';


const benefitCard = (props) => (
  <React.Fragment>
    <Row type="flex" justify="center" style={{ paddingTop: '20px' }}>
      <div className="title__why-reseller">
        Keuntungan Menjadi Reseller
      </div>
    </Row>
    <Row
      type="flex"
      justify="center"
      align="middle"
      className="benefitCard__class"
    >
      <Col span={6}>
        <CustomSVG
          className="svg__upgrade-reseller one"
          name="ic-profit-tinggi"
        />
      </Col>
      <Col span={18}>
        <div className="title__benefit-list">
          Profit Margin Tinggi dan Menguntungkan
        </div>
        <div className="describe__benefit-list">
          {
            'Anda akan mendapatkan harga reseller yang jauh lebih murah dari harga retail dengan potongan harga hingga 50%'
          }
        </div>
      </Col>
      <Col span={6}>
        <CustomSVG
          className="svg__upgrade-reseller one"
          name="ic-free-ongkir"
        />
      </Col>
      <Col span={18}>
        <div className="title__benefit-list">Gratis Ongkir</div>
        <div className="describe__benefit-list">
          {
            'Dengan syarat dan ketentuan yang berlaku, Anda bisa mendapatkan gratis ongkir atau di subsidi 5% dari total order.'
          }
        </div>
      </Col>
      <Col span={6}>
        <CustomSVG className="svg__upgrade-reseller one" name="ic-komunitas-upgrade" />
      </Col>
      <Col span={18}>
        <div className="title__benefit-list">Komunitas</div>
        <div className="describe__benefit-list">
          {
            'Disini Anda bisa mendapatkan berbagai tips dan trik, baik strategi jualan hingga mengatur keuangan dengan inspiring story dari para reseller yang lainnya.,'
          }
        </div>
      </Col>
      <Col span={6}>
        <CustomSVG
          className="svg__upgrade-reseller one"
          name="ic-point-reward-copy"
        />
      </Col>
      <Col span={18}>
        <div className="title__benefit-list">Poin Reward</div>
        <div className="describe__benefit-list">
          {
            'Poin ini bisa di tukarkan dengan berbagai reward menarik mulai dari produk, paket liburan, hingga umroh.'
          }
        </div>
      </Col>
      <Col span={6}>
        <CustomSVG className="svg__upgrade-reseller one" name="ic-ajak-teman-upgrade" />
      </Col>
      <Col span={18}>
        <div className="title__benefit-list">Poin Ajak Teman</div>
        <div className="describe__benefit-list">
          {
            'Jika Anda mengajak satu teman menjadi reseller Dusdusan.com, Anda akan mendapatkan 200 poin yang bisa ditukarkan dengan reward menarik.'
          }
        </div>
      </Col>
    </Row>
  </React.Fragment>
);
export default benefitCard;
