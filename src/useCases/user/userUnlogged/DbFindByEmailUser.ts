import { User } from "../../../entities";
import { IUsersRepository } from "../../../repositories";
import { FindByEmailUserValidation } from "../../../validations";

class DbFindByEmailUser {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute(data: { email: string }): Promise<User | null> {
        await FindByEmailUserValidation(data);
        const { email } = data;
        const userExists = await this.usersRepository.findByEmail(email);
        if (userExists === null) {
            throw new Error('User does not exists.');
        }

        return userExists;
    }
}

export { DbFindByEmailUser };
