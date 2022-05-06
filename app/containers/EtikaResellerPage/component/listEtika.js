import React from 'react';
import { Row, Col, Button, Select, Collapse } from 'antd';
const Panel = Collapse.Panel;
const text = 'This is panel header 1';
const etikaReseller = {
  marginTop: '-15px',
};
const ListEtikaReseller = (props) => (
  <div style={etikaReseller}>
    <Col span={24}>
      <div className="collapse__etika-resellers">
        <Collapse accordion>
          <Panel
            header={
              <Row type="flex" align="middle">
                <Col span={22} className="etika__collapse-color">
                  Menciptakan Komunitas Reseller Dusdusan yang positif
                </Col>
              </Row>
            }
            key="1"
            className="etika__reseller-collapse"
          >
            <ul>
              <li>
                Menciptakan suasana postif dan membangun dengan sesama Reseller
                lain
              </li>

              <li>
                Semua reseller diperbolehkan untuk share konten – konten yang
                sekiranya dapat bermanfaat untuk reseller lain, tentunya
                postingan Anda tetap menunggu persetujuan Admin.
              </li>
              <li>
                Menjaga ketertiban dan keharmonisan antara sesama reseller,
                dengan tidak terpancing dan tidak membuat atau memberikan
                komentar yang sifatnya menjatuhkan atau menjelekkan reseller
                lain.
              </li>
              <li>
                Reseller diperbolehkan mengadakan kegiatan yang bersifat
                positif, seperti Gathering atau Kopi Darat dengan sesama
                reseller lain, diluar acara resmi yang diadakan oleh Dusdusan.
              </li>
              <li>
                Reseller diperbolehkan menjawab pertanyaan tentang Dusdusan di
                postingan yang ada di fanpage atau grup Dusdusan. Tentunya
                dengan tidak melanggar peraturan yang sudah ditetapkan Dusdusan.
              </li>
              <li>
                Sampaikan pertanyaan, keluhan yang bersifat pribadi, atau
                laporkan reseller yang melanggar langsung ke tim support: Live
                chat di website kami dusdusan.com (Senin - Sabtu pkl 8.30 -
                24.00 Minggu pkl 8.30 - 17.30 Hari libur nasional tutup) Hotline
                : (021)5366-1376 Email: support@dusdusan.com FB Inbox di Fanpage
                Dusdusan.com (Senin - Jumat pkl 8.30 - 17.30 Sabtu, Minggu dan
                hari libur nasional tutup)
              </li>
              <li>
                Dilarang memberikan komentar yang bersifat SARA, provokasi atau
                berpotensi menimbulkan kerusuhan atau aura negatif di dalam
                group.
              </li>
              <li>
                Dilarang berjualan atau mempromosikan produk lain di dalam group
                atau Fanpage Dusdusan.
              </li>
              <li>
                Dilarang memberikan link Referral atau nomor kontak pribadi Anda
                di dalam group atau fanpage Dusdusan, baik di postingan maupun
                di kolom komentar. Apabila Anda mau membantu kepada pertanyaan
                cara bergabung, silahkan bantu melalui jalur pribadi (langsung
                message/inbox ke yang membutuhkan bantuan).
              </li>
              <li>
                Dilarang membuat komentar baru yang bersifat promosi jualan atau
                mengajak daftar reseller ke Anda di fanpage dan group Dusdusan.
                Anda boleh menjawab pertanyaan customer, namun apabila mau
                dibantu lebih lanjut silahkan melalui jalur pribadi/inbox.
              </li>
              <li>
                Tidak boleh menyerobot komentar dari reseller lain, baik di
                fanpage ataupun group Dusdusan. Apabila ada yang bertanya dan
                sudah ditawarkan bantuan oleh reseller lain.
              </li>
            </ul>
            <span>Apabila melanggar ketentuan diatas, maka: </span>
            <ul>
              <li>
                Anda akan mendapatkan peringatan pertama dan di-ban dari
                Facebook Group ataupun Facebook Fanpage Dusdusan. Untuk membuka
                blokir/ Ban tersebut, silahkan menghubungi team support.
              </li>
              <li>
                Apabila setelah diberi peringatan pertama masih terjadi
                pelanggaran lagi, maka Dusdusan akan memberikan peringatan kedua
                dan kembali memblokir Akun Anda di Fanpage dan Group Dusdusan.
              </li>
              <li>
                Apabila setelah peringatan kedua masih terjadi pelanggaran atau
                tidak bersifat kooperatif, maka Dusdusan akan mencabut status
                Reseller Anda.
              </li>
              <li>
                Bagi Reseller yang sudah dicabut statusnya, maka tidak bisa lagi
                login ke website Dusdusan, diblokir di Fanpage dan Facebook
                Group.{' '}
              </li>
            </ul>
          </Panel>
          <Panel
            header={
              <Row type="flex" align="middle">
                <Col span={22} className="etika__collapse-color">
                  Etika dalam mempromosikan Produk Dusdusan
                </Col>
              </Row>
            }
            key="2"
            className="etika__reseller-collapse"
          >
            <ul>
              <li>
                Reseller dibebaskan untuk mempromosikan produknya melalui media
                apapun, baik online maupun offline.
              </li>

              <li>
                Reseller boleh mendownload konten promosi yang dibutuhkan
                seperti foto, copywriting, atau meng-copy / capture review yang
                ada di web, aplikasi dan sosial media Dusdusan untuk digunakan
                sebagai media promosi jualannya.
              </li>
              <li>
                Dusdusan menyediakan Katalog dan Flyer yang dapat dibeli untuk
                promosi bagi Anda yang terbiasa berjualan offline. Atau Anda
                dapat mendownloadnya langsung di aplikasi Katalog Dusdusan,
                untuk kemudian bisa Anda cetak atau buat kreasi katalog/flyer
                Anda sendiri
              </li>
              <li>
                Sesuai komitmen kami untuk memberikan kebebasan penuh kepada
                para Reseller untuk merintis bisnisnya, maka Reseller Dusdusan
                diperbolehkan untuk menjual produk lain selain Dusdusan, selama
                tidak dilakukan di dalam fanpage/ group Dusdusan, dan untuk
                Reseller Titip Dropship tidak diperkenankan melakukan upsell/
                cross-sell produk selain Dusdusan.
              </li>
              <li>
                Reseller boleh membuat materi promosi sendiri seperti iklan,
                adakan kuis, ataupun diskon. Selama tidak melanggar batas bawah
                harga jual online yang sudah ditetapkan oleh Dusdusan
              </li>
              <li>
                Dilarang spam/komentar yang sifatnya mengajak untuk order produk
                / bantu daftar jadi reseller di media promosi online seperti
                postingan, halaman, dan akun pribadi milik orang lain
              </li>
              <li>
                Dilarang mengambil media promosi seperti foto, copywriting atau
                testimonial milik reseller lain tanpa sepengetahuan atau seijin
                reseller yang bersangkutan.
              </li>
              <li>
                Dilarang mempromosikan jualan Anda di sosial media seperti
                postingan, halaman, dan akun pribadi milik orang lain.
              </li>
            </ul>
            <span>Apabila melanggar ketentuan diatas, maka: </span>
            <ul>
              <li>
                Anda akan mendapatkan peringatan pertama dan di-ban dari
                Facebook Group ataupun Facebook Fanpage Dusdusan. Untuk membuka
                blokir/ Ban tersebut, silahkan menghubungi team support.
              </li>
              <li>
                Apabila setelah diberi peringatan pertama masih terjadi
                pelanggaran lagi, maka Dusdusan akan memberikan peringatan kedua
                dan kembali memblokir Akun Anda di Fanpage dan Group Dusdusan.
              </li>
              <li>
                Apabila setelah peringatan kedua masih terjadi pelanggaran atau
                tidak bersifat kooperatif, maka Dusdusan akan mencabut status
                Reseller Anda.
              </li>
              <li>
                Bagi Reseller yang sudah dicabut statusnya, maka tidak bisa lagi
                login ke website Dusdusan, diblokir di Fanpage dan Facebook
                Group.
              </li>
            </ul>
          </Panel>
          <Panel
            header={
              <Row type="flex" align="middle">
                <Col
                  span={22}
                  className="etika__collapse-color"
                  style={{ padding: '10px 0px' }}
                >
                  Etika dalam berjualan Produk Dusdusan
                </Col>
              </Row>
            }
            key="3"
            className="etika__reseller-collapse"
          >
            <ul>
              <li>
                Reseller diperbolehkan menjual produk Dusdusan melalui media
                apapun baik online seperti di sosial media, market place,
                website, ataupun offline seperti di toko sendiri, secara
                personal, di komunitas, dll.
              </li>
              <li>
                Reseller disarankan untuk menjual produk Dusdusan sesuai dengan
                harga di katalog atau lebih tinggi (harga produk tidak termasuk
                ongkir).
              </li>
              <li>
                Reseller diperbolehkan menjual produk lain selain produk
                Dusdusan selama itu dilakukan di media jualan milik pribadi
                (bukan grup dan fanpage Dusdusan).
              </li>
              <li>
                Reseller boleh menetapkan sendiri target, strategi jualan,
                teknik promosi, selama tidak melanggar ketentuan yang ditetapkan
                Dusdusan.
              </li>
              <li>
                Dilarang menjual produk Dusdusan dibawah harga jual yang telah
                ditentukan.
              </li>
              <li>
                Dilarang berjualan di sosial media seperti postingan, halaman,
                dan akun pribadi milik orang lain (SPAM)
              </li>
            </ul>
            <div>Apabila melanggar ketentuan di atas, maka:</div>
            <ul>
              <li>
                Anda akan mendapatkan peringatan pertama dan di-ban Akun Reseller Anda, serta Facebook Group ataupun Facebook Fanpage Dusdusan. Untuk membuka blokir/ Ban tersebut, silahkan menghubungi team support
              </li>
              <li>
                Apabila setelah diberi peringatan pertama masih terjadi pelanggaran lagi, maka Dusdusan akan memberikan peringatan kedua dan kembali memblokir Akun Reseller Anda, serta akun Fanpage dan Group Dusdusan
              </li>
              <li>
                Apabila setelah peringatan kedua masih terjadi pelanggaran atau tidak bersifat kooperatif, maka Dusdusan akan mencabut status Reseller Anda.
              </li>
            </ul>
          </Panel>
        </Collapse>
      </div>
    </Col>
  </div>
);

export default ListEtikaReseller;
