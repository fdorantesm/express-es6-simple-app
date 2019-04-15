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
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /**
     * Error Handler
     */
    app.use((error, req, res, next) => { // eslint-disable-line
    res.status(error.status || 500).send(error);
  });

  app.use(compression());

  return app;
}
