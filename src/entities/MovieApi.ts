export type MovieApi = {
    imdbID: string;
    Title: string;
    Type: string;
    Runtime: string;
    Year: string;
    Genre: string;
    Plot: string;
    Poster: string;
    Director: string;
    Writer: string;
    Actors: string;
};

export type snippetMovieApi = {
    isInDatabase: boolean;
    wasWatched: boolean;
    imdbID: string;
    Title: string;
    Type: string;
    Year: string;
    Poster: string;
    evaluations: number;
    rating: number;
    likes: number;
    dislikes: number;
};
