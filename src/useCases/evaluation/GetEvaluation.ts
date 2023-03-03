import { Evaluation } from '@prisma/client';
import { IEvaluationRepository } from '../../repositories';

class GetEvaluation {
    constructor(private evaluationRepository: IEvaluationRepository) {}

    async execute(userId: string): Promise<Evaluation[]> {
        return await this.evaluationRepository.getAll(userId);
    }
}

export { GetEvaluation };
