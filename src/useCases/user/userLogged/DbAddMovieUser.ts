import { ITokenGenerator } from '../../../providers';
import { IMoviesRepositoty, IUsersRepository } from '../../../repositories';

class DbAddMovieUser {
    constructor(
        private usersRepository: IUsersRepository,
        private moviesRepository: IMoviesRepositoty,
        private tokenGenerator: ITokenGenerator
    ) {}
}

export { DbAddMovieUser };
