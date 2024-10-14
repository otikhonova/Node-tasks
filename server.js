require('dotenv').config();
const express = require('express');
const meteorsRoute = require('./delivery/meteorsRoute');

const app = express();
const PORT = 4000;

app.use(meteorsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
