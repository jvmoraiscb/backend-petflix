import { Router } from 'express';
import {
    AddUserController,
    DeleteUserController,
    FindByEmailUserController,
    LoginUserController
} from '../controllers';
import { PasswordHelper, TokenHelper, UserRepository } from '../../providers';
import {
    DbAddUser,
    DbDeleteUser,
    DbFindByEmailUser,
    DbLoginUser
} from '../../useCases';

const usersRepository = new UserRepository();
const passwordHelper = new PasswordHelper();
const tokenHelper = new TokenHelper();

const dbAddUser = new DbAddUser(usersRepository, passwordHelper);
const dbLoginUser = new DbLoginUser(
    usersRepository,
    passwordHelper,
    tokenHelper
);
const dbFindByEmailUser = new DbFindByEmailUser(usersRepository);
const dbDeleteUser = new DbDeleteUser(usersRepository, tokenHelper);

export const UserRoutes = (router: Router) => {
    router.get(
        '/user',
        new FindByEmailUserController(dbFindByEmailUser).handle
    );
    router.post('/user', new AddUserController(dbAddUser).handle);
    router.delete('/user', new DeleteUserController(dbDeleteUser).handle);
    router.get('/login', new LoginUserController(dbLoginUser).handle);
};
