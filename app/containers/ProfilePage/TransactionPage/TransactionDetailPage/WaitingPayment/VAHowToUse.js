import React from 'react';
import VABCA from './VABCA';
import VABNI from './VABNI';
import VAMandiri from './VAMandiri';
import VAPermata from './VAPermata';

export default (props) => {
  const config = {
    Mandiri: {
      header: 'ATM Mandiri / Bersama',
      first: 'Di menu utama, Pilih <strong>Transaksi Lainnya</strong>',
      second: 'Pilih <strong>Transfer</strong>',
      third: 'Pilih <strong>Antar Bank Online</strong>',
      fourth: `Masukkan nomor <strong>013 ${
        props.transaction.bankAccountNumber
      }</strong> (kode 013 dan 16 angka virtual account)`,
      fifth:
        'Masukkan jumlah harga yang akan Anda bayar secara lengkap (tanpa pembulatan). <strong>Jumlah nominal yang tidak sesuai</strong> dengan tagihan akan menyebabkan <strong>transaksi gagal.</strong>',
      sixth: 'Kosongkan nomor referensi dan tekan <strong>Benar</strong>',
      seventh:
        'Di halaman konfirmasi transfer akan muncul jumlah yang dibayarkan, no.rekening tujuan. Jika informasinya telah cocok tekan <strong>Benar</strong>',
    },
    bankBCA: {
      header: 'ATM BCA / Prima',
      first: 'Di menu utama, Pilih <strong>Transaksi Lainnya</strong>',
      second: 'Pilih <strong>Transfer</strong>',
      third: 'Pilih Ke <strong>Rek Bank Lain</strong>',
      fourth:
        'Masukkan <strong>013 (Kode Bank Permata)</strong> lalu tekan Benar ',
      fifth:
        'Masukkan <strong>jumlah harga</strong> yang akan Anda bayar secara lengkap (tanpa pembulatan), lalu tekan <strong>Benar</strong>. <br><strong>Penting</strong>: Jumlah nominal yang tidak sesuai dengan tagihan akan menyebabkan transaksi gagal.',
      sixth: `Masukkan <strong>${
        props.transaction.bankAccountNumber
      } (16 digit no. virtual account pembayaran)</strong> lalu tekan <strong>Benar</strong>`,
      seventh:
        'Di halaman konfirmasi transfer akan muncul jumlah yang dibayarkan, no.rekening tujuan. Jika informasinya telah cocok tekan <strong>Benar</strong>',
    },
    permata: {
      header: 'ATM Permata / Alto',
      first: 'Di menu utama, Pilih <strong>Transaksi Lainnya</strong>',
      second: 'Pilih <strong>Transfer</strong>',
      third: 'Pilih <strong>Antar Bank Online</strong>',
      fourth: `Masukkan nomor <strong>013 ${
        props.transaction.bankAccountNumber
      }</strong>(kode 013 dan 16 angka Virtual Account)`,
      fifth:
        'Masukkan <strong>jumlah harga</strong> yang akan Anda bayar secara lengkap (tanpa pembulatan). Jumlah nominal yang tidak sesuai dengan tagihan akan menyebabkan <strong>transaksi gagal</strong>',
      sixth: 'Kosongkan nomor referensi dan tekan <strong>Benar</strong>',
      seventh:
        'Di halaman konfirmasi transfer akan muncul jumlah yang dibayarkan, <strong>no.rekening tujuan</strong>. Jika informasinya telah cocok tekan <strong>Benar</strong>',
    },
    atmBCA: {
      header: 'ATM BCA',
      first: 'Pada menu utama, pilih <strong>Transaksi</strong> Lainnya',
      second: 'Pilih <strong>Transfer</strong>',
      third: 'Pilih ke Rek <strong>BCA Virtual Account</strong>',
      fourth: `Masukkan nomor <strong>${
        props.transaction.bankAccountNumber
      }</strong> lalu tekan <strong>Benar</strong>`,
      fifth:
        'Pada halaman konfirmasi transfer akan muncul detail pembayaran Anda. Jika informasi telah sesuai tekan <strong>Ya</strong>',
    },
    mBCA: {
      header: 'm-BCA',
      first: 'Pilih <strong>m-Transfer</strong>',
      second: 'Pilih <strong>Transfer<strong>',
      third: 'Pilih <strong>BCA Virtual Account</strong>',
      fourth:
        'Pilih <strong>nomor rekening</strong> yang akan digunakan untuk pembayaran',
      fifth: `Masukkan nomor BCA Virtual Account <strong>${
        props.transaction.bankAccountNumber
      }</strong>, lalu pilih <strong>OK</strong>`,
      sixth:
        'Nomor <strong>BCA Virtual Account</strong> dan nomor Rekening Anda akan terlihat di halaman konfirmasi rekening',
      seventh: 'Pilih <strong>OK</strong> pada halaman konfirmasi pembayaran',
      eighth:
        'Masukkan <strong>PIN BCA</strong> untuk mengotorisasi pembayaran',
      ninth: 'Transaksi Anda selesai',
    },
    klikBCA: {
      header: 'klik BCA',
      first: 'Pilih menu <strong>Transfer Dana</strong>',
      second: 'Masukkan nomor <strong>BCA Virtual Account</strong>',
      third: `Masukkan nomor BCA Virtual Account <strong>${
        props.transaction.bankAccountNumber
      }</strong>`,
      fourth:
        'Jumlah yang akan ditransfer, nomor rekening dan nama merchant akan muncul di halaman konfirmasi pembayaran, jika informasi <strong>benar</strong> klik <strong>Lanjutkan</strong>',
      fifth:
        'Masukkan respon <strong>KEYBCA APPLI 1</strong> yang muncul pada <strong>Token BCA</strong> Anda, lalu klik tombol <strong>Kirim</strong>',
      sixth: 'Transaksi Anda selesai',
    },
    atmMandiri: {
      header: 'ATM Mandiri',
      first: 'Masukkan <strong>PIN</strong> Anda',
      second:
        'Pada menu utama pilih menu <strong>Pembayaran</strong> kemudian pilih menu <strong>Multi Payment</strong>',
      third: 'Masukan Kode Perusahaan <strong>70012</strong>',
      fourth: `Masukan Kode Pembayaran <strong>${
        props.transaction.bankAccountNumber
      }</strong>`,
      fifth: 'Konfirmasi pembayaran Anda',
    },
    inetBankMandiri: {
      header: 'Internet Banking Mandiri',
      first: 'Login ke <strong>Mandiri Internet Banking</strong>',
      second:
        'Di Menu Utama silakan pilih <strong>Bayar</strong> kemudian pilih <strong>Multi Payment</strong>',
      third:
        'Pilih akun anda di Dari Rekening, kemudian di <strong>Penyedia Jasa</strong> pilih <strong>midtrans</strong>',
      fourth: `Masukkan Kode Pembayaran <strong>${
        props.transaction.bankAccountNumber
      }</strong> dan klik <strong>Lanjutkan</strong>`,
      fifth:
        '<strong>Konfirmasi pembayaran</strong> anda menggunakan Mandiri Token',
    },
    atmBNI: {
      header: 'ATM BNI',
      first: 'Pada menu utama, pilih <strong>Menu Lainnya</strong>',
      second: 'Pilih <strong>Transfer</strong>',
      third: 'Pilih <strong>Rekening Tabungan</strong>',
      fourth: 'Pilih Ke <strong>Rekening BNI</strong>',
      fifth: `Masukkan Nomor Rekening Pembayaran Anda <strong>${
        props.transaction.bankAccountNumber
      }</strong> lalu tekan Benar`,
      sixth:
        'Masukkan <strong>jumlah tagihan</strong> yang akan Anda bayar secara lengkap. Pembayaran dengan jumlah tidak sesuai akan otomatis ditolak',
      seventh:
        'Pada halaman konfirmasi transfer akan muncul jumlah yang dibayarkan, nomor rekening dan nama Merchant. Jika informasi telah sesuai tekan <strong>Ya</strong>',
    },
  };

  return (
    <div className="font-size-small">
      {props.transaction.paymentMethodId === 2 &&
        props.transaction.bankName === 'PERMATA' && (
          <VAPermata config={config} />
        )}
      {props.transaction.paymentMethodId === 2 &&
        props.transaction.bankName === 'BCA' && <VABCA config={config} />}
      {props.transaction.paymentMethodId === 2 &&
        props.transaction.bankName === 'BNI' && <VABNI config={config} />}
      {props.transaction.paymentMethodId === 2 &&
        props.transaction.bankName === 'MANDIRI' && (
          <VAMandiri config={config} />
        )}
    </div>
  );
};
