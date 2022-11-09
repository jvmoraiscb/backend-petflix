class User {
    public id: number | undefined
    public email!: string
    public name!: string
    public password!: string
    public favorite_movies_id!: number[]
    public evaluations_id!: number[]

    constructor(props: Omit<User, 'id'>, id?: number) {
        if (id) {
            this.id = id
        }
        Object.assign(this, props)
    }
}

export { User }
