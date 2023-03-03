import { IUserRepository } from '../../repositories';

class DeleteUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<void> {
        await this.userRepository.delete(userId);
    }
}

export { DeleteUser };
