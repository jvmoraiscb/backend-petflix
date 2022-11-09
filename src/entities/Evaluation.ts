class Evaluation {
    public id: number | undefined
    public rating!: number
    public comment!: string
    public user_id!: number
    public movie_id!: number

    constructor(props: Omit<Evaluation, 'id'>, id?: number) {
        if (id) {
            this.id = id
        }
        Object.assign(this, props)
    }
}

export { Evaluation }
