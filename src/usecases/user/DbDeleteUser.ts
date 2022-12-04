import { IUsersRepository } from '../../repositories';
import { DeleteUserValidation } from '../../validations';

class DbDeleteUser {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute(data: { email: string }): Promise<void> {
        const { email } = data;
        await DeleteUserValidation(data);
        const userExists = await this.usersRepository.findByEmail(email);
        if (userExists === null) {
            throw new Error('User does not exists.');
        }
        await this.usersRepository.deleteUser(email);
    }
}

export { DbDeleteUser };
