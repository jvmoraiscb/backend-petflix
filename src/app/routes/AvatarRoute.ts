import { Router } from 'express';
import { AmountOfAvatarsController } from '../controllers/avatar';
import { AmountOfAvatars } from '../../useCases/avatar';

const amountOfAvatars = new AmountOfAvatars();

export const AvatarRoute = (router: Router) => {
    router.get(
        '/avatar',
        new AmountOfAvatarsController(amountOfAvatars).handle
    );
};
