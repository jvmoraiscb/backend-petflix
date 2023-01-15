import { User } from '../../../entities';
import { IIdGenerator, IPasswordEncrypter } from '../../../providers';
import { IUsersRepository } from '../../../repositories';
import { CreateUserValidation } from '../../../validations';

class DbCreateUser {
    constructor(
        private usersRepository: IUsersRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private idGenerator: IIdGenerator
    ) {}

    async execute(data: {
        email: string;
        password: string;
        name: string;
        profilePic: string;
    }): Promise<User> {
        await CreateUserValidation(data);
        let { email, password, name, profilePic } = data;
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists !== null) {
            throw new Error('Email already exists.');
        }
        password = await this.passwordEncrypter.encryptPassword(password);

        /////////////////////////////////////////////////////////////////////////////////////
        // existe uma chance infinitamente pequena de se gerar um id não único... mas existe!
        let id: string;
        let idAlreadyExists: User | null;
        do {
            id = await this.idGenerator.createId();
            idAlreadyExists = await this.usersRepository.findById(id);
        } while (idAlreadyExists !== null);
        /////////////////////////////////////////////////////////////////////////////////////

        return await this.usersRepository.create(
            id,
            email,
            password,
            name,
            profilePic
        );
    }
}

export { DbCreateUser };
