import { authorizationUser } from '../../helpers';
import { IIdGenerator, ITokenGenerator } from '../../providers';
import {
    IEvaluationsRepository,
    IMoviesRepositoty,
    IUsersRepository
} from '../../repositories';

class CreateEvaluation {
    constructor(
        private usersRepository: IUsersRepository,
        private moviesRepository: IMoviesRepositoty,
        private evaluationsRepository: IEvaluationsRepository,
        private tokenGenerator: ITokenGenerator,
        private idGenerator: IIdGenerator
    ) {}

    async execute(
        headers: {
            authorization?: string;
        },
        body: {
            movieId: string;
            rating: number;
            comment: string;
        }
    ): Promise<void> {
        await this.bodyValidator(body);
        const userId = await authorizationUser(
            headers,
            this.tokenGenerator,
            this.usersRepository
        );
        const { movieId, rating, comment } = body;

        const movie = await this.moviesRepository.findById(movieId);
        if (movie === null) {
            throw new Error('invalid movieId');
        }

        const id = await this.idGenerator.createId();
        const evaluation = await this.evaluationsRepository.create(
            id,
            rating,
            comment,
            userId,
            movieId
        );
        if (evaluation === null) {
            throw new Error();
        }

        await this.usersRepository.addEvaluation(userId, id);
    }

    private async bodyValidator(body: any): Promise<void> {
        if (
            body.movieId === undefined ||
            body.rating === undefined ||
            body.comment === undefined
        ) {
            throw new Error('invalid request');
        }
    }
}

export { CreateEvaluation };
