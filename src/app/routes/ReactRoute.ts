import { Router } from 'express';
import { DislikeReact } from '../../useCases/react';
import { LikeReact } from '../../useCases/react/LikeReact';
import { DislikeReactController } from '../controllers/react';
import { LikeReactController } from '../controllers/react/LikeReactController';
import { MovieRepository, ReactRepository } from '../implementation';
import { MovieApiRepository } from '../implementation/repositories/MovieApiRepository';

import { isAuthMiddleware } from '../middlewares/isAuth';

const reactRepository = new ReactRepository();
const movieRepository = new MovieRepository();
const movieApiRepository = new MovieApiRepository();

const likeReact = new LikeReact(
    reactRepository,
    movieRepository,
    movieApiRepository
);
const dislikeReact = new DislikeReact(
    reactRepository,
    movieRepository,
    movieApiRepository
);

export const ReactRoute = (router: Router) => {
    router.put(
        '/react/like',
        isAuthMiddleware,
        new LikeReactController(likeReact).handle
    );
    router.put(
        '/react/dislike',
        isAuthMiddleware,
        new DislikeReactController(dislikeReact).handle
    );
};
