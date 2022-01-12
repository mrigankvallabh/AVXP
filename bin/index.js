const http = require('http');
const config = require('../server/config')[process.env.NODE_ENV || 'development'];
const db = require('../server/lib/db');
const app = require('../server/app')(config);
const port = process.env.PORT;

const server = http.createServer(app);

db.connect(config.database.dsn)
  .then(() => {
    console.info('Connected to Database!');
    server.listen(port);
  })
  .catch(err => {
    console.error(err);
  });

server.on('listening', () => {
  console.log(`Server listening on port ${port}`);
});

server.on('error', (err) => {
  throw err;
});