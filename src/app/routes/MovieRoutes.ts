import { Router } from 'express'
import { FindByImdbIdMovie, SearchMovie } from '../../useCases'
import {
    SearchMovieController,
    FindByImdbIdMovieController,
} from '../controllers'
import { ImdbRepository } from '../implementation/repositories/ImdbRepository'

const imdbRepository = new ImdbRepository()
const dbSearchMovie = new SearchMovie(imdbRepository)
const dbFindByImdbIdMovie = new FindByImdbIdMovie(imdbRepository)

export const MovieRoutes = (router: Router) => {
    router.post(
        '/movie/search',
        new SearchMovieController(dbSearchMovie).handle
    )
    router.post(
        '/movie/imdbId',
        new FindByImdbIdMovieController(dbFindByImdbIdMovie).handle
    )
}
