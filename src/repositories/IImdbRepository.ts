import { Movie, snippetMovie } from '../entities';

interface IImdbRepository {
    search(
        query: string,
        page: number
    ): Promise<{
        movies: snippetMovie[];
        totalResults: number;
        response: boolean;
    }>;
    findById(imdbId: string): Promise<Movie>;
}

export { IImdbRepository };
