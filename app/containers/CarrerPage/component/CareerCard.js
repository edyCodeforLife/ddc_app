import React from 'react';
import { Row, Col, Icon, Button } from 'antd';
import CustomSVG from './../../../components/CustomSVG/index';
import constant from './../../../utils/configs/constant';

export class Career extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetailJobs: false,
      closeDetailJobss: false,
    };
  }

  showDetailJobss = () => {
    this.setState({
      showDetailJobs: !this.state.showDetailJobs,
    });
  };
  closeDetailJobss = () => {
    this.setState({
      showDetailJobs: this.state.showDetailJobs,
    });
  };
  render() {
    const helpButtonStyle = {
      height: 40,
      width: 40,
      marginTop: 10,
      marginRight: 10,
    };
    const FOOTER_URL = constant.FOOTER_HELPER;
    const background = {
      background: '#fff',
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
      margin: '15px 0px',
    };
    const listBox = {
      padding: '10px 15px',
    };
    const line = {
      border: 'solid 0.5px rgb(220, 220, 220)',
    };
    const CareerHeigth = {
      heigth: 130,
    };
    const CareerHeigth1 = {
      heigth: 100,
    };
    return (
      <Row type="flex" justify="center" style={background}>
        {this.props.listCareer !== null && (
          <Col span={24}>
            <div className="career__item">
              <div className="title__job-list">
                {this.props.listCareer.jobTitle}
              </div>
              <Row
                className="icon__job-list"
                style={listBox}
                type="flex"
                align="middle"
              >
                <Col span={2}>
                  <CustomSVG className="clickable" name={'ic-team'} />
                </Col>
                <Col span={22}>
                  <div className="job__list-postion">
                    {this.props.listCareer.jobTitle}
                  </div>
                </Col>
              </Row>
              <Row style={{ padding: '20px 15px' }}>
                <div style={line} />
              </Row>
              <Row
                type="flex"
                align="middle"
                justify="end"
                style={{ paddingBottom: 17, paddingTop: 7 }}
              >
                <div
                  className="seeDetailCareer"
                  onClick={() => this.showDetailJobss()}
                >
                  {!this.state.showDetailJobs ? (
                    <span className="clickable">Lihat detail</span>
                  ) : (
                    <span />
                  )}
                </div>
              </Row>
            </div>
            {this.state.showDetailJobs ? (
              <Row style={{ marginTop: -55 }}>
                <div className="ensure__all-project">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.props.listCareer.jobDescription,
                    }}
                  />
                </div>
                <div className="ensure__all-proect-desc">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.props.listCareer.requirements,
                    }}
                  />
                </div>
                <Row
                  type="flex"
                  align="middle"
                  justify="center"
                  gutter={5}
                  className="button__detail-career"
                >
                  <Col span={12}>
                    <a href={`mailto: ${constant.EMAIL.CAREER}?&cc=${constant.EMAIL.CAREER_CC}`}>
                      <Button type="primary" className="btn-block">
                        Lamar Posisi Ini
                      </Button>
                    </a>
                  </Col>
                  <Col span={9}>
                    <Button
                      type="default"
                      className="clickable"
                      onClick={() => this.showDetailJobss()}
                    >
                      Tutup Detail
                    </Button>
                  </Col>
                </Row>
              </Row>
            ) : null}
          </Col>
        )}
      </Row>
    );
  }
}
export default Career;
