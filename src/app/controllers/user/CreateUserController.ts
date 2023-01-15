import { Request, Response } from 'express';
import { DbCreateUser } from '../../../useCases';

class CreateUserController {
    constructor(private dbCreateUser: DbCreateUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.dbCreateUser.execute(request.body);
            return response.status(201).send(user);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { CreateUserController };
