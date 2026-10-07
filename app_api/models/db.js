const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg) => {
  mongoose.connection.close()
    .then(() => {
      console.log(`Mongoose disconnected through ${msg}`);
    });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart').then(() => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Shutdown invoked by app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination').then(() => {
    process.exit(0);
  });
});

// Shutdown invoked by container termination
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown').then(() => {
    process.exit(0);
  });
});

// Make initial connection to DB
connect();

// Import Mongoose schema
require('./travlr');

module.exports = mongoose;
