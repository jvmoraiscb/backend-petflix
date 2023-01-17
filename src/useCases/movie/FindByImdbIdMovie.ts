import { Movie } from '../../entities'
import { IImdbRepository, IMoviesRepositoty } from '../../repositories'

class FindByImdbIdMovie {
    constructor(
        private imdbRepository: IImdbRepository //private moviesRepository: IMoviesRepositoty
    ) {}

    async execute(body: {
        imdbId: string
    }): Promise<
        | Movie
        | Omit<
              Movie,
              'id' | 'evaluationsId' | 'usersId' | 'createdAt' | 'updatedAt'
          >
    > {
        await this.bodyValidator(body)
        const { imdbId } = body
        /*
        let movie:
            | Movie
            | Omit<
                  Movie,
                  'id' | 'evaluationsId' | 'usersId' | 'createdAt' | 'updatedAt'
              >
            | null = await this.moviesRepository.findByImdbId(imdbId)
        if (movie === null) {
            movie = await this.imdbRepository.findById(imdbId)
        }
        */
        const movie = await this.imdbRepository.findById(imdbId)
        if (movie === null) {
            throw new Error('movie not found')
        }

        return movie
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.imdbId === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { FindByImdbIdMovie }
