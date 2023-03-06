import { Evaluation } from '@prisma/client';
import { number, object, string } from 'yup';
import { movieType } from '../../app/config/movieType';
import { IEvaluationRepository } from '../../repositories';

let bodySchema = object({
    rating: number().max(5).min(0).integer().notRequired(),
    comment: string().min(1).notRequired(),
    stream: string().notRequired().uppercase().oneOf(movieType)
});

let querySchema = object({
    id: string().required()
});

class UpdateEvaluation {
    constructor(private evaluationRepository: IEvaluationRepository) {}

    async execute(userId: string, query: any, body: any): Promise<Evaluation> {
        query = await querySchema.validate(query);
        body = await bodySchema.validate(body);

        const { id } = query;
        const { rating, comment, stream } = body;

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
