import { ITokenHelper } from '../helpers';
import jwt, { JwtPayload } from 'jsonwebtoken';

class TokenHelper implements ITokenHelper {
    async createToken(email: string): Promise<string> {
        const token = jwt.sign({ email: email }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h'
        });

        return token;
    }

    async verifyToken(token: string): Promise<string> {
        const { email } = jwt.verify(
            token,
            process.env.JWT_PASS ?? ''
        ) as JwtPayload;

        return email;
    }
}

export { TokenHelper };
