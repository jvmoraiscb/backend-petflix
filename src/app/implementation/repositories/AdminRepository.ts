import { MovieType, User } from '@prisma/client';
import { IAdminRepository } from '../../../repositories';
import { database } from '../../config/database';
import { readFile, writeFile } from 'jsonfile';
import path from 'path';

const serverConfigPath = path.resolve(
    __dirname,
    '../../config/serverConfig.json'
);

class AdminRepository implements IAdminRepository {
    async addWatched(imdbId: string): Promise<void> {
        await database.movie.update({
            where: { imdbId },
            data: {
                movieType: MovieType.WATCHED
            }
        });
    }

    async removeWatched(imdbId: string): Promise<void> {
        await database.movie.update({
            where: { imdbId },
            data: {
                movieType: MovieType.SUGGESTED
            }
        });
    }

    async getAllUsers(): Promise<User[]> {
        return database.user.findMany({
            include: {
                evaluations: true
            }
        });
    }

    async deleteUser(userId: string): Promise<void> {
        await database.user.delete({
            where: {
                id: userId
            }
        });
    }

    async registerToggle(): Promise<void> {
        const serverConfig = await readFile(serverConfigPath);
        serverConfig.registerIsOn = !serverConfig.registerIsOn;
        await writeFile(serverConfigPath, serverConfig);
    }

    async registerGet(): Promise<boolean> {
        const serverConfig = await readFile(serverConfigPath);
        return serverConfig.registerIsOn;
    }
}

export { AdminRepository };
