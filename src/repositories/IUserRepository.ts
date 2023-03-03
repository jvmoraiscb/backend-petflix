import { User } from '@prisma/client';

interface IUserRepository {
    create(
        user: Pick<User, 'id' | 'email' | 'password' | 'name' | 'profilePic'>
    ): Promise<User>;
    findById(userId: string): Promise<User | null>;
    findByEmail(userEmail: string): Promise<User | null>;
    update(
        user: Pick<User, 'id' | 'email' | 'password' | 'name' | 'profilePic'>
    ): Promise<User>;
    delete(userId: string): Promise<void>;
}

export { IUserRepository };
