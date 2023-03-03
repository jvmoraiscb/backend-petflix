import { Request, Response } from 'express';
import { SuggestedMovies } from '../../../useCases';

class SuggestedMoviesController {
    constructor(private suggestedMovies: SuggestedMovies) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const movies = await this.suggestedMovies.execute();
            return response.status(200).json(movies);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { SuggestedMoviesController };
