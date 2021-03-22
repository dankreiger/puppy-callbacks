/* eslint-disable @typescript-eslint/no-floating-promises */
import 'babel-polyfill';
import express from 'express';
import renderMiddleware from './middleware/render';

const app: express.Application = express();

app.use(express.static('public'));
app.use(renderMiddleware);
app.get('*', (req, res): void => {
  const { renderer } = req.app.locals;
  res.send(renderer());
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
