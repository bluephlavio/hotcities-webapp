import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes from '../../shared/routes';
import App from '../../shared/components/App/App';

const main = (req, res) => {
  const activeRoute = routes.find(route => matchPath(req.url, route));
  if (activeRoute) {
    const context = {};
    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>,
    );
    return res.status(200)
      .render('main', { markup });
  }
  return res.status(404)
    .json({
      message: 'Not Found.',
    });
};

export default {
  main,
};
