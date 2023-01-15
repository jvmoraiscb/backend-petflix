type Movie = {
    id: number;
    imdbId: string;
    title: string;
    year: number;
    genre: string;
    plot: string;
    poster: string;
    evaluationsId: number[];
    usersId: number[];
    createdAt: Date;
    updatedAt: Date;
};

export { Movie };
