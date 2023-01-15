type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    profilePic: string;
    evaluationsId: number[];
    moviesId: number[];
    createdAt: Date;
    updatedAt: Date;
};

export { User };
