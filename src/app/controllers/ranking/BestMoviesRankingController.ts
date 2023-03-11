import { Request, Response } from 'express';
import { BestMoviesRanking } from '../../../useCases';

class BestMoviesRankingController {
    constructor(private bestMoviesRanking: BestMoviesRanking) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const bestMovies = await this.bestMoviesRanking.execute();
            return response.status(202).json(bestMovies);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { BestMoviesRankingController };
