import React from 'react';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from '../../client/routes';
import { Request } from 'express';
import { Store } from 'redux';
import Layout from '../../client/components/Layout/Layout';
import { GlobalStyle } from '../../client/shared/GlobalStyle';

export default ({
  req,
  store,
}: {
  req: Request;
  store: Store;
}): JSX.Element => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <Layout>{renderRoutes(Routes)}</Layout>
      </StaticRouter>
    </Provider>
  </>
);
