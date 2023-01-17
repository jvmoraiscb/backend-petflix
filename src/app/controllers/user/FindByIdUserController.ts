import { Request, Response } from 'express'
import { FindByIdUser } from '../../../useCases'

class FindByIdUserController {
    constructor(private dbFindByIdUser: FindByIdUser) {
        this.handle = this.handle.bind(this)
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.dbFindByIdUser.execute(request.body)
            return response.status(202).send(user)
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!',
            })
        }
    }
}

export { FindByIdUserController }
