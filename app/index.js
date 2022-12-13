const express = require('express');
const cors = require('cors');

const app = express();

// a. Spesific list URL
var allowlist = ['https://codepen.io', 'https://cdpn.io', 'http://localhost:8081'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// b. For specific URL allowed
/*var corsOptions = {
  origin: ['https://codepen.io', 'https://cdpn.io'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
*/

app.use(cors(corsOptionsDelegate));

require('dotenv').config();
const PORT = process.env.PORT || 5000;

//INCLUDE MIDDLEWARE
const middlewareRequest = require('./middleware/logging');
const upload = require('./middleware/multer');
const logStuff = [middlewareRequest.logRequest, middlewareRequest.logOriginalUrl, middlewareRequest.logMethod, middlewareRequest.logDbConnection];
app.use(logStuff);

//Allow Request Body
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use('/assets', express.static('public/images'));

//INCLUDE ROUTES
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

//TESTING
app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to IWPRO application.',
  });
});

// app.get('/products/:id', cors(corsOptionsDelegate), function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
// });

app.post('/search', (req, res, next) => {
  const dataSearch = {
    name: req.body.nama,
    umur: req.body.umur,
  };
  res.json({
    message: 'Request has parsed!!',
    data: dataSearch,
  });
});

app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({
    message: 'Upload success!!',
  });
});

//ERROR HANDLING
app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

//STARTING SERVER
const port = 4000;
app.listen(port, () => {
  console.log(`Server berhasil di running pada port ${port}!`);
});
