import { User } from '../../../entities';
import { IUsersRepository } from '../../../repositories';
import { database } from '../../config/database';

class UsersRepository implements IUsersRepository {
    async create(
        userId: string,
        email: string,
        password: string,
        name: string,
        profilePic: string
    ): Promise<User | null> {
        await database.prismaUser.create({
            data: {
                id: userId,
                name,
                email,
                password,
                profilePic
            }
        });
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId
            },
            include: {
                movies: true,
                evaluations: {
                    include: {
                        movie: true
                    }
                }
            }
        });

        return user;
    }

    async delete(userId: string): Promise<void> {
        await database.prismaUser.delete({
            where: {
                id: userId
            }
        });
    }
    async edit(
        userId: string,
        email: string,
        password: string,
        name: string,
        profilePic: string
    ): Promise<User> {
        const updates: any = {};
        if (email !== undefined) {
            updates.email = email;
        }
        if (password !== undefined) {
            updates.password = password;
        }
        if (name !== undefined) {
            updates.name = name;
        }
        if (profilePic !== undefined) {
            updates.profilePic = profilePic;
        }
        const userUpdate = await database.prismaUser.update({
            where: {
                id: userId
            },
            data: updates
        });

        return userUpdate;
    }

    async addMovie(userId: string, movieId: string): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId
            }
        });
        if (user !== null) {
            await database.prismaUser.update({
                where: {
                    id: userId
                },
                data: {
                    movies: {
                        connect: {
                            id: movieId
                        }
                    }
                }
            });
        }
    }

    async removeMovie(userId: string, movieId: string): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId
            }
        });
        if (user !== null) {
            await database.prismaUser.update({
                where: {
                    id: userId
                },
                data: {
                    movies: {
                        disconnect: {
                            id: movieId
                        }
                    }
                }
            });
        }
    }

    async addEvaluation(userId: string, evaluationId: string): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId
            }
        });
        if (user !== null) {
            await database.prismaUser.update({
                where: {
                    id: userId
                },
                data: {
                    evaluations: {
                        connect: {
                            id: evaluationId
                        }
                    }
                }
            });
        }
    }

    async removeEvaluation(
        userId: string,
        evaluationId: string
    ): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId
            }
        });
        if (user !== null) {
            await database.prismaUser.update({
                where: {
                    id: userId
                },
                data: {
                    evaluations: {
                        disconnect: {
                            id: evaluationId
                        }
                    }
                }
            });
        }
    }

    async findById(id: string): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                id
            },
            include: {
                movies: true,
                evaluations: {
                    include: {
                        movie: true
                    }
                }
            }
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                email
            },
            include: {
                movies: true,
                evaluations: {
                    include: {
                        movie: true
                    }
                }
            }
        });

        return user;
    }

    async getAll(): Promise<User[]> {
        const users = await database.prismaUser.findMany({
            include: {
                movies: true,
                evaluations: {
                    include: {
                        movie: true
                    }
                }
            }
        });

        return users;
    }
}

export { UsersRepository };
