import { authorizationUser } from '../../helpers';
import { ITokenGenerator } from '../../providers';
import { IMoviesRepository, IUsersRepository } from '../../repositories';

class RemoveMovieUser {
    constructor(
        private usersRepository: IUsersRepository,
        private moviesRepository: IMoviesRepository,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(
        headers: {
            authorization?: string;
        },
        body: {
            id: string;
        }
    ): Promise<void> {
        await this.bodyValidator(body);
        const userId = await authorizationUser(
            headers,
            this.tokenGenerator,
            this.usersRepository
        );
        const { id } = body;

        let movie = await this.moviesRepository.findById(id);
        if (movie === null) {
            throw new Error('invalid id');
        }
        await this.usersRepository.removeMovie(userId, movie.id);
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.id === undefined) {
            throw new Error('invalid request');
        }
    }
}

export { RemoveMovieUser };
