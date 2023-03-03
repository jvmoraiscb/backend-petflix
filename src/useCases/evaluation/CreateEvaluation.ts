import { Evaluation, MovieType } from '@prisma/client';
import { number, object, string } from 'yup';
import { IIdGenerator } from '../../providers';
import { IEvaluationRepository, IMovieRepository } from '../../repositories';
import { movieType } from '../../app/config/movieType';

let bodySchema = object({
    rating: number().required().max(5).min(0).integer(),
    comment: string().required().min(1),
    imdbId: string().required(),
    stream: string().required().uppercase().oneOf(movieType)
});

class CreateEvaluation {
    constructor(
        private evaluationRepository: IEvaluationRepository,
        private movieRepository: IMovieRepository,
        private idGenerator: IIdGenerator
    ) {}

    async execute(userId: string, body: any): Promise<Evaluation> {
        body = await bodySchema.validate(body);
        const { imdbId, rating, comment, stream } = body;

        const movieExists = await this.movieRepository.findByImdbId(imdbId);

        if (!movieExists) {
            throw new Error('movie does not exists in database');
        }

        if (movieExists.movieType === MovieType.SUGGESTED) {
            throw new Error(
                'movie does not possible to evaluate (wait for movie to be watched).'
            );
        }

        if (
            await this.evaluationRepository.userAlreadyEvaluatedMovie(
                userId,
                imdbId
            )
        ) {
            throw new Error('user already evaluated movie');
        }

        const id = await this.idGenerator.createId();
        const newEvaluation = {
            id,
            rating,
            comment,
            stream,
            userId,
            imdbId
        };

        return await this.evaluationRepository.create(newEvaluation);
    }
}

export { CreateEvaluation };
