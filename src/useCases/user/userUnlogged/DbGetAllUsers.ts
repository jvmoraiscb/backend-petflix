import { IUsersRepository } from "../../../repositories";

class DbGetAllUsers {
    constructor(private usersRepository: IUsersRepository) {}

    async execute() {
        return await this.usersRepository.getAll();
    }
}

export { DbGetAllUsers };