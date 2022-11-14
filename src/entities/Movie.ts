class Movie {
    public id: number | undefined
    public id_imdb!: string
    public title!: string
    public poster!: string
    public evaluations_id!: number[]
    public users_liked_id!: number[]

    constructor(props: Omit<Movie, 'id'>, id?: number) {
        if (id) {
            this.id = id
        }
        Object.assign(this, props)
    }
}

export { Movie }
