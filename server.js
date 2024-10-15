require('dotenv').config();
const nunjucks = require('nunjucks');
const express = require('express');
const meteorsRoute = require('./delivery/meteorsRoute');
const globalErrorHandler = require('./errorHandler');
const config = require('./config');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(meteorsRoute);

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});