import { Evaluation } from '@prisma/client';
import { number, object, string } from 'yup';
import { movieType } from '../../app/config/movieType';
import { IEvaluationRepository } from '../../repositories';

let bodySchema = object({
    id: string().required(),
    rating: number().max(5).min(0).integer().notRequired(),
    comment: string().min(1).notRequired(),
    stream: string().notRequired().uppercase().oneOf(movieType)
});

class UpdateEvaluation {
    constructor(private evaluationRepository: IEvaluationRepository) {}

    async execute(userId: string, body: any): Promise<Evaluation> {
        body = await bodySchema.validate(body);
        const { id, rating, comment, stream } = body;

        if (await this.evaluationRepository.userEvaluatedById(id, userId)) {
            throw new Error('evaluate does not exists');
        }

        const newEvaluation = {
            id,
            rating,
            comment,
            stream,
            userId
        };

        if (stream !== undefined) {
            newEvaluation.stream = stream.toUpperCase();
        }

        return await this.evaluationRepository.update(newEvaluation);
    }
}

export { UpdateEvaluation };
