import { Router } from 'express';
import { BestMoviesRanking, MostEvaluationsRanking } from '../../useCases';
import {
    BestMoviesRankingController,
    MostEvaluationsRankingController
} from '../controllers';
import { RankingRepository } from '../implementation';
import { isAuthMiddleware } from '../middlewares';

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
