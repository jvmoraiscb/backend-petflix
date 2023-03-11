import { Request, Response } from 'express';
import { LikeReact } from '../../../useCases';

class LikeReactController {
    constructor(private likeReact: LikeReact) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            await this.likeReact.execute(request.userId, request.query);
            return response.status(202).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { LikeReactController };
