import { Request, Response } from 'express';
import { UpdateEvaluation } from '../../../useCases';

class UpdateEvaluationController {
    constructor(private updateEvaluation: UpdateEvaluation) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const evaluation = await this.updateEvaluation.execute(
                request.userId,
                request.body
            );
            return response.status(202).json(evaluation);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { UpdateEvaluationController };
