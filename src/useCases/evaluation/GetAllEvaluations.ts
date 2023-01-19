import { IEvaluationsRepository } from '../../repositories';

class GetAllEvaluations {
    constructor(private evaluationsRepository: IEvaluationsRepository) {}

    async execute() {
        return await this.evaluationsRepository.getAll();
    }
}

export { GetAllEvaluations };
