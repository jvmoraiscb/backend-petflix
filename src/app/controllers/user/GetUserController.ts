import { Request, Response } from 'express';
import { GetUser } from '../../../useCases';

class GetUserController {
    constructor(private getUser: GetUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.getUser.execute(request.userId);
            return response.status(200).send(user);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}

export { GetUserController };
