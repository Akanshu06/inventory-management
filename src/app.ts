import express from 'express';
import cors from 'cors';
import pool from './config/db';
import   v1Routes  from './api/v1/routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

pool.getConnection()
    .then(connection => {
        console.log('Database connected');
app.use(cors());
app.use(express.json());

        app.use('/api/v1', v1Routes);
        app.use(errorHandler);
    })
    .catch(error => {
        console.error('Database connection failed:', error);
    });


export default app;