import express, { Express, Router } from 'express';
import {
    EvaluationRoute,
    MovieRoute,
    MoviesApiRoute,
    RankingRoute,
    ReactRoute,
    UserRoute
} from '../routes';
import { AdminRoute } from '../routes/AdminRoute';

const routes = (app: Express) => {
    const router = Router();
    app.use('/api', router);
    app.use('/public', express.static('public'));
    UserRoute(router);
    ReactRoute(router);
    EvaluationRoute(router);
    RankingRoute(router);
    MovieRoute(router);
    MoviesApiRoute(router);
    AdminRoute(router);
};

export { routes };
