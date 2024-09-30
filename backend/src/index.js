const cluster = require('cluster');
const os = require('os');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { port } = require('./config'); // Removed socketPort
const { authMiddleware } = require('./auth'); // Removed validateSocket
const routes = require('./routes');

// if (cluster.isMaster) {
//   const numCPUs = os.cpus().length;
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     // Optionally restart the worker
//     cluster.fork();
//   });
// } else {
  const app = express();
  app.use(cors());
  // app.use(authMiddleware);
  app.use(routes);

  const server = http.createServer(app);

  app.listen(3900, () => {
    console.log(`Express server running at http://localhost:${3900}/`);
  });

  console.log(`Worker ${process.pid} started`);
// }

