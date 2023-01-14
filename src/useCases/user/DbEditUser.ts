import { ITokenHelper } from '../../helpers';
import { IUsersRepository } from '../../repositories';
import { TokenUserValidation } from '../../validations';

class DbEditUser {
    constructor(
        private usersRepository: IUsersRepository,
        private tokenHelper: ITokenHelper
    ) {}

    async execute(data: { token: string }): Promise<void> {
        await TokenUserValidation(data);
        const { token } = data;
        const email = await this.tokenHelper.verifyToken(token);
        if (!email) {
            throw new Error('Invalid token!');
        }
        await this.usersRepository.deleteUser(email);
    }
}

export { DbEditUser };
