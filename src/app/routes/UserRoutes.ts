import { Router } from 'express';
import {
    AddUserController,
    DeleteUserController,
    FindByEmailUserController
} from '../controllers';
import { UserRepository } from '../../providers';
import { DbAddUser, DbDeleteUser, DbFindByEmailUser } from '../../usecases';

const usersRepository = new UserRepository();

const dbAddUser = new DbAddUser(usersRepository);
const dbDeleteUser = new DbDeleteUser(usersRepository);
const dbFindByEmailUser = new DbFindByEmailUser(usersRepository);

export const UserRoutes = (router: Router) => {
    router.get(
        '/user',
        new FindByEmailUserController(dbFindByEmailUser).handle
    );
    router.post('/user', new AddUserController(dbAddUser).handle);
    router.delete('/user', new DeleteUserController(dbDeleteUser).handle);
};
