import { Movie } from '@prisma/client';
import { MovieApi, snippetMovie } from '../entities';

export interface IMovieRepository {
    create(movie: MovieApi & { id: string }): Promise<void>;
    suggestedMovies(): Promise<snippetMovie[]>;
    watchedMovies(): Promise<snippetMovie[]>;
    findByImdbId(
        imdbId: string
    ): Promise<(Movie & { rating: number }) | null>;
}
