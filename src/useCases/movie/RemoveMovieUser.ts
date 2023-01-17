import { authorizationUser } from '../../helpers'
import { ITokenGenerator } from '../../providers'
import { IMoviesRepositoty, IUsersRepository } from '../../repositories'

class RemoveMovieUser {
    constructor(
        private usersRepository: IUsersRepository,
        private moviesRepository: IMoviesRepositoty,
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

        let movie = await this.moviesRepository.findById(id)
        if (movie === null) {
            throw new Error('invalid id')
        }

        const user = await this.usersRepository.findById(userId)
        if (!user?.moviesId.includes(id)) {
            throw new Error('movie already removed')
        }
        await this.moviesRepository.removeUser(id, userId)
        await this.usersRepository.removeMovie(userId, id)

        movie = await this.moviesRepository.findById(id)
        if (
            movie?.evaluationsId.length == 0 &&
            movie?.usersId.length
        ) {
            await this.moviesRepository.delete(id)
        }
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.id === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { RemoveMovieUser }
