import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './src/routes/home.routes.js';
import userRoutes from './src/routes/user.routes.js';
import TokenRoutes from './src/routes/token.routes.js';
import AlunoRoutes from './src/routes/aluno.routes.js';
import PhotoRoutes from './src/routes/photo.routes.js';

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

import './src/database/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadPath = resolve(__dirname, 'uploads');

const whiteList = [
  'http://localhost:3000'
];

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else{
      callback(new Error('Not allowed by CORS'));
    }
  }
}

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(uploadPath));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', TokenRoutes);
    this.app.use('/alunos/', AlunoRoutes);
    this.app.use('/fotos/', PhotoRoutes);
  }
}

export default new App().app;
