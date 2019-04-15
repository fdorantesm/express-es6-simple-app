import path from 'path';
import dotenv from 'dotenv';
import trimEnd from 'lodash/trimEnd';

const INIT_CWD = process.env.INIT_CWD;
const NODE_ENV = process.env.NODE_ENV;

const main = require.main.children[0].filename; // eslint-disable-line
const $root = INIT_CWD;
const $environment = NODE_ENV === 'test' ? 'testing' : '';
const APP_PATH = path.join($root, 'src/app').split('/');
const SRC_PATH = [...APP_PATH];
const APP_DIR = __dirname.replace(`${process.env.ROOT_PATH}/`, '');
SRC_PATH.pop();

process.env.ROOT_PATH = $root;
process.env.SRC_PATH = SRC_PATH.join('/');
process.env.APP_DIR = APP_DIR;
process.env.SRC_DIR = APP_DIR.replace('/app', '');
process.env.APP_PATH = APP_PATH.join('/');

const $dotenv = `${$root}/.env.${$environment}`;

dotenv.config({
  path: trimEnd($dotenv, '.'),
});

export default process.env;
