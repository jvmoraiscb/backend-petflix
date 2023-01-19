import { Request, Response } from 'express';
import { FindByIdMovie } from '../../../useCases';

class FindByIdMovieController {
    constructor(private dbFindByIdMovie: FindByIdMovie) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.dbFindByIdMovie.execute(request.body);
            return response.status(201).send(res);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { FindByIdMovieController };
