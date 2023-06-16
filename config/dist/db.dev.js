"use strict";

var mongoose = require('mongoose');

var dotenv = require('dotenv');

dotenv.config();
var mongodbUrl = process.env.MONGODB_URL;
var connection;

var connectMongo = function connectMongo() {
  return regeneratorRuntime.async(function connectMongo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          connection = _context.sent;
          console.log('Connected to MongoDB');
          _context.next = 12;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log('Error while connecting to MongoDB');
          console.log('MongoURL:', mongodbUrl);
          process.exit(1);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var closeMongo = function closeMongo() {
  return regeneratorRuntime.async(function closeMongo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(connection.close());

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          process.exit(1);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

module.exports = {
  connectMongo: connectMongo,
  closeMongo: closeMongo
};