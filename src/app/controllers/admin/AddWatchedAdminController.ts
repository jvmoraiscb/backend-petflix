import { Request, Response } from 'express';
import { AddWatchedAdmin } from '../../../useCases';

class AddWatchedAdminController {
    constructor(private addWatchedAdmin: AddWatchedAdmin) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            await this.addWatchedAdmin.execute(request.query);
            return response.status(201).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { AddWatchedAdminController };
