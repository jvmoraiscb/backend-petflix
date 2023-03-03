import { object, string } from 'yup';
import { IPasswordEncrypter, ITokenGenerator } from '../../providers';
import { IUserRepository } from '../../repositories';

const bodySchema = object({
    email: string().email().required(),
    password: string().required().min(1)
});

class LoginUser {
    constructor(
        private userRepository: IUserRepository,
        private passwordEncrypter: IPasswordEncrypter,
        private tokenGenerator: ITokenGenerator
    ) {}

    async execute(body: any): Promise<string> {
        body = await bodySchema.validate(body);
        const { email, password } = body;
        const user = await this.userRepository.findByEmail(email);
        if (user === null) {
            throw new Error('invalid email or password');
        }
        const verifiedPassword = await this.passwordEncrypter.verifyPassword(
            password,
            user.password
        );
        if (!verifiedPassword) {
            throw new Error('invalid email or password');
        }
        return await this.tokenGenerator.createToken(user.id);
    }
}

export { LoginUser };
