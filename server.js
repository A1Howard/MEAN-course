// to run --> `node server.js`

const http = require('http');
const app = require('./backend/app');     // import JS file

port = process.env.PORT || 3000;      // access the port number designated at runtime OR just use 3000

app.set('port', port);
const server = http.createServer(app);

server.listen(port);
