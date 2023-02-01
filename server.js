const http = require('http');
const app = require('./src/app');

const port = process.env.PORT || 3030;
const server = http.createServer(app);

server.listen(port);

console.log('Rodando na url http://localhost:3030')

