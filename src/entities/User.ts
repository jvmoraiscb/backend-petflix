type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    profilePic: string;
    evaluationsId: string[];
    moviesId: string[];
    createdAt: Date;
    updatedAt: Date;
};

export { User };
