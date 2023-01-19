import { Movie, SnippetMovie } from '../entities';

interface IImdbRepository {
    search(
        query: string,
        page: number
    ): Promise<{
        movies: SnippetMovie[];
        totalResults: number;
    } | null>;
    findById(
        imdbId: string
    ): Promise<Omit<
        Movie,
        | 'id'
        | 'evaluationsId'
        | 'usersId'
        | 'createdAt'
        | 'updatedAt'
        | 'evaluations'
        | 'users'
    > | null>;
}

export { IImdbRepository };
