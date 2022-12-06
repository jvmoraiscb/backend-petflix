import { User } from '@prisma/client';
import { database } from '../app/config/database';
import { IUsersRepository } from '../repositories';

class UserRepository implements IUsersRepository {
    async createUser(
        props: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<User> {
        const user = await database.user.create({
            data: props
        });
        return user;
    }

    async deleteUser(email: string): Promise<void> {
        await database.user.delete({
            where: {
                email
            }
        });
    }

    async findById(id: number): Promise<User | null> {
        const user = await database.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await database.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }
}

export { UserRepository };
