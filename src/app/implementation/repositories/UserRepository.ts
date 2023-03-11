import { User } from '@prisma/client';
import { IUserRepository } from '../../../repositories';
import { database } from '../../config/database';

class UserRepository implements IUserRepository {
    async create(user: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
        return database.user.create({
            data: user
        });
    }

    async findById(userId: string): Promise<User | null> {
        return database.user.findUnique({
            where: {
                id: userId
            },
            include: {
                likes: {
                    include: {
                        evaluations: {
                            include: {
                                user: {
                                    select: {
                                        name: true,
                                        profilePic: true
                                    }
                                }
                            }
                        },
                        _count: {
                            select: {
                                likes: true,
                                dislikes: true,
                                evaluations: true
                            }
                        }
                    }
                },
                evaluations: true
            }
        });
    }

    async findByEmail(userEmail: string): Promise<User | null> {
        return database.user.findUnique({
            where: {
                email: userEmail
            },
            include: {
                likes: {
                    include: {
                        evaluations: true,
                        _count: {
                            select: {
                                likes: true,
                                dislikes: true
                            }
                        }
                    }
                },
                evaluations: true
            }
        });
    }

    async update(user: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
        return database.user.update({
            where: {
                id: user.id
            },
            data: user
        });
    }

    async delete(userId: string): Promise<void> {
        await database.user.delete({
            where: {
                id: userId
            }
        });
    }
}

export { UserRepository };
