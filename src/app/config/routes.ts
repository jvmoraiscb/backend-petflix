import express, { Express, Router } from 'express';
import { EvaluationRoutes, MovieRoutes, UserRoutes } from '../routes';
import { TrendingRoutes } from '../routes/TrendingRoutes';

const routes = (app: Express) => {
    const router = Router();
    app.use('/api', router);
    app.use('/public', express.static('public'));
    UserRoutes(router);
    MovieRoutes(router);
    EvaluationRoutes(router);
    TrendingRoutes(router);
};

export { routes };
