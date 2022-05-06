import React from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
moment.locale('id');

const perfectScrollbarOption = {
  suppressScrollY: true,
  wheelPropagation: true,
};
const articleCard = (props) => (
  <PerfectScrollbar option={perfectScrollbarOption}>
    <div style={{ display: 'inline-flex' }}>
      {props.list !== null &&
        props.list.map((article) => (
          <div
            key={article.id}
            style={{
              borderRadius: 3,
              padding: '13px',
              margin: '5px 1.5px',
              backgroundColor: '#ffffff',
              width: 205,
              height: 178,
              border: 'solid 0.5px #dcdcdc',
            }}
          >
            <NavLink to={`${article.slug}`} key={article.id}>
              <div className="ddc_default_font_color">
                <div
                  style={{
                    backgroundImage: `url(${encodeURI(article.imagePath)})`,
                    width: '100%',
                    height: '80px',
                    backgroundSize: 'cover',
                    backgroundRepeatY: 'no-repeat',
                    borderRadius: '3px',
                    backgroundPosition: 'center center',
                  }}
                />
                <div className="list__article-card">
                  {article.name.length > 30 ? (
                    <span>{`${article.name.substring(0, 30)}...`}</span>
                  ) : (
                    article.name
                  )}
                </div>
                <div
                  style={{
                    color: '#8c8c8c',
                    fontSize: '11px',
                    padding: '0px 0px',
                  }}
                >
                  {moment(article.publishDate).format('ll')}
                </div>
              </div>
            </NavLink>
          </div>
        ))}
    </div>
  </PerfectScrollbar>
);
export default articleCard;
