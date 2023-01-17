import { User } from '../../../entities'
import { IUsersRepository } from '../../../repositories'
import { database } from '../../config/database'

class UserRepository implements IUsersRepository {
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
                profilePic,
            },
        })
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId,
            },
            includes: {
                movies: true,
                evaluations: true,
            },
        })

        return user
    }

    async delete(userId: string): Promise<void> {
        await database.prismaUser.delete({
            where: {
                id: userId,
            },
        })
    }
    async edit(
        userId: string,
        email: string,
        password: string,
        name: string,
        profilePic: string
    ): Promise<User> {
        const updates: any = {}
        if (email !== undefined) {
            updates.email = email
        }
        if (password !== undefined) {
            updates.password = password
        }
        if (name !== undefined) {
            updates.name = name
        }
        if (profilePic !== undefined) {
            updates.profilePic = profilePic
        }
        const userUpdate = await database.prismaUser.update({
            where: {
                id: userId,
            },
            data: updates,
        })

        return userUpdate
    }

    async addMovie(userId: string, movieId: string): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId,
            },
        })
        if (user !== null) {
            const moviesId = user.moviesId
            moviesId.push(movieId)
            await database.prismaUser.update({
                where: {
                    id: userId,
                },
                data: { moviesId },
            })
        }
    }

    async removeMovie(userId: string, movieId: string): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId,
            },
        })
        if (user !== null) {
            const moviesId = user.moviesId
            moviesId.splice(moviesId.indexOf(movieId), 1)
            await database.prismaUser.update({
                where: {
                    id: userId,
                },
                data: { moviesId },
            })
        }
    }

    async addEvaluation(userId: string, evaluationId: string): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId,
            },
        })
        if (user !== null) {
            const evaluationsId = user.evaluationsId
            evaluationsId.push(evaluationId)
            await database.prismaUser.update({
                where: {
                    id: userId,
                },
                data: { evaluationsId },
            })
        }
    }

    async removeEvaluation(
        userId: string,
        evaluationId: string
    ): Promise<void> {
        const user = await database.prismaUser.findUnique({
            where: {
                id: userId,
            },
        })
        if (user !== null) {
            const evaluationsId = user.evaluationsId
            evaluationsId.splice(evaluationsId.indexOf(evaluationId), 1)
            await database.prismaUser.update({
                where: {
                    id: userId,
                },
                data: { evaluationsId },
            })
        }
    }

    async findById(id: string): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                id,
            },
        })

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await database.prismaUser.findUnique({
            where: {
                email,
            },
        })

        return user
    }

    async getAll(): Promise<User[]> {
        const users = await database.prismaUser.findMany()

        return users
    }
}

export { UserRepository }
