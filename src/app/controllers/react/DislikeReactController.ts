import { Request, Response } from 'express';
import { DislikeReact } from '../../../useCases/react/DislikeReact';

class DislikeReactController {
    constructor(private dislikeReact: DislikeReact) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            await this.dislikeReact.execute(request.userId, request.query);
            return response.status(202).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { DislikeReactController };
