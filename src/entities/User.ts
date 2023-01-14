class User {
    constructor(
        private _id: number,
        private _email: string,
        private _password: string,
        private _name: string,
        private _profilePic: string,
        private _evaluationsId: number[],
        private _moviesId: number[],
        private _createdAt: Date,
        private _updateAt: Date
    ) {}

    public get id() {
        return this._id;
    }

    public get email() {
        return this._email;
    }

    public get password() {
        return this._password;
    }

    public get name() {
        return this._name;
    }

    public get profilePic() {
        return this._profilePic;
    }

    public get evaluationsId() {
        return this._evaluationsId;
    }

    public get moviesId() {
        return this._moviesId;
    }

    public get createdAt() {
        return this._createdAt;
    }

    public get updateAt() {
        return this._updateAt;
    }
}

export { User };
