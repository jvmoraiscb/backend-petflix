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
    addMovie(email: string, movieId: number): Promise<void>;
    removeMovie(email: string, movieId: number): Promise<void>;
    addEvaluation(email: string, evaluation: number): Promise<void>;
    removeEvaluation(email: string, evaluation: number): Promise<void>;
    deleteUser(email: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    allUsers(): Promise<User[]>;
}

export { IUsersRepository };
