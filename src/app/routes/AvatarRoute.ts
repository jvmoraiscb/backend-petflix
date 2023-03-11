import { Router } from 'express';
import { AmountOfAvatars } from '../../useCases';
import { AmountOfAvatarsController } from '../controllers';

const amountOfAvatars = new AmountOfAvatars();

export const AvatarRoute = (router: Router) => {
    router.get(
        '/avatar',
        new AmountOfAvatarsController(amountOfAvatars).handle
    );
};
