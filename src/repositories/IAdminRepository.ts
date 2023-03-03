import { User } from '@prisma/client';

export interface IAdminRepository {
    addWatched(imdbId: string): Promise<void>;
    removeWatched(imdbId: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
    deleteUser(userId: string): Promise<void>;
    registerToggle(): Promise<void>;
    registerGet(): Promise<boolean>;
}
