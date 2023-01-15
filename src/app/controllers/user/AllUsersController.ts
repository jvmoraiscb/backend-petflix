import { Request, Response } from 'express';
import { DbAllUsers } from '../../../useCases';

class AllUsersController {
    constructor(private dbCreateUser: DbAllUsers) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.dbCreateUser.execute();
            return response.status(201).send(users);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { AllUsersController };
