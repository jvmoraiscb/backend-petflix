import { IUsersRepository } from '../../repositories';

class DbAllUsers {
    constructor(private usersRepository: IUsersRepository) {}

    async execute() {
        return await this.usersRepository.allUsers();
    }
}

export { DbAllUsers };
