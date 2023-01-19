import { Movie } from '../../../entities';
import { IMoviesRepositoty } from '../../../repositories';
import { database } from '../../config/database';

class MovieRepository implements IMoviesRepositoty {
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
                Users: true,
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
                Users: true
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
                Users: true,
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
}

export { MovieRepository };
