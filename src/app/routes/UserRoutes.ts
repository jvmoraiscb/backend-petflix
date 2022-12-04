import { Router } from 'express';
import { AddUserController } from '../controllers';
import { UserRepository } from '../../providers';
import { DbAddUser } from '../../usecases';

const usersRepository = new UserRepository();

const dbAddUser = new DbAddUser(usersRepository);

export const UserRoutes = (router: Router) => {
    router.post('/user', new AddUserController(dbAddUser).handle);
};
