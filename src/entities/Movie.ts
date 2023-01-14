type Movie = {
    id: number;
    title: string;
    poster: string;
    evaluationsId: number[];
    usersId: number[];
    createdAt: Date;
    updatedAt: Date;
};

export { Movie };
