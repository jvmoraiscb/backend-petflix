import { Router } from 'express';
import { MoviesSearch } from '../../useCases/search';
import { MoviesSearchController } from '../controllers/search';
import { MovieApiRepository } from '../implementation/repositories/MovieApiRepository';

import { isAuthMiddleware } from '../middlewares/isAuth';

const movieApiRepository = new MovieApiRepository();

const moviesSearch = new MoviesSearch(movieApiRepository);

export const MoviesApiRoute = (router: Router) => {
    router.post(
        '/search',
        isAuthMiddleware,
        new MoviesSearchController(moviesSearch).handle
    );
};
