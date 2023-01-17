import bcrypt from 'bcrypt';
import { IPasswordEncrypter } from '../../../providers';


class PasswordEncrypter implements IPasswordEncrypter {
    async encryptPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async verifyPassword(pass1: string, pass2: string): Promise<boolean> {
        return bcrypt.compare(pass1, pass2);
    }
}

export { PasswordEncrypter };
