import { Request, Response } from 'express';
import { GetAllEvaluations } from '../../../useCases';

class GetAllEvaluationsController {
    constructor(private dbGetAllEvaluations: GetAllEvaluations) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.dbGetAllEvaluations.execute();
            return response.status(201).send(res);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { GetAllEvaluationsController };
