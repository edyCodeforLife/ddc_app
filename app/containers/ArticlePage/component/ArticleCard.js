import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'antd';
import moment from 'moment';

const style = {
  articleCard: {
    padding: 15,
  },
  articleImage: {
    width: '80px',
    height: '80px',
    backgroundSize: 'cover',
    backgroundRepeatY: 'no-repeat',
    borderRadius: '3px',
    backgroundPosition: 'center center',
  },
};

const ArticleCard = (props) => (
  <React.Fragment>
    <Row
      className="bg-white box-shadow font-color-black"
      style={style.articleCard}
      type="flex"
      justify="space-between"
    >
      <Col span={4}>
        <div
          style={{
            ...style.articleImage,
            backgroundImage: `url(${encodeURI(props.article.imagePath)})`,
          }}
        />
      </Col>
      <Col span={18} className="pl-15">
        <div className="font-weight-bold">{props.article.name}</div>
        <div className="font-size-small font-color-gray mt-15">
          {moment(props.article.publishDate).format('ll')}
        </div>
      </Col>
    </Row>
  </React.Fragment>
);

ArticleCard.propTypes = {
  article: PropTypes.object,
};

ArticleCard.defaultProps = {
  article: {},
};

export default ArticleCard;
