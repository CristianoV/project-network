import { App } from './app';
import dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3333;

new App().start(PORT);