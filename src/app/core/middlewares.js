import cors from 'cors';
import boom from 'express-boom';
import router from 'core/router';
import express from 'express';
import compression from 'compression';

/**
 * Module to set up Express Middlewares
 * @param {Express} app
 * @return {Express}
 */
export default function middlewares(app) {
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cors({origin: '*'}));
  app.use(boom());

  router(app);

  /**
   * 404 Error Handler
   */
  app.use((req, res, next) => {
    res.boom.notFound();
  });

  /**
   * Error Handler
   */
  app.use((err, req, res, next) => { // eslint-disable-line
    const exception = err.name || err.message;
    switch (exception) {
      case 'CastError': res.boom.notFound(); break;
      case 'ValidationError': res.boom.badData(err); break;
      case 'NotFoundError': res.boom.notFound(err); break;
      default: res.boom.internal(err);
    }
  });

  app.use(compression());

  return app;
}
