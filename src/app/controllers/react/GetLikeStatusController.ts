import { Request, Response } from 'express';
import { GetLikeStatus } from '../../../useCases';

class GetLikeStatusController {
    constructor(private getLikeStatus: GetLikeStatus) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const status = await this.getLikeStatus.execute(
                request.userId,
                request.query
            );
            return response.status(202).json({ status: status });
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { GetLikeStatusController };
