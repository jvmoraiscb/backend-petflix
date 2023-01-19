import { Request, Response } from 'express';
import { AddMovieUser } from '../../../useCases';

class AddMovieUserController {
    constructor(private dbAddMovieUser: AddMovieUser) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.dbAddMovieUser.execute(
                request.headers,
                request.body
            );
            return response.status(201).send(res);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { AddMovieUserController };
