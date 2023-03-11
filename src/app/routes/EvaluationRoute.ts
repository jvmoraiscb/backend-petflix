import { Router } from 'express';
import {
    CreateEvaluation,
    DeleteEvaluation,
    UpdateEvaluation
} from '../../useCases';
import {
    CreateEvaluationController,
    DeleteEvaluationController,
    UpdateEvaluationController
} from '../controllers';
import {
    EvaluationRepository,
    IdGenerator,
    MovieRepository
} from '../implementation';
import { isAuthMiddleware } from '../middlewares';

const evaluationRepository = new EvaluationRepository();
const movieRepository = new MovieRepository();
const idGenerator = new IdGenerator();

const createEvaluation = new CreateEvaluation(
    evaluationRepository,
    movieRepository,
    idGenerator
);
const updateEvaluation = new UpdateEvaluation(evaluationRepository);
const deleteEvaluation = new DeleteEvaluation(evaluationRepository);

export const EvaluationRoute = (router: Router) => {
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
