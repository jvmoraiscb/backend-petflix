import { Movie, MovieType } from '@prisma/client';
import { snippetMovie } from '../../../entities';
import { MovieApi } from '../../../entities/MovieApi';
import { IMovieRepository } from '../../../repositories';
import { database } from '../../config/database';

class MovieRepository implements IMovieRepository {
    async create(movie: MovieApi & { id: string }): Promise<void> {
        await database.movie.create({
            data: {
                actors: movie.Actors,
                director: movie.Director,
                genre: movie.Genre,
                imdbId: movie.imdbID,
                plot: movie.Plot,
                poster: movie.Poster,
                runtime: movie.Runtime,
                title: movie.Title,
                type: movie.Type,
                writer: movie.Writer,
                year: movie.Year,
                id: movie.id
            }
        });
    }

    async suggestedMovies(): Promise<snippetMovie[]> {
        const movies = await database.movie.findMany({
            where: {
                movieType: MovieType.SUGGESTED
            },
            include: {
                evaluations: true,
                _count: {
                    select: {
                        likes: true,
                        dislikes: true,
                        evaluations: true
                    }
                }
            }
        });

        const suggestedMovies: snippetMovie[] = [];
        for (const movie of movies) {
            const { likes, dislikes, evaluations } = movie._count;
            const { imdbId, poster } = movie;
            let avg = 0;
            if (evaluations > 0) {
                for (let i = 0; i < evaluations; i++) {
                    avg += movie.evaluations[i].rating;
                }
                avg /= evaluations;
            }
            const rating = avg;
            const wasWatched =
                movie.movieType === MovieType.WATCHED ? true : false;

            suggestedMovies.push({
                wasWatched,
                imdbId,
                poster,
                evaluations,
                rating,
                likes,
                dislikes
            });
        }
        return suggestedMovies;
    }

    async watchedMovies(): Promise<snippetMovie[]> {
        const movies = await database.movie.findMany({
            where: {
                movieType: MovieType.WATCHED
            },
            include: {
                evaluations: true,
                _count: {
                    select: {
                        likes: true,
                        dislikes: true,
                        evaluations: true
                    }
                }
            }
        });
        const watchedMovies: snippetMovie[] = [];
        for (const movie of movies) {
            const { likes, dislikes, evaluations } = movie._count;
            const { imdbId, poster } = movie;
            let avg = 0;
            if (evaluations > 0) {
                for (let i = 0; i < evaluations; i++) {
                    avg += movie.evaluations[i].rating;
                }
                avg /= evaluations;
            }
            const rating = avg;
            const wasWatched =
                movie.movieType === MovieType.WATCHED ? true : false;

            watchedMovies.push({
                wasWatched,
                imdbId,
                poster,
                evaluations,
                rating,
                likes,
                dislikes
            });
        }
        return watchedMovies;
    }

    async findByImdbId(
        imdbId: string
    ): Promise<(Movie & { rating: number }) | null> {
        const movie = await database.movie.findUnique({
            where: {
                imdbId
            },
            include: {
                evaluations: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                profilePic: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        dislikes: true,
                        evaluations: true
                    }
                }
            }
        });
        let avg = 0;
        if (movie != null) {
            if (movie.evaluations.length > 0) {
                for (let i = 0; i < movie.evaluations.length; i++) {
                    avg += movie.evaluations[i].rating;
                }
                avg /= movie.evaluations.length;
            }
            const rating = avg;

            return { ...movie, rating };
        }
        return null;
    }
}

export { MovieRepository };
