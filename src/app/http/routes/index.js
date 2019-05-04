import Router from 'router';
import path from 'path';
import glob from 'glob';
import CliTable from 'cli-table';
import trimEnd from 'lodash/trimEnd';

// eslint-disable-next-line no-unused-vars
const table = new CliTable({
  head: ['', 'Path'],
  colWidths: [20, 40],
});

const router = Router(); // eslint-disable-line

glob.sync(process.env.APP_PATH + '/http/routes/*.js').forEach((file) => {
  if (file !== __filename) {
    const routes = require(file).default;
    const base = `/${path.basename(file).replace('.js', '')}`;
    router.use(base, routes);
    // eslint-disable-next-line max-len
    routes.stack.filter((r) => r.route).map((r) => {
      // eslint-disable-next-line max-len
      Object.keys(r.route.methods).map((method) => {
        // eslint-disable-next-line max-len
        table.push([method.toUpperCase(), trimEnd(base.concat(r.route.path), '/')]);
      });
    });
  }
});

console.log(table.toString());

export default router;
