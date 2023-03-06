import { Router } from 'express';
import {
    GetMovie,
    SuggestedMovies,
    UserWatchedMovies,
    WatchedMovies
} from '../../useCases';
import {
    GetMovieController,
    SuggestedMoviesController,
    WatchedMoviesController
} from '../controllers/movie';
import { UserWatchedMoviesController } from '../controllers/movie/UserWatchedMoviesController';
import { MovieRepository } from '../implementation';
import { isAuthMiddleware } from '../middlewares/isAuth';

const movieRepository = new MovieRepository();

const suggestedMovies = new SuggestedMovies(movieRepository);
const watchedMovies = new WatchedMovies(movieRepository);
const getMovie = new GetMovie(movieRepository);
const userWatchedMovies = new UserWatchedMovies(movieRepository);

export const MovieRoute = (router: Router) => {
    router.get(
        '/movie/suggested',
        isAuthMiddleware,
        new SuggestedMoviesController(suggestedMovies).handle
    );

    router.get(
        '/movie/watched',
        isAuthMiddleware,
        new WatchedMoviesController(watchedMovies).handle
    );

    router.get(
        '/movie',
        isAuthMiddleware,
        new GetMovieController(getMovie).handle
    );

    router.get(
        '/movie/user',
        isAuthMiddleware,
        new UserWatchedMoviesController(userWatchedMovies).handle
    );
};
