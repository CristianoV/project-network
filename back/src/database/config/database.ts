import { Options } from 'sequelize';
import dotenv = require('dotenv');
dotenv.config();

const config: Options = {
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '1234',
  database: process.env.PGDATABASE || 'database_development',
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;