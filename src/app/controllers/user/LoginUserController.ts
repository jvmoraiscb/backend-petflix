import { Request, Response } from 'express';
import { LoginUser } from '../../../useCases';

class LoginUserController {
    constructor(private loginUser: LoginUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const token = await this.loginUser.execute(request.body);
            return response.status(200).send({ token: token });
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { LoginUserController };
