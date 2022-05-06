import React from 'react';
import { PropTypes } from 'prop-types';
import { Row } from 'antd';
import moment from 'moment';

const style = {
  articleCard: {
    padding: 15,
  },
  articleImage: {
    width: '100%',
    height: '100%',
    maxHeight: '50vh',
    borderRadius: 3,
  },
};

const ArticleCardBig = (props) => (
  <React.Fragment>
    <Row
      className="bg-gray-light font-color-black"
      style={style.articleCard}
      type="flex"
      justify="space-between"
    >
      <img
        alt={props.article.name}
        style={style.articleImage}
        src={encodeURI(props.article.imagePath)}
      />
      <div className="mt-15">
        <div className="font-weight-bold font-size-bigger">
          {props.article.name}
        </div>
        <div className="font-size-small font-color-gray mt-15">
          {moment(props.article.publishDate).format('ll')}
        </div>
      </div>
    </Row>
  </React.Fragment>
);

ArticleCardBig.propTypes = {
  article: PropTypes.object,
};

ArticleCardBig.defaultProps = {
  article: {},
};

export default ArticleCardBig;
