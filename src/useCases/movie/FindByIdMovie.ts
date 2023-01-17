import { Movie } from '../../entities'
import { IMoviesRepositoty } from '../../repositories'

class FindByIdMovie {
    constructor(private moviesRepository: IMoviesRepositoty) {}

    async execute(body: { id: string }): Promise<Movie> {
        await this.bodyValidator(body)
        const { id } = body

        let movie = await this.moviesRepository.findById(id)
        if (movie === null) {
            throw new Error('invalid id')
        }

        return movie
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.id === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { FindByIdMovie }
