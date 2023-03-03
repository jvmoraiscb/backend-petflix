import { IAdminRepository } from '../../repositories';

class RegisterToggleAdmin {
    constructor(private adminRepository: IAdminRepository) {}
    async execute(): Promise<void> {
        await this.adminRepository.registerToggle();
    }
}

export { RegisterToggleAdmin };
