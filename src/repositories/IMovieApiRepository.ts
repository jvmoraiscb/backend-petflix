import { MovieApi, snippetMovie } from '../entities';

export interface IMovieApiRepository {
    find(
        query: string,
        page: number
    ): Promise<{ movies: snippetMovie[]; totalResults: number }>;
    create(imdbId: string): Promise<void>;
    findById(imdbId: string): Promise<MovieApi | null>;
}
