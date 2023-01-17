import { User } from '../entities'

interface IUsersRepository {
    create(
        userId: string,
        email: string,
        password: string,
        name: string,
        profilePic: string
    ): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findById(userId: string): Promise<User | null>
    getAll(): Promise<User[]>
    edit(
        userId: string,
        newEmail: string | undefined,
        newPassword: string | undefined,
        newName: string | undefined,
        newProfilePic: string | undefined
    ): Promise<User>
    delete(userId: string): Promise<void>
    addMovie(userId: string, movieId: string): Promise<void>
    removeMovie(userId: string, movieId: string): Promise<void>
    addEvaluation(userId: string, evaluation: string): Promise<void>
    removeEvaluation(userId: string, evaluation: string): Promise<void>
}

export { IUsersRepository }
