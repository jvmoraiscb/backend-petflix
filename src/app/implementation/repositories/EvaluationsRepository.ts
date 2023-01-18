import { Evaluation } from '../../../entities';
import { IEvaluationsRepository } from '../../../repositories';
import { database } from '../../config/database';

class EvaluationsRepository implements IEvaluationsRepository {
    async create(
        evaluationId: string,
        rating: number,
        comment: string,
        userId: string,
        movieId: string
    ): Promise<Evaluation | null> {
        await database.prismaEvaluation.create({
            data: {
                id: evaluationId,
                rating,
                comment,
                userId,
                movieId
            }
        });

        const evaluation = await database.prismaEvaluation.findUnique({
            where: {
                id: evaluationId
            },
            include: {
                user: true,
                movie: true
            }
        });

        return evaluation;
    }

    async delete(evaluationId: string): Promise<void> {
        await database.prismaEvaluation.delete({
            where: {
                id: evaluationId
            }
        });
    }

    async findById(evaluationId: string): Promise<Evaluation | null> {
        const evaluation = await database.prismaEvaluation.findUnique({
            where: {
                id: evaluationId
            }
        });

        return evaluation;
    }

    async getAll(): Promise<Evaluation[]> {
        const evaluations = await database.prismaEvaluation.findMany();

        return evaluations;
    }
}
