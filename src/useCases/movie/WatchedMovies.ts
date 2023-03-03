import { Movie } from '@prisma/client';
import { IMovieRepository } from '../../repositories';

class WatchedMovies {
    constructor(private movieRepository: IMovieRepository) {}

    async execute(): Promise<Movie[]> {
        return await this.movieRepository.watchedMovies();
    }
}

export { WatchedMovies };
