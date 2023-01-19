import { IMoviesRepository } from '../../repositories';

class GetAllMovies {
    constructor(private moviesRepository: IMoviesRepository) {}

    async execute() {
        return await this.moviesRepository.getAll();
    }
}

export { GetAllMovies };
