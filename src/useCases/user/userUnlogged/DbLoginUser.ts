import { IPasswordEncrypter, ITokenGenerator } from '../../../providers';
import { IUsersRepository } from '../../../repositories';
import { FindByEmailUserValidation } from '../../../validations';

class DbLoginUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(data: {
        email: string;
        password: string;
    }): Promise<string | null> {
        const { email, password } = data;
        await FindByEmailUserValidation(data);
        const user = await this.usersRepository.findByEmail(email);
        if (user === null) {
            throw new Error('Invalid email or password!');
        }
        const verifiedPassword = await this.passwordEncrypter.verifyPassword(
            password,
            user.password
        );
        if (!verifiedPassword) {
            throw new Error('Invalid email or password!');
        }

        return await this.tokenGenerator.createToken(user.id);
    }
}

export { DbLoginUser };
