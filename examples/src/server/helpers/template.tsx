import React from 'react';

import { Request } from 'express';
import { Store } from 'redux';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import ServerApp from './appElement';

export default (req: Request, store: Store): string => {
  let html = '';
  let styleTags = '';
  const sheet = new ServerStyleSheet();

  try {
    html = renderToString(
      sheet.collectStyles(<ServerApp req={req} store={store} />)
    );
    styleTags = sheet.getStyleTags();
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }

  return `
    <html>
      <head>
        ${styleTags}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>      
    </html>
  `;
};
