import { Request, Response } from 'express';
import { RemoveWatchedAdmin } from '../../../useCases/admin';

class RemoveWatchedAdminController {
    constructor(private removeWatchedAdmin: RemoveWatchedAdmin) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            await this.removeWatchedAdmin.execute(request.body);
            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { RemoveWatchedAdminController };
