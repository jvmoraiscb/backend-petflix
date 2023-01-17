import { User } from '../../entities'
import { IIdGenerator, IPasswordEncrypter } from '../../providers'
import { IUsersRepository } from '../../repositories'

class CreateUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private idGenerator: IIdGenerator
    ) {}

    async execute(body: {
        email: string
        password: string
        name: string
        profilePic: string
    }): Promise<User> {
        await this.bodyValidator(body)
        let { email, password, name, profilePic } = body
        const userAlreadyExists = await this.usersRepository.findByEmail(email)
        if (userAlreadyExists !== null) {
            throw new Error('email already exists')
        }
        password = await this.passwordEncrypter.encryptPassword(password)

        const id = await this.idGenerator.createId()

        return await this.usersRepository.create(
            id,
            email,
            password,
            name,
            profilePic
        )
    }
    private async bodyValidator(body: any): Promise<void> {
        if (
            body.email === undefined ||
            body.password === undefined ||
            body.name === undefined ||
            body.profilePic === undefined
        ) {
            throw new Error('invalid request')
        }
    }
}

export { CreateUser }
