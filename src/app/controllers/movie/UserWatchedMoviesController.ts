import { Request, Response } from 'express';
import { UserWatchedMovies } from '../../../useCases';

class UserWatchedMoviesController {
    constructor(private userWatchedMovies: UserWatchedMovies) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const movies = await this.userWatchedMovies.execute(request.userId);
            return response.status(200).json(movies);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { UserWatchedMoviesController };
