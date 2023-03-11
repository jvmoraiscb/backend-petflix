import { Request, Response } from 'express';
import { MoviesSearch } from '../../../useCases';

class MoviesSearchController {
    constructor(private moviesSearch: MoviesSearch) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response) {
        try {
            const movies = await this.moviesSearch.execute(request.body);
            return response.status(200).json(movies);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { MoviesSearchController };
