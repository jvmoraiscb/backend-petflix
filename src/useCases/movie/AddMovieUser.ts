import { authorizationUser } from '../../helpers';
import { IIdGenerator, ITokenGenerator } from '../../providers';
import {
    IImdbRepository,
    IMoviesRepositoty,
    IUsersRepository
} from '../../repositories';

class AddMovieUser {
    constructor(
        private usersRepository: IUsersRepository,
        private moviesRepository: IMoviesRepositoty,
        private imdbRepository: IImdbRepository,
        private tokenGenerator: ITokenGenerator,
        private idGenerator: IIdGenerator
    ) {}

    async execute(
        headers: {
            authorization?: string;
        },
        body: {
            imdbId: string;
        }
    ): Promise<void> {
        await this.bodyValidator(body);
        const userId = await authorizationUser(
            headers,
            this.tokenGenerator,
            this.usersRepository
        );
        const { imdbId } = body;

        let movie = await this.moviesRepository.findByImdbId(imdbId);
        if (movie === null) {
            const imdbMovie = await this.imdbRepository.findById(imdbId);
            if (imdbMovie === null) {
                throw new Error('invalid imdbId');
            }
            const {
                title,
                type,
                runtime,
                year,
                genre,
                plot,
                poster,
                director,
                writer,
                actors
            } = imdbMovie;

            const id = await this.idGenerator.createId();

            movie = await this.moviesRepository.create(
                id,
                imdbId,
                title,
                type,
                runtime,
                year,
                genre,
                plot,
                poster,
                director,
                writer,
                actors
            );
        }
        if (movie === null) {
            throw new Error('movie not found');
        }
        await this.usersRepository.addMovie(userId, movie.id);
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.imdbId === undefined) {
            throw new Error('invalid request');
        }
    }
}

export { AddMovieUser };
