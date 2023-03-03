import { NextFunction, Request, Response } from 'express';
import { tokenToId } from '../../helpers';

const isAuthMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<any> => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ error: 'Permission denied.' });
    }
    const id = await tokenToId(authorization);
    if (!id) {
        return response.status(401).json({ error: 'Permission denied.' });
    }
    request.userId = id;
    next();
};

export { isAuthMiddleware };
