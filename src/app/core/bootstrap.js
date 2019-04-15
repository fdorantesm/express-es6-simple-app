import middlewares from 'core/middlewares';

/**
 * Module to set up Express props.
 *
 * @param {Express} app
 * @return {Express}
 */
export default function bootstrap(app) {
  app.set('x-powered-by', false);
  middlewares(app);
  return app;
}
