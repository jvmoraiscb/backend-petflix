import { Request, Response } from 'express'
import { DeleteUser } from '../../../useCases'

class DeleteUserController {
    constructor(private dbDeleteUser: DeleteUser) {
        this.handle = this.handle.bind(this)
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            await this.dbDeleteUser.execute(request.headers)
            return response.status(202).send()
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!',
            })
        }
    }
}

export { DeleteUserController }
