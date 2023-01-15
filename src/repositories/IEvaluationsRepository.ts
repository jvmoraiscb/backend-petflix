import { Evaluation } from '../entities';

interface IEvaluationsRepository {
    create(
        evaluationId: string,
        rating: number,
        comment: string,
        userId: string,
        movieId: string
    ): Promise<Evaluation>;
    delete(evaluationId: string): Promise<void>;
    findById(evaluationId: string): Promise<Evaluation | null>;
}

export { IEvaluationsRepository };
