import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

export class ThankYou extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let curtain = null;
    if (
      this.props.title === 'Registration Member Non Reseller Success' ||
      this.props.title === 'Registration Member Reseller Success'
    ) {
      curtain = {
        heading: 'Terima Kasih Telah Mendaftar',
        bodyText: 'Rincian login Anda telah kami kirimkan melalui email & SMS. Cek email atau handphone Anda sekarang.',
        buttonText: 'Login',
        buttonHref: '/login',
      };
    } else if (this.props.title === 'Reset Password Success') {
      curtain = {
        heading: 'Reset Kata Sandi Berhasil',
        bodyText: 'Silakan login dengan akun anda di halaman login.',
        buttonText: 'Pindah ke Halaman Login',
        buttonHref: '/login',
      };
    }

    return (
      <div className="text-center">
        <h3 style={{ marginTop: '40%' }}>{curtain.heading}</h3>
        <div style={{ marginTop: '10%' }}>{curtain.bodyText}</div>
        <NavLink to={curtain.buttonHref}>
          <Button
            style={{ marginTop: '5%' }}
            type="primary"
            onClick={this.props.toggleCurtainClicked}
          >
            {curtain.buttonText}
          </Button>
        </NavLink>
      </div>
    );
  }
}

export default ThankYou;
