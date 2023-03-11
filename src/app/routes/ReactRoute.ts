import { Router } from 'express';
import { DislikeReact, GetLikeStatus, LikeReact } from '../../useCases';
import {
    DislikeReactController,
    GetLikeStatusController,
    LikeReactController
} from '../controllers';
import {
    MovieApiRepository,
    MovieRepository,
    ReactRepository
} from '../implementation';
import { isAuthMiddleware } from '../middlewares';

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
const getLikeStatus = new GetLikeStatus(reactRepository, movieRepository);

export const ReactRoute = (router: Router) => {
    router.get(
        '/react/status',
        isAuthMiddleware,
        new GetLikeStatusController(getLikeStatus).handle
    );
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
