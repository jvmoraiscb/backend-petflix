import { Evaluation } from '@prisma/client';

interface IEvaluationRepository {
    create(
        evaluation: Omit<Evaluation, 'createdAt' | 'updatedAt'>
    ): Promise<Evaluation>;
    update(
        evaluation: Omit<Evaluation, 'createdAt' | 'updatedAt' | 'imdbId'>
    ): Promise<Evaluation>;
    userAlreadyEvaluatedMovie(userId: string, imdbId: string): Promise<boolean>;
    userEvaluatedById(id: string, userId: string): Promise<boolean>;
    delete(evaluationId: string): Promise<void>;
}

export { IEvaluationRepository };
