process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development'; //* Si esta difinido utilize la variable de entorno en caso que no por defecto 'development'

import dotenv from 'dotenv';
import express from 'express';
import loadContainer from './container';

dotenv.config({
  path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

console.log(process.env.APP_FOO);
const app: express.Application = express();

loadContainer(app);

export { app };