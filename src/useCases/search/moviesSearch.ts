import { number, object, string } from 'yup';
import { snippetMovieApi } from '../../entities/MovieApi';
import { IMovieApiRepository } from '../../repositories';

const bodySchema = object({
    query: string().required().min(3),
    page: number().integer().positive().required()
});

class MoviesSearch {
    constructor(private movieApiRepository: IMovieApiRepository) {}

    async execute(body: any): Promise<snippetMovieApi[]> {
        body = await bodySchema.validate(body);
        const { query, page } = body;
        const movies = await this.movieApiRepository.find(query, page);
        return movies;
    }
}

export { MoviesSearch };
