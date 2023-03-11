import { Request, Response } from 'express';
import { AmountOfAvatars } from '../../../useCases';

class AmountOfAvatarsController {
    constructor(private amountOfAvatars: AmountOfAvatars) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const amountOfAvatars = await this.amountOfAvatars.execute();
            return response
                .status(201)
                .json({ amountOfAvatars: amountOfAvatars });
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { AmountOfAvatarsController };
