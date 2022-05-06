/**
 *
 * ArticlesPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Collapse, Col } from 'antd';

import * as actions from '../../actions/index';

const Panel = Collapse.Panel;

export class EtikaResellerPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      kategori: false,
    };
    this.toggleCurtain = this.toggleCurtain.bind(this);
  }

  /**
   * After rendering (DOM available)
   */
  componentDidMount() {
    this.props.setToolbarState({
      showProfile: true,
      showCart: true,
      showFooter: true,
    });
  }

  /**
   * Toggle show curtain
   * @param {string} title
   */
  toggleCurtain(title) {
    const data = {
      show: true,
      title,
    };
    this.props.toggleCurtain(data);
  }
  render() {
    const borderFaq = {
      borderBottom: '1px solid #f0f0f0',
    };
    const container = {
      marginLeft: '-15px',
      marginRight: '-15px',
      background: '#fff',
    };
    return (
      <React.Fragment>
        <Row style={container}>
          <div className="view__faq-reseller">
            <Col span={24}>
              <Row>
                <div style={borderFaq}>
                  <div className="heading__faq-page">F.A.Q Reseller</div>
                </div>
              </Row>
              <div>
                <Collapse accordion className="faq__collapse">
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Cara Bisnisnya ?
                        </Col>
                      </Row>
                    }
                    key="1"
                    className="faq__reseller-collapse"
                  >
                    <ol style={{ padding: '0px 27px' }} type="1">
                      <li>Jadilah Reseller Dusdusan</li>
                      <li>
                        Promosikan dan jual produk Dusdusan dengan harga katalog
                        atau lebih
                      </li>
                      <li>
                        Jika ada yang pesan dan bayar ke Anda, maka lakukan
                        pemesanan di Dusdusan.com dengan akun Reseller pribadi
                        agar mendapatkan harga khusus Reseller, Selisih antara
                        harga reseller dengan harga jual yang cukup besar akan
                        menjadi keuntungan Anda.
                      </li>
                      <li>
                        Untuk awal jangan stock barang dulu ya, karena bisa
                        dropship
                      </li>
                      <li>
                        Lakukan pemesanan sesering mungkin, semakin sering
                        order, maka semakin besar pula keuntungan yang akan
                        diperoleh.
                      </li>
                    </ol>
                    <p style={{ padding: '0px 27px' }}>
                      Join juga di Group Fb Sahabat Dusdusan gratis kok, klik
                      disini{' '}
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        target="_blank"
                        href="https://www.facebook.com/groups/dusdusan/"
                      >
                        https://www.facebook.com/groups/dusdusan/
                      </a>
                    </p>
                  </Panel>
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Cara Daftar Reseller ?
                        </Col>
                      </Row>
                    }
                    key="2"
                    className="faq__reseller-collapse"
                  >
                    <ol type="1" style={{ padding: '0px 27px' }}>
                      <li>
                        Ketik <b>Dusdusan.com</b> di browser Anda
                      </li>
                      <li>
                        Input <b>nama dan email </b>, kemudian klik
                        <b> "Daftar Sekarang"</b>
                      </li>
                      <li>Input data pribadi dengan lengkap dan benar.</li>
                      <li>
                        Input kode voucher jika Anda memiliki kode voucher
                        pendaftaran
                      </li>
                      <li>Klik Simpan dan lanjutkan</li>
                      <li>Input alamat dengan lengkap</li>
                      <li>
                        Klik <b>"Selanjutnya"</b>
                      </li>
                      <li>Silahkan pilih paket pendaftaran</li>
                      <li>
                        {' '}
                        Pilih <b>"Ekspedisi"</b> dan <b>"Metode Pembayaran"</b>
                      </li>
                      <li>
                        Klik <b>"Bayar Sekarang"</b> Akan ada sms dan email
                        notifikasi total yang harus dibayarkan dan no rekening
                        tujuan, mudah bukan ^_^
                      </li>
                    </ol>
                  </Panel>
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Cara Login ?
                        </Col>
                      </Row>
                    }
                    key="3"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Silahkan ikuti langkah - langkah dari aku ya :
                    </p>
                    <ol style={{ padding: '0px 27px' }} type="1">
                      <li>Buka website www.dusdusan.com</li>
                      <li>
                        Klik "masuk disini" masukan email dan password dengan
                        lengkap yang digunakan saat daftar
                      </li>
                      <li>Klik "Masuk".</li>
                      <li>
                        Apabila berhasil maka akan muncul katalog barang atau
                        profil akun resellernya
                      </li>
                    </ol>
                  </Panel>
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Cara Order ?
                        </Col>
                      </Row>
                    }
                    key="4"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Ikuti langkah – langkah berikut ya :
                    </p>
                    <ol style={{ padding: '0px 27px' }} type="1">
                      <li>
                        Login di web <b>Dusdusan.com</b> dengan menggunakan akun
                        Reseller Anda
                      </li>
                      <li>
                        Pilih produk yang ingin Anda pesan atau bisa dengan
                        ketik di kolom <b>"cari produk"</b>
                      </li>
                      <li>
                        klik <b>"Order"</b>
                      </li>
                      <li>
                        Input jumlah yang ingin dipesan, pilih metode yang
                        diinginkan, alamat tujuan, dropship atau bukan, dan
                        pilihan ingin dikirim dari mana
                      </li>
                      <li>
                        {' '}
                        Klik <b>"Order Sekarang"</b>
                      </li>
                      <li>
                        Jika ada yang ingin dipesan kembali silahkan klik{' '}
                        <b> "Belanja Lagi"</b>Atau jika ingin menyelesaikan
                        proses belanja nya, silahkan klik{' '}
                        <b>"Lanjut ke Pembayaran"</b>
                      </li>
                      <li>
                        Pilih <b>Metode Pembayaran</b>
                      </li>
                      <li>
                        Klik <b>"Bayar Sekarang"</b> Akan ada sms dan email
                        notifikasi no ID pesanan, total dan no rekening tujuan,
                        mudah kan ^_^
                      </li>
                    </ol>
                    <p style={{ padding: '0px 18px' }}>
                      Akan ada sms dan email notifikasi no ID pesanan, total dan
                      no rekening tujuan, mudah kan
                    </p>
                  </Panel>
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Keuntungan Reseller ?
                        </Col>
                      </Row>
                    }
                    key="5"
                    className="faq__reseller-collapse"
                  >
                    <ol style={{ padding: '0px 27px' }} type="1">
                      <li>
                        Akan mendapatkan harga khusus Reseller yang pasti lebih
                        murah hingga 50% dari harga normal
                      </li>
                      <li>
                        Memiliki akses khusus untuk belajar dan sharing bareng
                      </li>
                      <li>
                        Bisa dropship langsung ke customer tanpa harus stock
                        barang
                      </li>
                      <li>Free ongkir untuk minimum pembelanjaan tertentu</li>
                      <li>Tanpa target, tanpa tutup poin</li>
                      <li>
                        Poin pembelanjaan yang dapat ditukarkan dengan produk -
                        produk menarik tanpa diundi
                      </li>
                    </ol>
                    <p style={{ padding: '0px 27px' }}>
                      Dan masih banyak lagi, kalau masih ragu liat pengalaman
                      reseller lainya disini ya{' '}
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="https://www.facebook.com/groups/dusdusan/"
                        target="_blank"
                      >
                        https://www.facebook.com/groups/dusdusan/
                      </a>
                    </p>
                  </Panel>
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Apakah produk ada garansinya ?
                        </Col>
                      </Row>
                    }
                    key="6"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Tentu Ada.
                      <br />
                      Garansi pengiriman yang berlaku untuk semua produk
                      Dusdusan, selain itu ada juga Garansi Seumur Hidup untuk
                      produk Medina. Namun ada kategori yang tidak bisa
                      digaransikan, seperti : meleleh kena api langsung / panas
                      ekstrim, noda makanan, pecah disengaja, digigit, tergores
                      dengan sengaja.
                    </p>
                  </Panel>
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Syarat untuk Pengambilan pesanan di gudang atau TDS ?
                        </Col>
                      </Row>
                    }
                    key="7"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Pesanan bisa diambil langsung di Gudang atau TDS sesuai
                      pilihan Anda. Pastikan sudah lakukan pemesanan di website,
                      pembayaran hingga dapat notifikasi SMS / Email kalau
                      pesanan sudah siap diambil di Gudang / TDS yang sama saat
                      pesan ya.
                    </p>
                  </Panel>
                  <Panel
                    header={
                      <Row type="flex" align="middle">
                        <Col span={24} className="etika__collapse-color">
                          Berapa lama proses kirim ?
                        </Col>
                      </Row>
                    }
                    key="8"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Estimasinya 5 – 7 hari kerja dari pembayaran diterima oleh
                      kasir, tapi tidak perlu khawatir jika dalam kondisi normal
                      2 – 3 hari kerja sudah dapat no resi pengirimannya kok.
                    </p>
                  </Panel>
                  <Panel
                    key="9"
                    header="Dusdusan adalah"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Dusdusan adalah platform reseller, dimana setelah jadi
                      reseller bisa ikut gabung ke dalam komunitas reseller,
                      bisa merintis toko sendiri dengan profit margin yang gurih
                      dari jualan produk eksklusif Dusdusan
                    </p>
                  </Panel>
                  <Panel
                    key="10"
                    header="Bedanya Dusdusan dgn bisnis lain?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Yang buat Dusdusan beda itu, profit marginnya yang gurih
                      banget. Terus kita ini bukan MLM, ga ada downline -
                      upline, ga ada tutup poin, ga ada target, ga perlu juga
                      stok. barang, karena bisa dropship, yang ga kalah menarik
                      adalah usaha dan toko pribadi yang akan berkembang
                    </p>
                  </Panel>
                  <Panel
                    key="11"
                    header="Dusdusan MLM bukan?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Dusdusan bukan MLM. <br />
                      Karena ga ada namanya TUPO, ga ada TARGET, ga ada rekrut -
                      rekrut orang, ga ada juga Upline dan Downline.
                    </p>
                  </Panel>
                  <Panel
                    key="12"
                    header="Gimana cara Jual Produknya ?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Banyak caranya kok. <br />
                      Bisa tawarkan langsung barang, kasih lihat katalog atau
                      flyer Dusdusan. <br />
                      Atau gunakan sosial media, WA, Fb, IG via marketplace juga
                      bisa. Barangnya bisa dropship langsung dari Dusdusan.com
                      ke customer lho, keren kan
                      <br />
                      Mau belajar dan tanya dengan reseller lain, gabung aja di
                      group Sahabat Dusdusan gratis kok, klik disini ya
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="https://www.facebook.com/groups/dusdusan/"
                        target="_blank"
                      >
                        https://www.facebook.com/groups/dusdusan/
                      </a>
                    </p>
                  </Panel>
                  <Panel
                    key="13"
                    header="Daftarnya mahal ?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Iya, awalnya para reseller juga bilang gitu. Tapi setelah
                      mereka tahu profit margin produknya langsung happy deh.
                      <br />
                      Dan kalau dihitung - hitung 299 rb itu kurang lebih hanya
                      25 rb per bulan kok. <br />
                      Kalau mau baca pengalaman teman - teman yang lain bisa
                      baca disini ya bit.ly/pecahtelorDDC
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="bit.ly/pecahtelorDDC"
                        target="_blank"
                      >
                        bit.ly/pecahtelorDDC
                      </a>
                    </p>
                  </Panel>
                  <Panel
                    key="14"
                    header="Dapat apa saja jika menjadi reseller ?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Reseller akan mendapatkan keuntungan langsung dari
                      penjualan produk hingga 50%, bisa mendapatkan akses untuk
                      belajar dan sharing serta mengikuti kegiatan yang diadakan
                      oleh Komunitas reseller. <br />
                      Join juga di Group Fb Sahabat Dusdusan gratis kok, klik
                      disini{' '}
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="https://www.facebook.com/groups/dusdusan/"
                        target="_blank"
                      >
                        https://www.facebook.com/groups/dusdusan/
                      </a>
                    </p>
                  </Panel>
                  <Panel
                    key="15"
                    header="Kalau sudah jadi reseller apa yang harus saya lakukan?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Kalau sudah jadi Reseller, bisa langsung jualan atau ikuti
                      langkah - langkah berikut ya:
                      <ol>
                        <li>
                          Promosikan produk Dusdusan yang ingin dijual,baik
                          secara online atau offline
                        </li>
                        <li>
                          Lakukan pemesanan secara dropship di Dusdusan.com jika
                          ada yang pesan dan bayar ke Anda, untuk dikirim
                          langsung ke alamat customer
                        </li>
                        <li>
                          Untuk awal jangan stok barang, karena bisa dropship
                          dulu
                        </li>
                        <li>
                          Lakukan pemesanan sesering mungkin, semakin sering
                          pesan, maka semakin besar pula keuntungan yang akan
                          diperoleh.
                        </li>
                      </ol>
                    </p>
                  </Panel>
                  <Panel
                    key="16"
                    header="Kalau jadi reseller apakah saya akan dibimbing atau ada pelatihan?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Reseller bisa ikut training atau pelatihan yang diadakan
                      Dusdusan, atau kalau mau langsung belajar dan tanya -
                      tanya dengan reseller lain join aja disini
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="https://www.facebook.com/groups/dusdusan/"
                        target="_blank"
                      >
                        https://www.facebook.com/groups/dusdusan/
                      </a>
                    </p>
                  </Panel>
                  <Panel
                    key="17"
                    header="Apa saja yang dijual?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Barang yang dijual sangat variatif, dari produk rumah
                      tangga, keperluan anak, fashion, dan masih banyak lagi,
                      tentunya dengan profit margin yang gurih untuk reseller.{' '}
                      <br />
                      Tunggu apalagi, daftar sekarang di Dusdusan.com
                    </p>
                  </Panel>
                  <Panel
                    key="18"
                    header="Gimana cara lihat harga Reseller nya?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Kalau sudah menjadi Reseller Dusdusan, maka bisa cek harga
                      Resellernya lho, caranya login aja ke akun Reseller Anda.
                      Ikuti langkah - langkah berikut ya :{' '}
                      <ol>
                        <li>Login ke Akun Reseller pribadi di dusdusan.com</li>
                        <li>
                          Ketik nama produk di kolom pencarian“Ketik nama
                          produk” lalu “enter”
                        </li>
                        <li>Klik gambar produk,</li>
                        <li>
                          Akan terlihat dua harga, yaitu: Harga normal adalah
                          harga jual yang disarankan untuk dijual ke customer
                          Anda. Harga Member adalah harga beli sebagai reseller
                          Dusdusan Reseller akan dapat harga paket /harga tier
                          dengan minimum pembelian tertentu
                        </li>
                      </ol>
                    </p>
                  </Panel>
                  <Panel
                    key="19"
                    header="Gimana cara dapat katalognya?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Gampang kok :) Kalau mau GRATIS, bisa download katalog PDF
                      di link berikut{' '}
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="http://bit.ly/KatalogDDCSeptembeR"
                        target="_blank"
                      >
                        http://bit.ly/KatalogDDCSeptembeR
                      </a>
                      <br />
                      Medina
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="http://bit.ly/KatalogMedinaNov"
                        target="_blank"
                      >
                        http://bit.ly/KatalogMedinaNov
                      </a>
                      <br />
                      Bisa juga beli katalognya disini{' '}
                      <a
                        style={{ color: '#8b9dc3' }}
                        className="clickable"
                        href="hhttp://bit.ly/katalogddcSeptember"
                        target="_blank"
                      >
                        http://bit.ly/katalogddcSeptember
                      </a>
                    </p>
                  </Panel>
                  <Panel
                    key="20"
                    header="Berapa diskon jual produk DDC?"
                    className="faq__reseller-collapse"
                  >
                    <p style={{ padding: '0px 18px' }}>
                      Diskon produk Dusdusan sampai dengan 50%, sesuai dengan
                      produk dan jumlah yang dipesan. Semakin banyak produk yang
                      dibeli harga makin murah, keuntungan juga jadi lebih
                      besar.
                      <br /> Pesan sekarang, dan manfaatkan harga tier / harga
                      paket khusus Reseller, Reseller juga akan mendapatkan free
                      ongkir dengan syarat dan ketentuan berlaku ya.
                    </p>
                  </Panel>
                </Collapse>
              </div>
            </Col>
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.get('authentication').isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurtain: (data) => dispatch(actions.toggleCurtain(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtikaResellerPage);
