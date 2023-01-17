import { IUsersRepository } from "../../repositories"

class GetAllUsers {
    constructor(private usersRepository: IUsersRepository) {}

    async execute() {
        return await this.usersRepository.getAll()
    }
}

export { GetAllUsers }
