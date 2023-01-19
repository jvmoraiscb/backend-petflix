import { Request, Response } from 'express';
import { FindByIdEvaluation } from '../../../useCases';

class FindByIdEvaluationController {
    constructor(private dbFindByIdEvaluation: FindByIdEvaluation) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.dbFindByIdEvaluation.execute(request.body);
            return response.status(201).send(res);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { FindByIdEvaluationController };
