import { Request, Response } from 'express';
import { Trending } from '../../../useCases/trending';

class TrendingController {
    constructor(private trendig: Trending) {
        this.handle = this.handle.bind(this);
    }
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const movies = await this.trendig.execute();
            return response.status(200).json(movies);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { TrendingController };
