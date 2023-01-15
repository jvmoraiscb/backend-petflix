type Movie = {
    id: string;
    imdbId: string;
    title: string;
    type: string;
    runtime: string;
    year: string;
    genre: string;
    plot: string;
    poster: string;
    director: string;
    writer: string;
    actors: string;
    metascore: string;
    imdbRating: string;
    evaluationsId: string[];
    usersId: string[];
    createdAt: Date;
    updatedAt: Date;
};

export { Movie };
