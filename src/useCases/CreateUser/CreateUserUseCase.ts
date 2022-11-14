import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { CreateUserDTO } from './CreateUserDTO'

class CreateUserUseCase {
    private usersRepository!: IUsersRepository

    constructor(props: CreateUserUseCase) {
        Object.assign(this, props)
    }

    async execute(data: CreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(
            data.email
        )

        if (userAlreadyExists == undefined) {
            throw new Error('Email already exists.')
        }

        const user = new User(data)

        await this.usersRepository.createUser(user)
    }
}

export { CreateUserUseCase }
