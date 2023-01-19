import { Request, Response } from 'express';
import { CreateEvaluation } from '../../../useCases';

class CreateEvaluationUserController {
    constructor(private dbcreateEvaluationUser: CreateEvaluation) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            await this.dbcreateEvaluationUser.execute(
                request.headers,
                request.body
            );
            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { CreateEvaluationUserController };
