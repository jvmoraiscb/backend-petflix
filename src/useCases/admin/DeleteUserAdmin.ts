import { object, string } from 'yup';
import { IAdminRepository, IUserRepository } from '../../repositories';

const bodySchema = object({
    id: string().required().min(1)
});

class DeleteUserAdmin {
    constructor(
        private adminRepository: IAdminRepository,
        private userRepository: IUserRepository
    ) {}
    async execute(body: any): Promise<void> {
        body = await bodySchema.validate(body);
        const { id } = body;

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('user does not exists');
        }

        await this.adminRepository.deleteUser(id);
    }
}

export { DeleteUserAdmin };
