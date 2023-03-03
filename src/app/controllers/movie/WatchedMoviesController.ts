import { Request, Response } from 'express';
import { WatchedMovies } from '../../../useCases';

class WatchedMoviesController {
    constructor(private watchedMovies: WatchedMovies) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const movies = await this.watchedMovies.execute();
            return response.status(200).json(movies);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { WatchedMoviesController };
