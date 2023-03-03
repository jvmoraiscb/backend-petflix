import { object, string } from 'yup';
import { IEvaluationRepository } from '../../repositories';

let bodySchema = object({
    id: string().required()
});

class DeleteEvaluation {
    constructor(private evaluationRepository: IEvaluationRepository) {}

    async execute(userId: string, body: any): Promise<void> {
        body = await bodySchema.validate(body);
        const { id } = body;

        if (await this.evaluationRepository.userEvaluatedById(id, userId)) {
            throw new Error('evaluate does not exists');
        }

        if (!id) {
            throw new Error('Invalid request.');
        }

        await this.evaluationRepository.delete(id);
    }
}

export { DeleteEvaluation };
