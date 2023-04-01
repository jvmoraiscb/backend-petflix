import { snippetMovie } from '../../entities';
import { IMovieRepository } from '../../repositories';

class WatchedMovies {
    constructor(private movieRepository: IMovieRepository) {}

    async execute(): Promise<snippetMovie[]> {
        return await this.movieRepository.watchedMovies();
    }
}

export { WatchedMovies };
