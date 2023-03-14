import { number, object, string } from 'yup';
import { snippetMovie } from '../../entities';
import { IMovieApiRepository } from '../../repositories';

const bodySchema = object({
    query: string().required().min(3),
    page: number().integer().positive().required()
});

class MoviesSearch {
    constructor(private movieApiRepository: IMovieApiRepository) {}

    async execute(
        body: any
    ): Promise<{ movies: snippetMovie[]; totalResults: number }> {
        body = await bodySchema.validate(body);
        const { query, page } = body;
        const result = await this.movieApiRepository.find(query, page);
        return result;
    }
}

export { MoviesSearch };
