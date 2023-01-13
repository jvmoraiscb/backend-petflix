import { Router } from 'express';
import { AddUserController, FindByEmailUserController } from '../controllers';
import { UserRepository } from '../../providers';
import { DbAddUser, DbFindByEmailUser } from '../../usecases';

const usersRepository = new UserRepository();

const dbAddUser = new DbAddUser(usersRepository);
const dbFindByEmailUser = new DbFindByEmailUser(usersRepository);

export const UserRoutes = (router: Router) => {
    router.get(
        '/user',
        new FindByEmailUserController(dbFindByEmailUser).handle
    );
    router.post('/user', new AddUserController(dbAddUser).handle);
};
