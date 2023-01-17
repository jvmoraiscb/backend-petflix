import { IPasswordEncrypter, ITokenGenerator } from '../../providers'
import { IUsersRepository } from '../../repositories'

class LoginUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(body: {
        email: string
        password: string
    }): Promise<string | null> {
        await this.bodyValidator(body)
        const { email, password } = body
        const user = await this.usersRepository.findByEmail(email)
        if (user === null) {
            throw new Error('invalid email or password')
        }
        const verifiedPassword = await this.passwordEncrypter.verifyPassword(
            password,
            user.password
        )
        if (!verifiedPassword) {
            throw new Error('invalid email or password')
        }

        return await this.tokenGenerator.createToken(user.id)
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.email === undefined || body.password === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { LoginUser }
