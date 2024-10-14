require('dotenv').config();
const express = require('express');
const meteorsRoute = require('./delivery/meteorsRoute');
const globalErrorHandler = require('./errorHandler');
const config = require('./config');

const app = express();

app.use(meteorsRoute);

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});