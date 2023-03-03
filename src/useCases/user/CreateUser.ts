import { User } from '@prisma/client';
import { number, object, string } from 'yup';
import { IIdGenerator, IPasswordEncrypter } from '../../providers';
import { IUserRepository } from '../../repositories';

const bodySchema = object({
    email: string().email().required().min(1),
    password: string().required().min(1),
    name: string().required().min(1),
    profilePic: number().integer().positive().required()
});

class CreateUser {
    constructor(
        private usersRepository: IUserRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private idGenerator: IIdGenerator
    ) {}

    async execute(body: any): Promise<User> {
        body = await bodySchema.validate(body);
        let { email, password, name, profilePic } = body;

        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists !== null) {
            throw new Error('email already in use');
        }
        password = await this.passwordEncrypter.encryptPassword(password);
        const id = await this.idGenerator.createId();
        const user = await this.usersRepository.create({
            id,
            email,
            password,
            name,
            profilePic
        });
        return user;
    }
}

export { CreateUser };
