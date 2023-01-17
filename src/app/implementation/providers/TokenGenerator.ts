import jwt, { JwtPayload } from 'jsonwebtoken';
import { ITokenGenerator } from '../../../providers';

class TokenGenerator implements ITokenGenerator {
    async createToken(email: string): Promise<string> {
        const token = jwt.sign({ email: email }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h'
        });

        return token;
    }

    async verifyToken(token: string): Promise<string | null> {
        try {
            const { email } = jwt.verify(
                token,
                process.env.JWT_PASS ?? ''
            ) as JwtPayload;

            return email;
        } catch (err: any) {
            return null;
        }
    }
}

export { TokenGenerator };
