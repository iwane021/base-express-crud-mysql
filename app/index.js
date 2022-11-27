const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

//INCLUDE MIDDLEWARE
const middlewareRequest = require('./middleware/logging');
const upload = require('./middleware/multer');
const logStuff = [middlewareRequest.logRequest, middlewareRequest.logOriginalUrl, middlewareRequest.logMethod, middlewareRequest.logDbConnection];
app.use(logStuff);
//Allow Request Body
app.use(express.json());
app.use('/assets', express.static('public/images'));

//INCLUDE ROUTES
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);
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
