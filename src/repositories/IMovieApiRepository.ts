import { MovieApi, snippetMovieApi } from '../entities/MovieApi';

export interface IMovieApiRepository {
    find(query: string, page: number): Promise<snippetMovieApi[]>;
    create(imdbId: string): Promise<void>;
    findById(imdbId: string): Promise<MovieApi | null>;
}
