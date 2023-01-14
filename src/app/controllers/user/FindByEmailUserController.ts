import { Request, Response } from 'express';
import { DbFindByEmailUser } from '../../../useCases';

class FindByEmailUserController {
    constructor(private dbFindByEmailUser: DbFindByEmailUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.dbFindByEmailUser.execute(request.body);
            return response.status(202).send(user);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { FindByEmailUserController };
