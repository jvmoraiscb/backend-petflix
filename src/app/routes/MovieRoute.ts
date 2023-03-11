import { Router } from 'express';
import { GetMovie, SuggestedMovies, WatchedMovies } from '../../useCases';
import {
    GetMovieController,
    SuggestedMoviesController,
    WatchedMoviesController
} from '../controllers';
import { MovieRepository } from '../implementation';
import { isAuthMiddleware } from '../middlewares';

const movieRepository = new MovieRepository();

const suggestedMovies = new SuggestedMovies(movieRepository);
const watchedMovies = new WatchedMovies(movieRepository);
const getMovie = new GetMovie(movieRepository);

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
};
