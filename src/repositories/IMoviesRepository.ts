import { Movie } from '../entities'

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
    ): Promise<Movie>
    delete(movieId: string): Promise<void>
    addUser(movieId: string, userId: string): Promise<void>
    removeUser(movieId: string, userId: string): Promise<void>
    addEvaluation(movieId: string, evaluationId: string): Promise<void>
    removeEvaluation(movieId: string, evaluationId: string): Promise<void>
    findById(movieId: string): Promise<Movie | null>
    findByImdbId(imdbId: string): Promise<Movie | null>
}

export { IMoviesRepositoty }
