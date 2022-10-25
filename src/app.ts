process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development'; //* Si esta difinido utilize la variable de entorno en caso que no por defecto 'development'

import dotenv from 'dotenv';
import express from 'express';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';
import { expressjwt } from 'express-jwt';
import cors from 'cors';
dotenv.config({
  path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

// console.log(process.env.APP_FOO);
const app: express.Application = express();

//* JSON Support

app.use(express.json());

//* Cors Support https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

loadContainer(app);

//* JWT para proteger las rutas

// if(process.env.jwt_secret_key) {
//   app.use(expressjwt({
//     secret: process.env.jwt_secret_key,
//     algorithms: ["HS256"]
//   }));
// }
if(process.env.jwt_secret_key) {
  app.use(expressjwt({
    secret: process.env.jwt_secret_key,
    algorithms: ["HS256"]
  }).unless({path: ['/subscriptions']}));
}
//* va a cargar todos los controladores que se creen en el carpeta "controllers"
app.use(loadControllers('controllers/*.ts', { cwd: __dirname}));
export { app };