import { Evaluation } from "./Evaluation";
import { User } from "./User";

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
    evaluations: Evaluation[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
};

export { Movie };
