const express = require('express');
const shortenLinkRoute = require('./routes/shortenLinkRoutes');
const usersRoute = require('./routes/userRoutes');
const userLinkRoute = require('./routes/userLinkRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   next();
// });

app.use('/api/v1/links', userLinkRoute);
app.use('/api/v1/cl', shortenLinkRoute);
app.use('/api/v1/users', usersRoute);

app.all('*', (req, res, next) => {
  const err = new Error(`Cant find ${req.originalUrl} on the server`);
  err.status = 'fail';
  err.statusCode = 404;

  next(new appError(`Cant find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
