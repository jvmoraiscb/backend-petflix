import { Router } from 'express';
import { MoviesSearch } from '../../useCases';
import { MoviesSearchController } from '../controllers';
import { MovieApiRepository } from '../implementation';
import { isAuthMiddleware } from '../middlewares';

const movieApiRepository = new MovieApiRepository();

const moviesSearch = new MoviesSearch(movieApiRepository);

export const MoviesApiRoute = (router: Router) => {
    router.post(
        '/search',
        isAuthMiddleware,
        new MoviesSearchController(moviesSearch).handle
    );
};
