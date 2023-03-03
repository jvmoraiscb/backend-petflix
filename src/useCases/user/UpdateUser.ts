import { User } from '@prisma/client';
import { number, object, string } from 'yup';
import { IPasswordEncrypter } from '../../providers';
import { IUserRepository } from '../../repositories';

const bodySchema = object({
    email: string().email().notRequired(),
    password: string().notRequired().min(1),
    name: string().notRequired().min(1),
    profilePic: number().integer().positive().notRequired()
});

class UpdateUser {
    constructor(
        private userRepository: IUserRepository,
        private passwordEncrypter: IPasswordEncrypter
    ) {}

    async execute(userId: string, body: any): Promise<User> {
        body = await bodySchema.validate(body);
        let { email, password, name, profilePic } = body;
        if (password !== undefined) {
            password = await this.passwordEncrypter.encryptPassword(password);
        }
        if (email !== undefined) {
            const userAlreadyExists = await this.userRepository.findByEmail(
                email
            );
            if (userAlreadyExists !== null) {
                throw new Error('Email already exists.');
            }
        }

        return await this.userRepository.update({
            id: userId,
            name,
            email,
            password,
            profilePic
        });
    }
}

export { UpdateUser };
