import { Request, Response } from 'express';
import { GetEvaluation } from '../../../useCases';

class GetEvaluationController {
    constructor(private getEvaluation: GetEvaluation) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const evaluations = await this.getEvaluation.execute(
                request.userId
            );
            return response.status(202).json(evaluations);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { GetEvaluationController };
