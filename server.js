// to run --> `node server.js`

const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./backend/app');     // import JS file from backend folder

// error-handling function for the port
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

// error-handling function for the server instantiation
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUS":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.port || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);      // if something went wrong with running the server
server.on("listening", onListening);
server.listen(port);
