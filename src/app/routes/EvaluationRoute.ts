import { Router } from 'express';
import {
    CreateEvaluation,
    DeleteEvaluation,
    GetEvaluation,
    UpdateEvaluation
} from '../../useCases';
import { CreateEvaluationController } from '../controllers/evaluation/CreateEvaluationController';
import { DeleteEvaluationController } from '../controllers/evaluation/DeleteEvaluationController';
import { GetEvaluationController } from '../controllers/evaluation/GetEvaluationController';
import { UpdateEvaluationController } from '../controllers/evaluation/UpdateEvaluationController';
import {
    EvaluationRepository,
    IdGenerator,
    MovieRepository
} from '../implementation';

import { isAuthMiddleware } from '../middlewares/isAuth';

const evaluationRepository = new EvaluationRepository();
const movieRepository = new MovieRepository();
const idGenerator = new IdGenerator();

const getEvaluation = new GetEvaluation(evaluationRepository);
const createEvaluation = new CreateEvaluation(
    evaluationRepository,
    movieRepository,
    idGenerator
);
const updateEvaluation = new UpdateEvaluation(evaluationRepository);
const deleteEvaluation = new DeleteEvaluation(evaluationRepository);

export const EvaluationRoute = (router: Router) => {
    router.get(
        '/evaluation',
        isAuthMiddleware,
        new GetEvaluationController(getEvaluation).handle
    );

    router.post(
        '/evaluation',
        isAuthMiddleware,
        new CreateEvaluationController(createEvaluation).handle
    );

    router.put(
        '/evaluation',
        isAuthMiddleware,
        new UpdateEvaluationController(updateEvaluation).handle
    );

    router.delete(
        '/evaluation',
        isAuthMiddleware,
        new DeleteEvaluationController(deleteEvaluation).handle
    );
};
