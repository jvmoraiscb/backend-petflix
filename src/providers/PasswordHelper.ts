import { IPasswordHelper } from '../helpers';
import bcrypt from 'bcrypt';

class PasswordHelper implements IPasswordHelper {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async verifyPassword(pass1: string, pass2: string): Promise<boolean> {
        return bcrypt.compare(pass1, pass2);
    }
}

export { PasswordHelper };
