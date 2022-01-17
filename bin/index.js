const http = require('http');
const nCPU = require('os').cpus().length;
const cluster = require('cluster');
const config = require('../server/config')[process.env.NODE_ENV || 'development'];
const db = require('../server/lib/db');
const app = require('../server/app')(config);
const port = process.env.PORT;

const log = config.log();
const server = http.createServer(app);

if(cluster.isPrimary) {
  log.info(`Master process ${process.pid} is running`);

  for (let i = 0; i < nCPU; i++) {
    cluster.fork()    
  }

  cluster.on('exit', worker => {
    log.error(`Master process ${process.pid} crashed`);
    cluster.fork();
  });
} else {
  db.connect(config.database.dsn)
    .then(() => {
      log.info('Connected to Database!');
      server.listen(port);
    })
    .catch(err => {
      log.fatal(err);
    });
}

server.on('listening', () => {
  log.info(`Server listening on port ${port}`);
});

server.on('error', (err) => {
  throw err;
});