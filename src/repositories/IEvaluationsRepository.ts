import { Evaluation } from '../entities';

interface IEvaluationsRepository {
    create(
        evaluationId: string,
        rating: number,
        comment: string,
        userId: string,
        movieId: string
    ): Promise<Evaluation | null>;
    delete(evaluationId: string): Promise<void>;
    findById(evaluationId: string): Promise<Evaluation | null>;
    getAll(): Promise<Evaluation[]>;
}

export { IEvaluationsRepository };
