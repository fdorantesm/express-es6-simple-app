import mongoose from 'mongoose';

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_DEBUG = process.env.DB_DEBUG;
const DB_HOST = process.env.DB_HOST;
const DB_BASE = process.env.DB_BASE;
const DB_PORT = process.env.DB_PORT;
const APP_ALIAS = process.env.APP_ALIAS;

/**
 * Use to get mongodb uri and mongoose config.
 * @return {Object<uri, config>}
 */
export default () => {
  mongoose.set('debug', DB_DEBUG == 'true' );
  mongoose.Promise = global.Promise;

  const uri = {};

  uri.auth = DB_USER ? `${DB_USER}:${DB_PASS}@` : '';
  uri.host = DB_HOST;
  uri.base = DB_BASE ? `/${DB_BASE}` : APP_ALIAS;
  uri.port = DB_PORT ? `:${DB_PORT}` : '';
  uri.string = `mongodb://${uri.auth}${uri.host}${uri.port}${uri.base}`;

  return {
    uri: uri.string,
    config: {
      useNewUrlParser: true,
    },
  };
};
