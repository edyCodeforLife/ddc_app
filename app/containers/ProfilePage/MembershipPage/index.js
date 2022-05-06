import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions/index';
import LevelMember from './components/levelMember';
import HistoryTransaksiMember from './components/totalOrder';
import { Redirect } from 'react-router-dom';

class memberShipPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.setToolbarState({
      hideBackButton: true,
      showCart: true,
      showProfile: true,
    });
    const token = localStorage.getItem('token');
    if (token) {
      this.props.getProfileDetail(token);
    }
  }
  render() {
    return this.props.isAuthenticated &&
      this.props.member.memberTypeId !== 1 ? (
        <div>
          <div style={{ marginBottom: '10px' }}>
            {this.props.membership && (
            <LevelMember member={this.props.membership} />
          )}
          </div>
          <div>
            <HistoryTransaksiMember member={this.props.member} />
          </div>
        </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  member: state.get('authentication').member,
  membership: state.get('updateProfil').formData,
  isAuthenticated: state.get('authentication').isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  setToolbarState: (data) => dispatch(actions.setToolbarState(data)),
  getProfileDetail: (data) => dispatch(actions.getProfileDetail(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memberShipPage);
