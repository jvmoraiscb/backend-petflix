import { Movie } from '@prisma/client';
import { MovieApi } from '../entities/MovieApi';

export interface IMovieRepository {
    create(movie: MovieApi & { id: string }): Promise<void>;
    suggestedMovies(): Promise<Movie[]>;
    watchedMovies(): Promise<Movie[]>;
    findByImdbId(imdbId: string): Promise<Movie | null>;
    userWatchedMovies(userId: string): Promise<Movie[]>;
}
