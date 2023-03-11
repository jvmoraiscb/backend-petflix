import { Request, Response } from 'express';
import { RegisterToggleAdmin } from '../../../useCases';

class RegisterToggleAdminController {
    constructor(private registerToggleAdmin: RegisterToggleAdmin) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            await this.registerToggleAdmin.execute();
            return response.status(200).send();
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { RegisterToggleAdminController };
