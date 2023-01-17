import { Request, Response } from 'express'
import { FindByImdbIdMovie } from '../../../useCases'

class FindByImdbIdMovieController {
    constructor(private dbFindByImdbIdMovie: FindByImdbIdMovie) {
        this.handle = this.handle.bind(this)
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.dbFindByImdbIdMovie.execute(request.body)
            return response.status(201).send(res)
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!',
            })
        }
    }
}

export { FindByImdbIdMovieController }
