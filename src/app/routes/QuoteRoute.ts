import { Router } from 'express';
import { GetRandomQuote } from '../../useCases';
import { GetRandomQuoteController } from '../controllers';

const getRandomQuote = new GetRandomQuote();

export const QuoteRoute = (router: Router) => {
    router.get('/quote', new GetRandomQuoteController(getRandomQuote).handle);
};
