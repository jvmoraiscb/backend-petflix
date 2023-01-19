import { Router } from 'express';
import {
    AddMovieUser,
    FindByIdMovie,
    FindByImdbIdMovie,
    GetAllMovies,
    RemoveMovieUser,
    SearchMovie
} from '../../useCases';
import {
    SearchMovieController,
    FindByImdbIdMovieController,
    GetAllMoviesController,
    FindByIdMovieController,
    AddMovieUserController,
    RemoveMovieUserController
} from '../controllers';
import {
    IdGenerator,
    ImdbRepository,
    MoviesRepository,
    TokenGenerator,
    UserRepository
} from '../implementation';

const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();

const userRepository = new UserRepository();
const imdbRepository = new ImdbRepository();
const moviesRepository = new MoviesRepository();

const dbFindByIdMovie = new FindByIdMovie(moviesRepository);
const dbGetAllMovies = new GetAllMovies(moviesRepository);
const dbSearchMovie = new SearchMovie(imdbRepository);
const dbFindByImdbIdMovie = new FindByImdbIdMovie(
    imdbRepository,
    moviesRepository
);
const dbAddMovieUser = new AddMovieUser(
    userRepository,
    moviesRepository,
    imdbRepository,
    tokenGenerator,
    idGenerator
);
const dbRemoveMovieUser = new RemoveMovieUser(
    userRepository,
    moviesRepository,
    tokenGenerator
);

export const MovieRoutes = (router: Router) => {
    router.get('/movie', new GetAllMoviesController(dbGetAllMovies).handle);
    router.post('/movie', new FindByIdMovieController(dbFindByIdMovie).handle);
    router.post(
        '/movie/add',
        new AddMovieUserController(dbAddMovieUser).handle
    );
    router.post(
        '/movie/remove',
        new RemoveMovieUserController(dbRemoveMovieUser).handle
    );
    router.post(
        '/movie/search',
        new SearchMovieController(dbSearchMovie).handle
    );
    router.post(
        '/movie/imdbId',
        new FindByImdbIdMovieController(dbFindByImdbIdMovie).handle
    );
};
