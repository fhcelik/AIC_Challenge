import jsonServer from 'json-server';
import { getPortPromise } from 'portfinder';
import enableDestroy from 'server-destroy';

export const DEFAULT_PORT = 3000;

const createServer = port =>
  new Promise((resolve, reject) => {
    const server = jsonServer.create();
    const router = jsonServer.router(`${__dirname}/db.json`);
    const middlewares = jsonServer.defaults();
    server.use(middlewares);
    server.use(router);
    const app = server.listen(port, err => {
      if (err) {
        return reject(err);
      }
      app.port = port;
      enableDestroy(app);
      return resolve(app);
    });
  });

export const start = () =>
  getPortPromise({ port: DEFAULT_PORT }).then(createServer);
