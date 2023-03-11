import { Request, Response } from 'express';
import { GetRandomQuote } from '../../../useCases';

class GetRandomQuoteController {
    constructor(private getRandomQuote: GetRandomQuote) {
        this.handle = this.handle.bind(this);
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const quote = await this.getRandomQuote.execute();
            return response.status(201).json(quote);
        } catch (err: any) {
            return response.status(400).json({
                message: err.message || 'Unexpected Error!'
            });
        }
    }
}

export { GetRandomQuoteController };
