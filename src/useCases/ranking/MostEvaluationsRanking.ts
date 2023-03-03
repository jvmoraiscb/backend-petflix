import { IRankingRepository, MostEvaluationsDTO } from '../../repositories';

class MostEvaluationsRanking {
    constructor(private rankingRepository: IRankingRepository) {}

    async execute(): Promise<MostEvaluationsDTO[]> {
        return await this.rankingRepository.mostEvaluations();
    }
}

export { MostEvaluationsRanking };
