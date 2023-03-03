import { Movie, MovieType } from '@prisma/client';
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

    async suggestedMovies(): Promise<Movie[]> {
        return await database.movie.findMany({
            where: {
                movieType: MovieType.SUGGESTED
            },
            include: {
                evaluations: {
                    include: {
                        user: {
                            select: {
                                name: true
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
    }

    async watchedMovies(): Promise<Movie[]> {
        return await database.movie.findMany({
            where: {
                movieType: MovieType.WATCHED
            },
            include: {
                evaluations: {
                    include: {
                        user: {
                            select: {
                                name: true
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
    }

    async findByImdbId(imdbId: string): Promise<Movie | null> {
        return await database.movie.findUnique({
            where: {
                imdbId
            },
            include: {
                evaluations: {
                    include: {
                        user: {
                            select: {
                                name: true
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
    }

    async userWatchedMovies(userId: string): Promise<Movie[]> {
        return await database.movie.findMany({
            where: {
                evaluations: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                evaluations: {
                    include: {
                        user: {
                            select: {
                                name: true
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
    }
}

export { MovieRepository };
