import { NextFunction, Request, Response } from 'express';
import 'babel-polyfill';
import { matchRoutes } from 'react-router-config';
import Routes from '../../client/routes';
import template from '../helpers/template';
import createStore from '../helpers/createStore';
import { Store } from 'redux';

export default async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const store: Store = createStore();
  const promises = matchRoutes(Routes, req.path).map(async ({ route }) => {
    if (typeof route.loadData === 'function') {
      await route.loadData(store);
    }
  });

  await Promise.all(promises);

  req.app.locals.renderer = () => template(req, store);
  next();
};
