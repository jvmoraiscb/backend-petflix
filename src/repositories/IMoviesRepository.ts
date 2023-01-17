import { Movie } from '../entities';

interface IMoviesRepositoty {
    create(
        movieId: string,
        imdbId: string,
        title: string,
        type: string,
        runtime: string,
        year: string,
        genre: string,
        plot: string,
        poster: string,
        director: string,
        writer: string,
        actors: string
    ): Promise<Movie | null>;
    delete(movieId: string): Promise<void>;
    findById(movieId: string): Promise<Movie | null>;
    findByImdbId(imdbId: string): Promise<Movie | null>;
}

export { IMoviesRepositoty };
