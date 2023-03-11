import express, { Express, Router } from 'express';
import {
    EvaluationRoute,
    MovieRoute,
    MoviesApiRoute,
    RankingRoute,
    ReactRoute,
    UserRoute,
    AvatarRoute,
    AdminRoute,
    QuoteRoute
} from '../routes';

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
    AvatarRoute(router);
    QuoteRoute(router);
};

export { routes };
