import { Movie } from '@prisma/client';
import { IMovieRepository } from '../../repositories';

class UserWatchedMovies {
    constructor(private movieRepository: IMovieRepository) {}

    async execute(userId: string): Promise<Movie[]> {
        const movies = await this.movieRepository.userWatchedMovies(userId);
        return movies;
    }
}

export { UserWatchedMovies };
