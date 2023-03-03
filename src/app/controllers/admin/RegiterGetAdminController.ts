import { Request, Response } from 'express';
import { RegisterGetAdmin } from '../../../useCases/admin';

class RegisterGetAdminController {
    constructor(private registerGetAdmin: RegisterGetAdmin) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.registerGetAdmin.execute();
            return response.status(200).json({ registerIsOn: result });
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { RegisterGetAdminController };
