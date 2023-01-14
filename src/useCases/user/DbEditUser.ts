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

        if (newPassword !== undefined) {
            newPassword = await this.passwordHelper.hashPassword(newPassword);
        }

        const email = await this.tokenHelper.verifyToken(token);
        if (!email) {
            throw new Error('Invalid token!');
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
