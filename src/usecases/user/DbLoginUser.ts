import { User } from '@prisma/client';
import { IUsersRepository } from '../../repositories';
import { FindByEmailUserValidation } from '../../validations';

class DbLoginUser {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute(data: { email: string }): Promise<User | null> {
        const { email } = data;
        await FindByEmailUserValidation(data);
        const userExists = await this.usersRepository.findByEmail(email);
        if (userExists === null) {
            throw new Error('User does not exists.');
        }
        return await this.usersRepository.findByEmail(email);
    }
}

export { DbLoginUser };
