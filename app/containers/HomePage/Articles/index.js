import React from 'react';
import { NavLink } from 'react-router-dom';

const Articles = (props) =>
  props.articles.map((article) => (
    <div style={{ marginTop: 15 }} key={article.id}>
      <NavLink to={`komunitas/artikel/${article.slug}`}>
        <div>
          <img style={{ width: '100%' }} src={article.imagePath} />
        </div>
        <div
          className="font-weight-bold ddc_default_font_color"
          style={{ marginTop: 15 }}
        >
          {article.name}
        </div>
      </NavLink>
      <div
        style={{ marginTop: 15 }}
        dangerouslySetInnerHTML={{
          __html: `${article.content.substring(0, 500)}...`,
        }}
      />
    </div>
  ));

export default Articles;
