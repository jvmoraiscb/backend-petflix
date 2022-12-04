import { Router } from 'express';
import { AddUserController, DeleteUserController } from '../controllers';
import { UserRepository } from '../../providers';
import { DbAddUser, DbDeleteUser } from '../../usecases';

const usersRepository = new UserRepository();

const dbAddUser = new DbAddUser(usersRepository);
const dbDeleteUser = new DbDeleteUser(usersRepository);

export const UserRoutes = (router: Router) => {
    router.post('/user', new AddUserController(dbAddUser).handle);
    router.delete('/user', new DeleteUserController(dbDeleteUser).handle);
};
