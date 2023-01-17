import { User } from '../../entities'
import { IUsersRepository } from '../../repositories'

class FindByIdUser {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute(body: { id: string }): Promise<User | null> {
        await this.bodyValidator(body)
        const { id } = body
        const userExists = await this.usersRepository.findById(id)
        if (userExists === null) {
            throw new Error('user does not exists')
        }

        return userExists
    }
    private async bodyValidator(body: any): Promise<void> {
        if (body.id === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { FindByIdUser }
