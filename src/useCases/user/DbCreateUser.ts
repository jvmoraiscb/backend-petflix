import { IUsersRepository } from '../../repositories';
import { CreateUserValidation } from '../../validations';
import { IPasswordHelper } from '../../helpers';
import { User } from '../../entities';

class DbCreateUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordHelper: IPasswordHelper
    ) {}

    async execute(data: {
        email: string;
        password: string;
        name: string;
        profilePic: string;
    }): Promise<User> {
        await CreateUserValidation(data);
        let { email, password, name, profilePic } = data;
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists !== null) {
            throw new Error('Email already exists.');
        }
        password = await this.passwordHelper.hashPassword(password);
        return await this.usersRepository.createUser(
            email,
            password,
            name,
            profilePic
        );
    }
}

export { DbCreateUser };
