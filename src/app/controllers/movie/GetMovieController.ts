import { Request, Response } from 'express';
import { GetMovie } from '../../../useCases';

class GetMovieController {
    constructor(private getMovie: GetMovie) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const movie = await this.getMovie.execute(request.body);
            return response.status(202).json(movie);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { GetMovieController };
