export enum likeStatus {
    like,
    dislike,
    none
}

export interface IReactRepository {
    getLikeStatus(userId: string, imdbId: string): Promise<likeStatus>;
    like(userId: string, imdbId: string): Promise<void>;
    removeLike(userId: string, imdbId: string): Promise<void>;
    dislike(userId: string, imdbId: string): Promise<void>;
    removeDislike(userId: string, imdbId: string): Promise<void>;
}
