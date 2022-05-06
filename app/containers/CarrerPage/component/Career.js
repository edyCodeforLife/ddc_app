import React from 'react';
import { Row, Col, Icon } from 'antd';
import CustomSVG from './../../../components/CustomSVG/index';
import CareerCard from './CareerCard';
import ApplyForm from './ApplyForm';

export class Career extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showJobVacancy: false,
      showDetailJobs: false,
    };
  }
  showJobVacancy = () => {
    this.setState({ showJobVacancy: !this.state.showJobVacancy });
  };
  handleApplyForm = (e) => {
    this.setState({
      id: e.target.value,
    });
  };
  render() {
    const upDown = {
      backgroundColor: 'rgb(255, 255, 255)',
      boxShadow: '0 2px 5px 0 rgba(40, 40, 40, 0.2)',
      color: '#8c8c8c',
      width: 40,
      height: 40,
      marginTop: '-33px',
      borderRadius: '50%',
    };
    const FormApply = {
      marginLeft: '-15px',
      marginRight: '-15px',
      background: '#fff',
      marginTop: '15px',
    };
    return (
      <React.Fragment>
        <Row style={{ padding: '0px 15px', background: '#fafafa' }}>
          <Row
            type="flex"
            justify="center"
            style={{ marginTop: 15, marginBottom: 15, fontSize: 18 }}
          >
            <div style={upDown}>
              <Icon
                className="clickable"
                type={this.state.showJobVacancy ? 'up' : 'down'}
                onClick={this.showJobVacancy}
                style={{ padding: '11px 12px', color: 'rgb(40, 40, 40)' }}
              />
            </div>
          </Row>
          {this.state.showJobVacancy ? (
            <React.Fragment>
              {this.props.career !== null &&
                this.props.career.map((data) => (
                  <CareerCard key={data.id} listCareer={data} />
                ))}
              {/* <Row style={FormApply}>
                <ApplyForm />
              </Row> */}
            </React.Fragment>
          ) : null}
        </Row>
      </React.Fragment>
    );
  }
}

export default Career;
