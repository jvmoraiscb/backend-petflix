import { Express, Router } from 'express';
import { EvaluationRoutes, MovieRoutes, UserRoutes } from '../routes';

const routes = (app: Express) => {
    const router = Router();
    app.use('/api', router);
    UserRoutes(router);
    MovieRoutes(router);
    EvaluationRoutes(router);
};

export { routes };
