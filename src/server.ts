import express from 'express';
import nunjucks from 'nunjucks';
import nasaRoutes from './delivery/nasaRoutes';
import globalErrorHandler from './errorHandler';
import config from './config';

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(nasaRoutes);

app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
