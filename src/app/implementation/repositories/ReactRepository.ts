import { IReactRepository } from '../../../repositories';
import { database } from '../../config/database';

class ReactRepository implements IReactRepository {
    async like(userId: string, imdbId: string): Promise<void> {
        await database.user.update({
            where: {
                id: userId
            },
            data: {
                likes: {
                    connect: {
                        imdbId
                    }
                }
            }
        });
    }
    async dislike(userId: string, imdbId: string): Promise<void> {
        await database.user.update({
            where: {
                id: userId
            },
            data: {
                dislikes: {
                    connect: {
                        imdbId
                    }
                }
            }
        });
    }
}

export { ReactRepository };
