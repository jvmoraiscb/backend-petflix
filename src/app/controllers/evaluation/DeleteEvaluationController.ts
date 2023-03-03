import { Request, Response } from 'express';
import { DeleteEvaluation } from '../../../useCases';

class DeleteEvaluationController {
    constructor(private deleteEvaluation: DeleteEvaluation) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            await this.deleteEvaluation.execute(request.userId, request.body);
            return response.status(202).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { DeleteEvaluationController };
