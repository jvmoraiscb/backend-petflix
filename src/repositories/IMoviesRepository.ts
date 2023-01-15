import { Movie } from '../entities/Movie';

interface IMoviesRepositoty {
    createMovie(
        imdbId: string,
        title: string,
        year: string,
        genre: string,
        plot: string,
        poster: string
    ): Promise<Movie>;
    deleteMovie(movieId: number): Promise<void>;
    addUser(movieId: number, userId: number): Promise<void>;
    removeUser(movieId: number, userId: number): Promise<void>;
    addEvaluation(movieId: number, evaluationId: number): Promise<void>;
    removeEvaluation(movieId: number, evaluationId: number): Promise<void>;
}

export { IMoviesRepositoty };
