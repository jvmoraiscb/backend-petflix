import { MovieApi } from '../entities/MovieApi';

export interface IMovieApiRepository {
    find(query: string, page: number): Promise<MovieApi[]>;
    create(imdbId: string): Promise<void>;
    findById(imdbId: string): Promise<MovieApi | null>;
}
