export interface IReactRepository {
    like(userId: string, imdbId: string): Promise<void>;
    dislike(userId: string, imdbId: string): Promise<void>;
}
