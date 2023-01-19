import { Router } from 'express';
import {
    CreateEvaluation,
    DeleteEvaluation,
    FindByIdEvaluation,
    GetAllEvaluations
} from '../../useCases';
import {
    CreateEvaluationUserController,
    DeleteEvaluationUserController,
    FindByIdEvaluationController,
    GetAllEvaluationsController
} from '../controllers';
import {
    EvaluationsRepository,
    IdGenerator,
    MoviesRepository,
    TokenGenerator,
    UsersRepository
} from '../implementation';

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

const usersRepository = new UsersRepository();
const evaluationsRepository = new EvaluationsRepository();
const moviesRepository = new MoviesRepository();

const dbGetAllEvaluations = new GetAllEvaluations(evaluationsRepository);
const dbCreateEvaluation = new CreateEvaluation(
    usersRepository,
    moviesRepository,
    evaluationsRepository,
    tokenGenerator,
    idGenerator
);
const dbDeleteEvaluation = new DeleteEvaluation(
    usersRepository,
    evaluationsRepository,
    tokenGenerator
);
const dbFindByIdEvaluation = new FindByIdEvaluation(evaluationsRepository);

export const EvaluationRoutes = (router: Router) => {
    router.get(
        '/evaluation',
        new GetAllEvaluationsController(dbGetAllEvaluations).handle
    );
    router.post(
        '/evaluation',
        new FindByIdEvaluationController(dbFindByIdEvaluation).handle
    );
    router.post(
        '/evaluation/create',
        new CreateEvaluationUserController(dbCreateEvaluation).handle
    );
    router.post(
        '/evaluation/delete',
        new DeleteEvaluationUserController(dbDeleteEvaluation).handle
    );
};
