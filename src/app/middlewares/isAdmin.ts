import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../implementation';

const userRepository = new UserRepository();

const isAdminMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<any> => {
    const user = await userRepository.findById(request.userId);

    if (!user) {
        return response.status(401).json({ error: 'Permission denied.' });
    }

    if (user.role === Role.USER) {
        return response.status(401).json({ error: 'Permission denied.' });
    }
    next();
};

export { isAdminMiddleware };
