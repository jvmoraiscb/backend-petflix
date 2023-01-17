import { SnippetMovie } from '../../entities'
import { IImdbRepository } from '../../repositories'

class SearchMovie {
    constructor(private imdbRepository: IImdbRepository) {}

    async execute(body: {
        query: string
        page: number
    }): Promise<{ movies: SnippetMovie[]; totalResults: number }> {
        await this.bodyValidator(body)
        const { query, page } = body
        const request = await this.imdbRepository.search(query, page)
        if (request === null) {
            throw new Error('movie not found')
        }
        const movies = request.movies
        const totalResults = request.totalResults
        return { movies, totalResults }
    }

    private async bodyValidator(body: any): Promise<void> {
        if (body.query === undefined || body.page === undefined) {
            throw new Error('invalid request')
        }
    }
}

export { SearchMovie }
