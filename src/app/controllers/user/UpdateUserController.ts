import { Request, Response } from 'express';
import { UpdateUser } from '../../../useCases';

class UpdateUserController {
    constructor(private updateUser: UpdateUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.updateUser.execute(
                request.userId,
                request.body
            );
            return response.status(201).send(user);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { UpdateUserController };
