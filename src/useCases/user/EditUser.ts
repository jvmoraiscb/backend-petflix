import { User } from '../../entities'
import { authorizationUser } from '../../helpers'
import { IPasswordEncrypter, ITokenGenerator } from '../../providers'
import { IUsersRepository } from '../../repositories'

class EditUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(
        headers: {
            authorization?: string
        },
        body: {
            email?: string
            password?: string
            name?: string
            profilePic?: string
        }
    ): Promise<User> {
        const id = await authorizationUser(
            headers,
            this.tokenGenerator,
            this.usersRepository
        )

        let { email, password, name, profilePic } = body
        if (password !== undefined) {
            password = await this.passwordEncrypter.encryptPassword(password)
        }
        if (email !== undefined) {
            const userAlreadyExists = await this.usersRepository.findByEmail(
                email
            )
            if (userAlreadyExists !== null) {
                throw new Error('email already exists')
            }
        }

        return await this.usersRepository.edit(
            id,
            email,
            password,
            name,
            profilePic
        )
    }
}

export { EditUser }
