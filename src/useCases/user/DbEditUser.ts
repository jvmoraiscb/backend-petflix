import { User } from '../../entities';
import { IPasswordHelper, ITokenHelper } from '../../helpers';
import { IUsersRepository } from '../../repositories';
import { TokenUserValidation } from '../../validations';

class DbEditUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordHelper: IPasswordHelper,
        private tokenHelper: ITokenHelper
    ) {}

    async execute(data: {
        token: string;
        email?: string;
        password?: string;
        name?: string;
        profilePic?: string;
    }): Promise<User> {
        await TokenUserValidation(data);
        let {
            token,
            email: newEmail,
            password: newPassword,
            name: newName,
            profilePic: newProfilePic
        } = data;
        
        const email = await this.tokenHelper.verifyToken(token);
        if (!email) {
            throw new Error('Invalid token!');
        }
        if (newPassword !== undefined) {
            newPassword = await this.passwordHelper.hashPassword(newPassword);
        }
        if (newEmail !== undefined) {
            const userAlreadyExists = await this.usersRepository.findByEmail(
                newEmail
            );
            if (userAlreadyExists !== null) {
                throw new Error('Email already exists.');
            }
        }

        return await this.usersRepository.editUser(
            email,
            newEmail,
            newPassword,
            newName,
            newProfilePic
        );
    }
}

export { DbEditUser };
