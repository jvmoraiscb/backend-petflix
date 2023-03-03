import { IAdminRepository } from '../../repositories';

class RegisterGetAdmin {
    constructor(private adminRepository: IAdminRepository) {}
    async execute(): Promise<boolean> {
        return await this.adminRepository.registerGet();
    }
}

export { RegisterGetAdmin };
