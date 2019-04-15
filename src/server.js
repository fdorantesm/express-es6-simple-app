import env from '@/env'; // eslint-disable-line
import fs from 'fs';
import http from 'http';
import https from 'https';
import app from 'app';

const key = fs.readFileSync(process.env.APP_SSL_KEY);
const cert = fs.readFileSync(process.env.APP_SSL_CERT);

const secure = {
  key,
  cert,
  passphrase: process.env.APP_SSL_PASSPHRASE,
};

const server = {
  http: http.createServer(app),
  https: https.createServer(secure, app),
};

server.http.listen(process.env.APP_PORT);
server.http.on('error', onError);
server.http.on('listening', onListening);

server.https.listen(process.env.APP_SSL_PORT);
server.https.on('error', onError);
server.https.on('listening', onListening);

/**
 * HTTP Server Error Handler
 * @param  {Error} error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const isString = typeof error.port === 'string';

  const bind = isString ? `Pipe ${error.port}` : `Port ${error.port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * @description HTTP Server listen callback
 * @this { cert }
 */
function onListening() {
  const protocol = this.cert ? 'https' : 'http';
  const addr = (this.cert ? server.https : server.http).address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `:${addr.port}`;
  console.log(`Listening on ${protocol}://localhost${bind}`);
}
