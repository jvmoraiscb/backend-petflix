import { User } from '../entities/User'

export interface IUsersRepository {
    createUser(user: Omit<User, 'id'>): Promise<User | undefined>
    deleteUser(email: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    findById(id: number): Promise<User | undefined>
}
