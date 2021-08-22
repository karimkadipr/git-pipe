import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';
import initRoutes from './init/init.routes';
import errorHandler from './middlewares/errorHandler';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(cors());

initRoutes(app);

app.use(errorHandler);

app.get('/', function (req, res) {
  res.send('<h3>Hello, Server is up !</h3>');
});

export default app;
