import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';

import Bagikan from '../../../../components/ShareButton/shareArticle';
import ArticleCard from './articleCard';
moment.locale('id');

export class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.detailArtikel.id,
    };
  }

  render() {
    const CommentTextArea = {
      background: '#fff',
      paddingTop: 10,
    };
    const commentColumn = {
      marginLeft: '-15px',
      marginRight: '-15px',
      marginTop: '10px',
      background: '#fff',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    };
    const comment = {
      paddingTop: '0px',
      background: '#fff',
    };
    const detailArticle = {
      background: '#fff',
      marginLeft: '-15px',
      marginRight: '-15px',
      boxShadow: '0 0 2px 0 rgba(40, 40, 40, 0.2)',
    };
    return (
      <React.Fragment>
        <Row>
          {this.props.detailArtikel !== null && (
            <div>
              <Row style={detailArticle}>
                <div style={{ padding: '10px 15px' }}>
                  <Col span={24} className="thumbnail__banner-articles">
                    <div
                      style={{
                        backgroundImage: `url(${
                          encodeURI(this.props.detailArtikel.imagePath)
                        })`,
                        height: '100%',
                        backgroundSize: 'cover',
                        backgroundRepeatY: 'no-repeat',
                        borderRadius: '3px',
                        backgroundPosition: 'center center',
                      }}
                    />
                  </Col>
                  <Col span={24}>
                    <div className="title__banner-article">
                      {this.props.detailArtikel.name}
                    </div>
                    <div className="tgl__detail-article">
                      {moment(this.props.detailArtikel.publishDate).format('ll')}
                    </div>
                    <div className="describe__detail-article">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.props.detailArtikel.content,
                        }}
                      />
                    </div>
                  </Col>
                </div>
              </Row>
              <Row style={commentColumn}>
                <Row
                  type="flex"
                  align="middle"
                  justify="end"
                  style={{ padding: '0px 15px' }}
                >
                  <Col span={18} />
                  <Col span={6} className="shareComment">
                    <span style={{ paddingLeft: '7px' }}>
                      <Bagikan artikel={this.props.detailArtikel.slug} />
                    </span>
                  </Col>
                </Row>
                <Row style={comment}>
                  <label className="label__comment-article">
                    Tulis Komentar
                  </label>
                </Row>
                <Row style={CommentTextArea}>
                  <div style={{ padding: '0px 15px' }}>
                    <div
                      className="fb-comments"
                      data-href={`${window.location.hostname}/komunitas/artikel/${
                        this.props.detailArtikel.slug
                      }`}
                      data-width="100%"
                      data-numposts="5"
                    />
                    <div className="lineDivider" />
                  </div>
                </Row>
              </Row>
            </div>
          )}
          <Row>
            <div className="related__article-list">
              Menarik juga untuk di simak
            </div>
            <ArticleCard list={this.props.otherArticles} />
          </Row>
        </Row>
      </React.Fragment>
    );
  }
}
export default ArticleDetail;
