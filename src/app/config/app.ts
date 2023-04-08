import express, { Express, json } from 'express';
import cors from 'cors';
import { routes } from './routes';

const setupApp = async (): Promise<Express> => {
    const app = express();
    app.use(json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        app.use(cors());
        next();
    });
    routes(app);
    return app;
};

export { setupApp };
