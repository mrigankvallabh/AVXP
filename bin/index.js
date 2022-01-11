const http = require('http');
const config = require('../server/config')[process.env.NODE_ENV || 'development'];

const app = require('../server/app')(config);
const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.on('error', (err) => {
  throw err;
});