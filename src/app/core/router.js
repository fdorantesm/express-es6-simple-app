import router from '@/app/http/router';

/**
 * This module sets router middleware.
 *
 * @param {Express} app
 * @return {Express}
 */
export default function routes(app) {
  app.use('/', router);
  return app;
}
