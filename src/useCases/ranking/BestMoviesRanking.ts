import { IRankingRepository, BestMoviesDTO } from '../../repositories';

class BestMoviesRanking {
    constructor(private rankingRepository: IRankingRepository) {}

    async execute(): Promise<BestMoviesDTO[]> {
        return await this.rankingRepository.bestMovies();
    }
}

export { BestMoviesRanking };
