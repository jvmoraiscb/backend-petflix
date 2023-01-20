import { Movie } from '../../../entities';
import { IMoviesRepository } from '../../../repositories';
import { database } from '../../config/database';

class MoviesRepository implements IMoviesRepository {
    async create(
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
    ): Promise<Movie | null> {
        const movie = await database.prismaMovie.create({
            data: {
                id: movieId,
                imdbId,
                title,
                type,
                runtime,
                year,
                genre,
                plot,
                poster,
                director,
                writer,
                actors
            },
            include: {
                users: true,
                evaluations: true
            }
        });
        return movie;
    }

    async findByImdbId(imdbId: string): Promise<Movie | null> {
        const movie = await database.prismaMovie.findUnique({
            where: {
                imdbId: imdbId
            },
            include: {
                evaluations: true,
                users: true
            }
        });
        return movie;
    }

    async findById(movieId: string): Promise<Movie | null> {
        const movie = await database.prismaMovie.findUnique({
            where: {
                id: movieId
            },
            include: {
                users: true,
                evaluations: true
            }
        });
        return movie;
    }

    async delete(movieId: string): Promise<void> {
        await database.prismaMovie.delete({
            where: {
                id: movieId
            }
        });
    }

    async getAll(): Promise<Movie[]> {
        const movies = await database.prismaMovie.findMany({
            include: {
                users: true,
                evaluations: true
            }
        });

        return movies;
    }
}

export { MoviesRepository };