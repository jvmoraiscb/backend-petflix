import { User } from '@prisma/client';

interface IUsersRepository {
    createUser(
        user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<User>;
    deleteUser(email: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
}

export { IUsersRepository };
