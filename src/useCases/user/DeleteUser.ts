import { authorizationUser } from '../../helpers'
import { ITokenGenerator } from '../../providers'
import { IUsersRepository } from '../../repositories'

class DeleteUser {
    constructor(
        private usersRepository: IUsersRepository,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(headers: { authorization?: string }): Promise<void> {
        const id = await authorizationUser(
            headers,
            this.tokenGenerator,
            this.usersRepository
        )
        await this.usersRepository.delete(id)
    }
}

export { DeleteUser }
