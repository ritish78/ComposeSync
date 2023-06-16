"use strict";

var express = require('express');

var _require = require('./config/db'),
    connectToMongoDB = _require.connectMongo;

var dotenv = require('dotenv');

var _require2 = require('socket.io'),
    Server = _require2.Server;

var http = require('http');

var cors = require('cors');

dotenv.config();

var path = require('path');

var rateLimiter = require('./middleware/rate-limiter');

var _require3 = require('./config/redis'),
    redisClient = _require3.redisClient;

var app = express();
var httpServer = http.createServer(app); //Connect to MongoDB

connectToMongoDB(); //Intiliazing middleware

app.use(express.json({
  extended: false
}));
app.use(cors());
app.use(rateLimiter);
var EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT;
app.get('/', function (req, res) {
  res.send({
    message: 'API Working fine'
  });
}); //Initializing socket.io

var io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
io.on('connection', function (socket) {
  console.log('CONNECTED!');
  socket.on('get-document', function (documentInfo) {
    socket.join(documentInfo.documentId);
    socket.emit('load-document', documentInfo.data);
  });
  socket.on('send-changes', function (documentInfo) {
    socket.broadcast.to(documentInfo.documentId).emit('receive-changes', documentInfo.delta);
  });
  socket.on('save-document', function (documentInfo) {
    socket.broadcast.to(documentInfo.documentId).emit('save-document', documentInfo.data);
  }); // socket.on('user-joined', ({ username, documentId }) => {
  //     redisClient.sAdd(documentId, username);
  // })
}); //Defining routes

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/documents', require('./routes/api/document'));
app.use('/api/profile', require('./routes/api/profile')); //Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//     //Set static folder
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

httpServer.listen(EXPRESS_SERVER_PORT, function () {
  console.log('Server listening on port', EXPRESS_SERVER_PORT);
  app.emit('server-started');
});
app.on('close', function () {
  return httpServer.close();
});
module.exports = app;