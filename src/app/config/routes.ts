import { Express, Router } from 'express';
import { UserRoutes } from '../routes';

const routes = (app: Express) => {
    const router = Router();
    app.use('/api', router);
    UserRoutes(router);
};

export { routes };
