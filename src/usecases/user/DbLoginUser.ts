import { User } from '@prisma/client';
import { IUsersRepository } from '../../repositories';
import { IPasswordHelper, ITokenHelper } from '../../helpers';
import { FindByEmailUserValidation } from '../../validations';

class DbLoginUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordHelper: IPasswordHelper,
        private tokenHelper: ITokenHelper
    ) {}

    async execute(data: {
        email: string;
        password: string;
    }): Promise<string | null> {
        const { email, password } = data;
        await FindByEmailUserValidation(data);
        const userExists = await this.usersRepository.findByEmail(email);
        if (userExists === null) {
            throw new Error('Invalid email or password!');
        }
        const verifiedPassword = await this.passwordHelper.verifyPassword(
            password,
            userExists.password
        );
        if (!verifiedPassword) {
            throw new Error('Invalid email or password!');
        }

        return await this.tokenHelper.createToken(email);
    }
}

export { DbLoginUser };
