import { database } from '../app/config/database';
import { IUsersRepository } from '../repositories';
import { PrismaUser } from '@prisma/client';
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
        const pUser = await database.prismaUser.create({
            data: { name, email, password, profilePic, evaluationsId, moviesId }
        });
        return pUserToUser(pUser);
    }

    async deleteUser(email: string): Promise<void> {
        await database.prismaUser.delete({
            where: {
                email
            }
        });
    }

    async findById(id: number): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                id
            }
        });

        if (user === null) {
            return null;
        }

        return pUserToUser(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                email
            }
        });

        if (user === null) {
            return null;
        }

        return pUserToUser(user);
    }
}

function pUserToUser(pUser: PrismaUser) {
    const {
        id: id,
        email,
        password,
        name,
        profilePic,
        evaluationsId,
        moviesId,
        createdAt,
        updatedAt
    } = pUser;

    return new User(
        id,
        email,
        password,
        name,
        profilePic,
        evaluationsId,
        moviesId,
        createdAt,
        updatedAt
    );
}

export { UserRepository };
