import { Request, Response } from 'express';
import { DeleteUserAdmin } from '../../../useCases/admin';

class DeleteUserAdminController {
    constructor(private deleteUserAdmin: DeleteUserAdmin) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            await this.deleteUserAdmin.execute(request.body);
            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { DeleteUserAdminController };
