import { ConnectionPool } from "mssql";
import dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/../../../config/${process.env.APP_ENV}.env`
});
console.log(process.env.db_mssql_password);

const config = {
  server: process.env.db_mssql_server as string,
  database:  process.env.db_mssql_database as string,
  user:  process.env.db_mssql_user as string,
  password: process.env.db_mssql_password as string,
  options: {
    enableArithAbort: true
  }
};

export default new ConnectionPool(config).connect();

