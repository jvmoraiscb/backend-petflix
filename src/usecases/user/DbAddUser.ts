import { User } from '@prisma/client';
import { IUsersRepository } from '../../repositories';
import { AddUserValidation } from '../../validations';
import { IPasswordHelper } from '../../helpers';

class DbAddUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordHelper: IPasswordHelper
    ) {}

    async execute(
        data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<User> {
        const { email } = data;
        await AddUserValidation(data);
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists !== null) {
            throw new Error('Email already exists.');
        }
        data.password = await this.passwordHelper.hashPassword(data.password);
        return await this.usersRepository.createUser(data);
    }
}

export { DbAddUser };
