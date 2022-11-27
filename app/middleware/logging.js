const connectDb = require('../config/database');

const logRequest = (req, res, next) => {
  console.log('Request PATH: ', req.path);
  next();
};

const logOriginalUrl = (req, res, next) => {
  console.log('Request URL: ', req.originalUrl);
  next();
};

const logMethod = (req, res, next) => {
  console.log('Request Type: ', req.method);
  next();
};

const logDbConnection = (req, res, next) => {
  connectDb.execute('SELECT 1', (err, results) => {
    if (err) {
      console.log('connection failed!!');
      res.status(500).json({ message: 'connection failed!!' });
    } else {
      console.log('connection success...');
      // res.status(200).json({ message: 'connection success...' });
      next();
    }
  });
};

module.exports = {
  logRequest,
  logOriginalUrl,
  logMethod,
  logDbConnection,
};
