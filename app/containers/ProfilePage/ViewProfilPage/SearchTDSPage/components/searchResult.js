import React from 'react';
import { Row, Col, Rate, Button } from 'antd';
import ImageIcon from '../../../../../../assets/images/placeholder/no-image.png';
import CustomProfile from '../../../../../components/CustomProfileImage';

const searchTds = (props) => (
  <React.Fragment>
    <div
      className="container-photo-detail"
      onClick={() => props.onClickShowReview(true, props.list.id)}
    >
      <div className="container__search-tds">
        <Row
          type="flex"
          align="middle"
          justify="space-between"
          style={{ padding: '15px' }}
          className="clickable"
        >
          <Col span={3}>
            <label htmlFor="photo_url" className="clickable">
              {/* {this.props.toko.memberStore.image == null ? ( */}
              <div className="wrap">
                <CustomProfile
                  style={{
                    background: '#e1e1e1',
                  }}
                  className="style__profil-global"
                />
              </div>
              {/* ) : this.props.toko.memberStore.image !== null ? ( */}
              <div className="empety__image-listtds">
                {/* <img
                src={this.props.toko.memberStore.image}
                className="container__no__image-icon"
              /> */}
              </div>
              {/* ) : null} */}
            </label>
          </Col>
          <Col span={21} style={{padding: '0px 10px'}}>
            <div className="heade__shop-name">
              {props.list.name}, {props.list.cityName}
            </div>
            <div className="list__tds-rate">{props.list.totalReview} {'Review'}</div>
            <div>
              {' '}
              <Rate
                className="list_tds_rate"
                disabled
                allowHalf
                defaultValue={props.list.rating}
              />
            </div>
            <Button
              type="default"
              class="btn-block btn-review"
              size="small"
              style={{ fontSize: '10px', margin:'0px 10px' }}
            >
              Review
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  </React.Fragment>
);
export default searchTds;
