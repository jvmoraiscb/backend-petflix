type Movie = {
    id: number;
    imdbId: number;
    title: string;
    poster: string;
    evaluationsId: number[];
    usersId: number[];
    createdAt: Date;
    updatedAt: Date;
};

export { Movie };
