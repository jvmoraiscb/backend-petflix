import { Request, Response } from 'express';
import { MostEvaluationsRanking } from '../../../useCases';

class MostEvaluationsRankingController {
    constructor(private mostEvaluationsRanking: MostEvaluationsRanking) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const mostEvaluations = await this.mostEvaluationsRanking.execute();
            return response.status(202).json(mostEvaluations);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { MostEvaluationsRankingController };
