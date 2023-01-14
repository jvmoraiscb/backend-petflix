import { User } from '../entities';

interface IUsersRepository {
    createUser(
        email: string,
        password: string,
        name: string,
        profilePic: string
    ): Promise<User>;
    editUser(
        email: string,
        newEmail: string | undefined,
        newPassword: string | undefined,
        newName: string | undefined,
        newProfilePic: string | undefined
    ): Promise<User>;
    deleteUser(email: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
}

export { IUsersRepository };
