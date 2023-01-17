import { Request, Response } from 'express'
import { SearchMovie } from '../../../useCases'

class SearchMovieController {
    constructor(private dbSearchMovie: SearchMovie) {
        this.handle = this.handle.bind(this)
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.dbSearchMovie.execute(request.body)
            return response.status(201).send(res)
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!',
            })
        }
    }
}

export { SearchMovieController }
