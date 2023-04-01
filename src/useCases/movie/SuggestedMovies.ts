import { snippetMovie } from '../../entities';
import { IMovieRepository } from '../../repositories';

class SuggestedMovies {
    constructor(private movieRepository: IMovieRepository) {}

    async execute(): Promise<snippetMovie[]> {
        return await this.movieRepository.suggestedMovies();
    }
}

export { SuggestedMovies };
