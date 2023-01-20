import { Router } from 'express';
import { Trending } from '../../useCases/trending';
import { TrendingController } from '../controllers';
import { TrendingRepository } from '../implementation';

const trendingRepository = new TrendingRepository();
const trending = new Trending(trendingRepository);

export const TrendingRoutes = (router: Router) => {
    router.get('/trending', new TrendingController(trending).handle);
};
