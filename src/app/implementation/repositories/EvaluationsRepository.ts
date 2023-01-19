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
        const evaluation = await database.prismaEvaluation.create({
            data: {
                id: evaluationId,
                rating: rating,
                comment: comment,
                userId: userId,
                movieId: movieId
            },
            include: {
                User: true,
                Movie: true
            }
        });
        return evaluation;
    }

    async findById(evaluationId: string): Promise<Evaluation | null> {
        const evaluation = await database.prismaEvaluation.findUnique({
            where: {
                id: evaluationId
            },
            include: {
                Movie: true,
                User: true
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
}

export { EvaluationsRepository };
