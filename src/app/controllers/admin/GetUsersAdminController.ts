import { Request, Response } from 'express';
import { GetUsersAdmin } from '../../../useCases/admin';

class GetUsersAdminController {
    constructor(private getUsersAdmin: GetUsersAdmin) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.getUsersAdmin.execute();
            return response.status(200).json(users);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { GetUsersAdminController };
