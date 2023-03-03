import { Router } from 'express';
import {
    BestMoviesRanking,
    MostEvaluationsRanking
} from '../../useCases/ranking';
import { MostEvaluationsRankingController } from '../controllers/ranking';
import { BestMoviesRankingController } from '../controllers/ranking/BestMoviesRankingController';
import { RankingRepository } from '../implementation/repositories/RankingRepository';

import { isAuthMiddleware } from '../middlewares/isAuth';

const rankingRepository = new RankingRepository();

const bestMoviesRanking = new BestMoviesRanking(rankingRepository);
const mostEvaluationsRanking = new MostEvaluationsRanking(rankingRepository);

export const RankingRoute = (router: Router) => {
    router.get(
        '/ranking/bestmovies',
        isAuthMiddleware,
        new BestMoviesRankingController(bestMoviesRanking).handle
    );

    router.get(
        '/ranking/mostevaluations',
        isAuthMiddleware,
        new MostEvaluationsRankingController(mostEvaluationsRanking).handle
    );
};
