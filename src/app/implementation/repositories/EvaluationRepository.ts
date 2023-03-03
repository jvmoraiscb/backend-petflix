import { Evaluation } from '@prisma/client';
import { IEvaluationRepository } from '../../../repositories';
import { database } from '../../config/database';

class EvaluationRepository implements IEvaluationRepository {
    async create(
        evaluation: Omit<Evaluation, 'createdAt' | 'updatedAt'>
    ): Promise<Evaluation> {
        return await database.evaluation.create({
            data: evaluation
        });
    }

    async getAll(userId: string): Promise<Evaluation[]> {
        return await database.evaluation.findMany({
            where: {
                userId
            }
        });
    }

    async update(
        evaluation: Omit<Evaluation, 'createdAt' | 'updatedAt'>
    ): Promise<Evaluation> {
        return await database.evaluation.update({
            where: {
                id: evaluation.id
            },
            data: evaluation
        });
    }

    async userAlreadyEvaluatedMovie(
        userId: string,
        imdbId: string
    ): Promise<boolean> {
        const evaluated = await database.evaluation.findMany({
            where: {
                userId,
                imdbId
            }
        });
        if (!evaluated.length) {
            return false;
        }
        return true;
    }

    async userEvaluatedById(id: string, userId: string): Promise<boolean> {
        const evaluated = await database.evaluation.findMany({
            where: {
                userId,
                id
            }
        });
        if (!evaluated.length) {
            return true;
        }
        return false;
    }

    async delete(evaluationId: string): Promise<void> {
        await database.evaluation.delete({
            where: {
                id: evaluationId
            }
        });
    }
}

export { EvaluationRepository };
