import { IReactRepository } from '../../../repositories';
import { database } from '../../config/database';

class ReactRepository implements IReactRepository {
    async getLikeStatus(userId: string, imdbId: string): Promise<string> {
        const user = await database.user.findUnique({
            where: {
                id: userId
            },
            include: {
                likes: true,
                dislikes: true
            }
        });

        if (user) {
            const liked = user.likes.find((movie) => {
                return movie.imdbId === imdbId;
            });
            const disliked = user.dislikes.find((movie) => {
                return movie.imdbId === imdbId;
            });

            console.log(liked + '\n' + disliked);

            if (liked != undefined) return 'liked';
            if (disliked != undefined) return 'disliked';
            return 'none';
        }
        return 'none';
    }
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
    async removeLike(userId: string, imdbId: string): Promise<void> {
        await database.user.update({
            where: {
                id: userId
            },
            data: {
                likes: {
                    disconnect: {
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
    async removeDislike(userId: string, imdbId: string): Promise<void> {
        await database.user.update({
            where: {
                id: userId
            },
            data: {
                dislikes: {
                    disconnect: {
                        imdbId
                    }
                }
            }
        });
    }
}

export { ReactRepository };
