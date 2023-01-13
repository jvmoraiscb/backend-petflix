import { Request, Response } from 'express';
import { DbLoginUser } from '../../../usecases';

class LoginUserController {
    constructor(private dbLoginUser: DbLoginUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        try {
            const token = await this.dbLoginUser.execute({
                email,
                password
            });
            return response.status(200).send({ email: email, token: token });
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { LoginUserController };
