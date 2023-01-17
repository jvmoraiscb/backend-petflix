import { Request, Response } from 'express'
import { EditUser } from '../../../useCases'

class EditUserController {
    constructor(private dbEditUser: EditUser) {
        this.handle = this.handle.bind(this)
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.dbEditUser.execute(
                request.headers,
                request.body
            )
            return response.status(201).send(user)
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!',
            })
        }
    }
}

export { EditUserController }
