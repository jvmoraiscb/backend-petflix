import { object, string } from 'yup';
import { IEvaluationRepository } from '../../repositories';

let querySchema = object({
    id: string().required().min(1)
});

class DeleteEvaluation {
    constructor(private evaluationRepository: IEvaluationRepository) {}

    async execute(userId: string, query: any): Promise<void> {
        query = await querySchema.validate(query);
        const { id } = query;

        if (!id) {
            throw new Error('Invalid request.');
        }

        if (await this.evaluationRepository.userEvaluatedById(id, userId)) {
            throw new Error('evaluate does not exists');
        }

        await this.evaluationRepository.delete(id);
    }
}

export { DeleteEvaluation };
