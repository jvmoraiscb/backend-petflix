import { authorizationUser } from '../../helpers'
import { IIdGenerator, ITokenGenerator } from '../../providers'
import {
    IEvaluationsRepository,
    IMoviesRepositoty,
    IUsersRepository,
} from '../../repositories'

class DeleteEvaluation {
    constructor(
        private usersRepository: IUsersRepository,
        private moviesRepository: IMoviesRepositoty,
        private evaluationsRepository: IEvaluationsRepository,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(
        headers: {
            authorization?: string
        },
        body: {
            id: string
        }
    ): Promise<void> {
        await this.bodyValidator(body)
        const userId = await authorizationUser(
            headers,
            this.tokenGenerator,
            this.usersRepository
        )
        const { id } = body

        const evaluation = await this.evaluationsRepository.findById(id)
        if (evaluation === null) {
            throw new Error('invalid id')
        }

        const { movieId } = evaluation

        await this.moviesRepository.removeEvaluation(movieId, id)
        await this.usersRepository.removeEvaluation(userId, id)
        await this.evaluationsRepository.delete(id)
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.id === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { DeleteEvaluation }
