import { User } from '../../../entities';
import { IPasswordEncrypter, ITokenGenerator } from '../../../providers';
import { IUsersRepository } from '../../../repositories';
import { TokenUserValidation } from '../../../validations';

class DbEditUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(data: {
        token: string;
        email?: string;
        password?: string;
        name?: string;
        profilePic?: string;
    }): Promise<User> {
        await TokenUserValidation(data);
        let { token, email, password, name, profilePic } = data;

        const id = await this.tokenGenerator.verifyToken(token);
        if (id === null) {
            throw new Error('Invalid token!');
        }
        if (password !== undefined) {
            password = await this.passwordEncrypter.encryptPassword(password);
        }
        if (email !== undefined) {
            const userAlreadyExists = await this.usersRepository.findByEmail(
                email
            );
            if (userAlreadyExists !== null) {
                throw new Error('Email already exists.');
            }
        }

        return await this.usersRepository.edit(
            id,
            email,
            password,
            name,
            profilePic
        );
    }
}

export { DbEditUser };
