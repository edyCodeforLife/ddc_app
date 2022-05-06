/**
 *
 * RegistrationMemberResellerPage
 *
 */

import React from 'react';
import { Form, Steps } from 'antd';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import * as actions from '../../actions/index';
import RegistrationSimpleForm from './RegistrationSimpleForm';
import RegistrationStep1 from './RegistrationStep1';
import RegistrationStep2 from './RegistrationStep2';
import RegistrationStep3 from './RegistrationStep3';
import constant from '../../utils/configs/constant';

const Step = Steps.Step;

export class RegistrationMemberResellerPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.setToolbarState({ title: 'Daftar Reseller' });
  }

  onClickStep = (step) => {
    if (step < this.props.activeFormStep) {
      this.props.storeRegistrationReseller({ activeFormStep: step });
    }
  };

  render() {
    // const queryParam = queryString.parse(this.props.location.search);
    // let activeFormStep = 0;
    // if (queryParam.step) {
    //   activeFormStep = parseInt(queryParam.step, 0);
    // }

    // if (activeFormStep !== this.props.activeFormStep) {
    //   activeFormStep = this.props.activeFormStep;
    //   return (
    //     <Redirect to={`registrasi-member-reseller?step=${activeFormStep}`} />
    //   );
    // }

    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    // if (this.props.formSuccess) {
    //   // console.log('sukses');
    //   return <Redirect to="/metode-pengiriman" />;
    // }

    // If login
    if (this.props.authentication.isAuthenticated) {
      if (this.props.authentication.member.memberTypeId !== 1) {
        return <Redirect to="/beranda" />;
      }
    }

    return (
      <div>
        <Helmet />
        {!this.props.showFormStep && <RegistrationSimpleForm />}

        {this.props.showFormStep && (
          <div>
            <div className="my-2 h5 text-center font-weight-bold">
              {this.props.activeFormStep === 0 ||
              this.props.activeFormStep === 1 ? (
                <p>
                  Selamat, Anda sudah satu langkah lebih dekat jadi Reseller
                  Dusdusan.com
                </p>
              ) : (
                <p>
                  Satu langkah lagi.. Pilih salah satu paket pendaftaran
                  Dusdusan.com
                </p>
              )}
            </div>

            <Steps
              className="my-4"
              size="small"
              current={this.props.activeFormStep}
            >
              <Step title="Data Diri" onClick={() => this.onClickStep(0)} />
              <Step title="Data Alamat" onClick={() => this.onClickStep(1)} />
              <Step title="Pilih Paket" onClick={() => this.onClickStep(2)} />
            </Steps>
            {this.props.activeFormStep === 0 && <RegistrationStep1 />}
            {this.props.activeFormStep === 1 && <RegistrationStep2 />}
            {this.props.activeFormStep === 2 && <RegistrationStep3 />}
          </div>
        )}
        <div className="text-center copywrite">{constant.COPYRIGHT}</div>
      </div>
    );
  }
}
const registrationMemberResellerForm = Form.create()(
  RegistrationMemberResellerPage
);

const mapStateToProps = (state) => ({
  formData: state.get('registrationMemberReseller').formData,
  showFormStep: state.get('registrationMemberReseller').showFormStep,
  formSuccess: state.get('registrationMemberReseller').formSuccess,
  activeFormStep: state.get('registrationMemberReseller').activeFormStep,
  // activeFormStep: 2, // Debug
  isAuthenticated: state.get('authentication').isAuthenticated,
  authentication: state.get('authentication'),
});

const mapDispatchToProps = (dispatch) => ({
  storeRegistrationReseller: (data) =>
    dispatch(actions.storeRegistrationReseller(data)),
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(registrationMemberResellerForm);
