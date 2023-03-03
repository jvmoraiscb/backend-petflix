import { User } from '@prisma/client';
import { IUserRepository } from '../../repositories';

class GetUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<User | null> {
        return await this.userRepository.findById(userId);
    }
}

export { GetUser };
