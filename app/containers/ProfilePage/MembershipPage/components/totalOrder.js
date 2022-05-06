import React from 'react';
import { Row, Col, Button, Select, Collapse } from 'antd';
import NumberFormat from 'react-number-format';
const Panel = Collapse.Panel;
const text = 'This is panel header 1';

const TotalOrder = (props) => (
  <div className="view__level-member">
    <Col span={24}>
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        className="header__level-order"
      >
        <Col span={12} className="level__member">
          <div className="level__member-order">Total Order</div>
          <div className="level__member-sum-total">
            <span className="font-weight-bold">
              <NumberFormat
                value={props.member.totalOrderPrice}
                displayType={'text'}
                thousandSeparator
                prefix={'Rp. '}
              />
            </span>
          </div>
        </Col>
        <Col span={12} className="level__member-diskon">
          <div className="level__member-order">Extra Diskon</div>
          {props.member.memberLevelName === 'REGULER' ? (
            <div className="level__member-sum-total">0%</div>
          ) : props.member.memberLevelName === 'UPRISING' ? (
            <div className="level__member-sum-total">2.0%</div>
          ) : props.member.memberLevelName === 'TOP' ? (
            <div className="level__member-sum-total">2.0% + 1%</div>
          ) : (
            props.member.memberLevelName === 'PRIORITAS' && (
              <div className="level__member-sum-total">2.0% + 1.0% + 2.0%</div>
            )
          )}
        </Col>
      </Row>
      <div>
        <Collapse accordion>
          <Panel
            header={
              <Row type="flex" align="middle">
                <Col span={12} className="total__order">
                  <div>
                    <Col className="total__order-label">0-50 Juta</Col>
                    <Col className="total__order">Total Order</Col>
                  </div>
                </Col>
                <Col span={12} className="level__name-color">
                  Reguler
                </Col>
              </Row>
            }
            key="1"
            className="right-arrow"
          >
            <p>
              Selamat, Anda telah menjadi reseller Dusdusan!! Regular Member
              adalah tahap awal Anda setelah berhasil menjadi reseller Dusdusan.
              Anda bisa mendapatkan berbagai keuntungan sebagai regular member,
              yaitu: Harga reseller sesuai dengan tier yang berlaku, beli makin
              banyak atau grosir harga makin murah. Reward poin, poin bisa Anda
              dapatkan dari belanja di website. Free Ongkir, untuk pengiriman
              dari Gudang Dusdusan di berbagai daerah (area pengiriman sesuai
              ketentuan masing - masing Gudang) dgn min. belanja 3 jt. Subsidi
              ongkir, untuk pengiriman ke luar Jabodetabek sebesar 5%
              min. belanja 6 jt,Lakukan terus pemesanan di website Dusdusan dan
              tingkatkan akumulasi belanja Anda agar dapat mencapai tag member
              selanjutnya yaitu Uprising Member.
            </p>
          </Panel>
          <Panel
            header={
              <Row type="flex" align="middle">
                <Col span={12} className="total__order">
                  <div>
                    <Col className="total__order-label"> >50 Juta</Col>
                    <Col className="total__order">Total Order</Col>
                  </div>
                </Col>
                <Col span={12} className="level__name-color">
                  Uprising
                </Col>
              </Row>
            }
            key="2"
            className="right-arrow"
          >
            <p>
              Selamat, Anda telah menjadi Uprising Member!! Uprising Member
              adalah tag member yang Anda dapatkan setelah akumulasi belanja per
              tahun Anda telah mencapai 50 jt. Anda bisa mendapatkan berbagai
              keuntungan sebagai uprising member, yaitu: Harga reseller sesuai
              dengan tier yang berlaku, beli makin banyak atau grosir harga
              makin murah. Reward poin, poin bisa Anda dapatkan dari belanja di
              website atau ajak teman. Free Ongkir, Free Ongkir, untuk pengiriman
              dari Gudang Dusdusan di berbagai daerah (area pengiriman sesuai
              ketentuan masing - masing Gudang) dgn min. belanja 3 jt Subsidi
              ongkir, untuk pengiriman ke seluruh Indonesia sebesar 5%
              min. belanja 6 jt. Ektra Diskon, sebesar 2% yang akan otomatis
              memotong harga produk yang Anda pesan. Lakukan terus pemesanan di
              website Dusdusan dan tingkatkan akumulasi belanja Anda agar dapat
              mencapai tag member selanjutnya yaitu Top Member.
            </p>
          </Panel>
          <Panel
            header={
              <Row type="flex" align="middle">
                <Col span={12} className="total__order">
                  <div>
                    <Col className="total__order-label"> >150 Juta</Col>
                    <Col className="total__order">Total Order</Col>
                  </div>
                </Col>
                <Col span={12} className="level__name-color">
                  Top
                </Col>
              </Row>
            }
            key="4"
            className="right-arrow"
          >
            <p>
              Selamat, Anda telah menjadi Top Member!! Top Member adalah tag
              member yang Anda dapatkan setelah akumulasi belanja per tahun Anda
              telah mencapai 150 jt. Anda bisa mendapatkan berbagai keuntungan
              sebagai uprising member, yaitu: Harga reseller di tier terendah
              tanpa min. pembelian.Reward poin, poin bisa Anda dapatkan dari
              belanja di website atau ajak teman.Free Ongkir, untuk pengiriman
              dari Gudang Dusdusan di berbagai daerah (area pengiriman sesuai
              ketentuan masing - masing Gudang) dgn min. belanja 3 jt. Subsidi
              ongkir, untuk pengiriman ke seluruh Indonesia sebesar 5%
              min. belanja 6 jt. Ektra Diskon, sebesar diskon Uprising + ekstra
              1% yang akan otomatis memotong harga produk yang Anda pesan. Dapat
              mengaktifkan fitur Titip Dropship, sehingga Anda bisa melayani
              orderan reseller lain. Dedicated support team Sample eksklusif
              product Lakukan terus pemesanan di website Dusdusan dan tingkatkan
              akumulasi belanja Anda agar dapat mencapai tag member selanjutnya
              yaitu Prioritas Member
            </p>
          </Panel>
          <Panel
            header={
              <Row type="flex" align="middle">
                <Col span={12} className="total__order">
                  <div>
                    <Col className="total__order-label"> >250 Juta</Col>
                    <Col className="total__order">Total Order</Col>
                  </div>
                </Col>
                <Col span={12} className="level__name-color">
                  Prioritas
                </Col>
              </Row>
            }
            key="3"
            className="right-arrow"
          >
            <p>
              Selamat, Anda telah menjadi Prioritas Member!! Prioritas Member
              adalah tag member tertinggi yang Anda dapatkan setelah akumulasi
              belanja per tahun Anda telah mencapai 250 jt. Anda bisa
              mendapatkan berbagai keuntungan sebagai prioritas member, yaitu:
              Harga reseller di tier terendah tanpa min. pembelian. Reward poin,
              poin bisa Anda dapatkan dari belanja di website. Free Ongkir, untuk
              pengiriman dari Gudang Dusdusan di berbagai daerah (area
              pengiriman sesuai ketentuan masing - masing Gudang) dgn min.
              belanja 3 jt dan pengiriman ke seluruh Indonesia dengan
              min.belanja 6 jt. Ektra Diskon, sebesar diskon Top member + ekstra
              2% yang akan otomatis memotong harga produk yang Anda pesan. Dapat
              mengaktifkan fitur Titip Dropship, sehingga Anda bisa melayani
              orderan reseller lain. Dedicated support team Lakukan terus
              pemesanan di website Dusdusan dan tambah akumulasi belanja Anda
              agar tetap sebagai member Prioritas
            </p>
          </Panel>
        </Collapse>
      </div>
    </Col>
  </div>
);

export default TotalOrder;
