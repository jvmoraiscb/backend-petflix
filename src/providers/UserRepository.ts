import { database } from '../app/config/database';
import { IUsersRepository } from '../repositories';
import { User } from '../entities';

class UserRepository implements IUsersRepository {
    async createUser(
        email: string,
        password: string,
        name: string,
        profilePic: string
    ): Promise<User> {
        const evaluationsId = [] as number[];
        const moviesId = [] as number[];
        const user = await database.prismaUser.create({
            data: { name, email, password, profilePic, evaluationsId, moviesId }
        });
        return user;
    }

    async deleteUser(email: string): Promise<void> {
        await database.prismaUser.delete({
            where: {
                email
            }
        });
    }
    async editUser(
        email: string,
        newEmail: string,
        newPassword: string,
        newName: string,
        newProfilePic: string
    ): Promise<User> {
        const updates: any = {};
        if (newEmail !== undefined) {
            updates.email = newEmail;
        }
        if (newPassword !== undefined) {
            updates.password = newPassword;
        }
        if (newName !== undefined) {
            updates.name = newName;
        }
        if (newProfilePic !== undefined) {
            updates.profilePic = newProfilePic;
        }
        const userUpdate = await database.prismaUser.update({
            where: {
                email
            },
            data: updates
        });

        return userUpdate;
    }

    async addMovie(email: string, movieId: number): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                email
            }
        });
        if (user !== null) {
            const moviesId = user.moviesId;
            moviesId.push(movieId);
            await database.prismaUser.update({
                where: {
                    email
                },
                data: { moviesId }
            });
        }
    }

    async removeMovie(email: string, movieId: number): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                email
            }
        });
        if (user !== null) {
            const moviesId = user.moviesId;
            moviesId.splice(moviesId.indexOf(movieId), 1);
            await database.prismaUser.update({
                where: {
                    email
                },
                data: { moviesId }
            });
        }
    }

    async addEvaluation(email: string, evaluationId: number): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                email
            }
        });
        if (user !== null) {
            const evaluationsId = user.evaluationsId;
            evaluationsId.push(evaluationId);
            await database.prismaUser.update({
                where: {
                    email
                },
                data: { evaluationsId }
            });
        }
    }

    async removeEvaluation(email: string, evaluationId: number): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                email
            }
        });
        if (user !== null) {
            const evaluationsId = user.evaluationsId;
            evaluationsId.splice(evaluationsId.indexOf(evaluationId), 1);
            await database.prismaUser.update({
                where: {
                    email
                },
                data: { evaluationsId }
            });
        }
    }

    async findById(id: number): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                id
            }
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    async allUsers(): Promise<User[]> {
        const users = await database.prismaUser.findMany();

        return users;
    }
}

export { UserRepository };
