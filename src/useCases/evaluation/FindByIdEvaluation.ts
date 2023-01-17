import { Evaluation } from '../../entities'
import { IEvaluationsRepository } from '../../repositories'

class FindByIdEvaluation {
    constructor(private evaluationsRepository: IEvaluationsRepository) {}

    async execute(body: { id: string }): Promise<Evaluation> {
        await this.bodyValidator(body)
        const { id } = body

        let evaluation = await this.evaluationsRepository.findById(id)
        if (evaluation === null) {
            throw new Error('invalid id')
        }

        return evaluation
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.id === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { FindByIdEvaluation }
