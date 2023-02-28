import { NextFunction, Request, Response } from 'express';
import { authorizationUser } from '../../helpers';
import { TokenGenerator, UsersRepository } from '../implementation';

const tokenGenerator = new TokenGenerator();
const usersRepository = new UsersRepository();

const isAuthMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<any> => {
    try {
        await authorizationUser(
            request.headers,
            tokenGenerator,
            usersRepository
        );
        next();
    } catch (err: any) {
        return response.status(501).json({
            message: err.message,
            status: 501
        });
    }
};

export { isAuthMiddleware };
