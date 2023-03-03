import { User } from '@prisma/client';
import { IAdminRepository } from '../../repositories';

class GetUsersAdmin {
    constructor(private adminRepository: IAdminRepository) {}
    async execute(): Promise<User[]> {
        return await this.adminRepository.getAllUsers();
    }
}

export { GetUsersAdmin };
