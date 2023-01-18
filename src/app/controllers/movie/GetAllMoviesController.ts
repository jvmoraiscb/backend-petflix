import { Request, Response } from 'express';
import { GetAllMovies } from '../../../useCases';

class GetAllMoviesController {
    constructor(private dbGetAllMovies: GetAllMovies) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.dbGetAllMovies.execute();
            return response.status(201).send(res);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { GetAllMoviesController };
