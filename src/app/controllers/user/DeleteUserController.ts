import { Request, Response } from 'express';
import { DbDeleteUser } from '../../../usecases';

class DeleteUserController {
    constructor(private dbDeleteUser: DbDeleteUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        try {
            await this.dbDeleteUser.execute({
                email
            });
            return response.status(202).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { DeleteUserController };
