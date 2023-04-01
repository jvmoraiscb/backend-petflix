export interface IReactRepository {
    getLikeStatus(userId: string, imdbId: string): Promise<string>;
    like(userId: string, imdbId: string): Promise<void>;
    removeLike(userId: string, imdbId: string): Promise<void>;
    dislike(userId: string, imdbId: string): Promise<void>;
    removeDislike(userId: string, imdbId: string): Promise<void>;
}
