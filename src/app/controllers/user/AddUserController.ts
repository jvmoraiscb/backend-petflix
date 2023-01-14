import { Request, Response } from 'express';
import { DbAddUser } from '../../../useCases';

class AddUserController {
    constructor(private dbAddUser: DbAddUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, profilePic } = request.body;
        try {
            const user = await this.dbAddUser.execute({
                email,
                password,
                name,
                profilePic
            });
            return response.status(201).send(user);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { AddUserController };
