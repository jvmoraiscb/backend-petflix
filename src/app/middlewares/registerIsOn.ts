import { NextFunction, Request, Response } from 'express';
import { readFile } from 'jsonfile';
import path from 'path';

const serverConfigPath = path.resolve(__dirname, '../config/serverConfig.json');

const registerIsOnMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<any> => {
    const serverConfig = await readFile(serverConfigPath);
    if (!serverConfig.registerIsOn) {
        return response.json({ message: 'server is not able to register' });
    }
    next();
};

export { registerIsOnMiddleware };
