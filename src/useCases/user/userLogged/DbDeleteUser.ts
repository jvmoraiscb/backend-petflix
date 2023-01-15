import { ITokenGenerator } from '../../../providers';
import { IUsersRepository } from '../../../repositories';
import { TokenUserValidation } from '../../../validations';

class DbDeleteUser {
    constructor(
        private usersRepository: IUsersRepository,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(data: { token: string }): Promise<void> {
        await TokenUserValidation(data);
        const { token } = data;
        const id = await this.tokenGenerator.verifyToken(token);

        if (!id) {
            throw new Error('Invalid token!');
        }
        const userExists = await this.usersRepository.findById(id);
        if (userExists === null) {
            throw new Error('Invalid token!');
        }
        await this.usersRepository.delete(id);
    }
}

export { DbDeleteUser };
