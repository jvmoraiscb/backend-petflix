import { Movie } from '@prisma/client';
import { IMovieRepository } from '../../repositories';

class SuggestedMovies {
    constructor(private movieRepository: IMovieRepository) {}

    async execute(): Promise<Movie[]> {
        return await this.movieRepository.suggestedMovies();
    }
}

export { SuggestedMovies };
