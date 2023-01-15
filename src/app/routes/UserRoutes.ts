import { Router } from 'express';
import {
    CreateUserController,
    DeleteUserController,
    FindByEmailUserController,
    LoginUserController
} from '../controllers';
import { PasswordHelper, TokenHelper, UserRepository } from '../../providers';
import {
    DbAllUsers,
    DbCreateUser,
    DbDeleteUser,
    DbEditUser,
    DbFindByEmailUser,
    DbLoginUser
} from '../../useCases';
import { EditUserController } from '../controllers/user/EditUserController';
import { AllUsersController } from '../controllers/user/AllUsersController';

const usersRepository = new UserRepository();
const passwordHelper = new PasswordHelper();
const tokenHelper = new TokenHelper();

const dbCreateUser = new DbCreateUser(usersRepository, passwordHelper);
const dbFindByEmailUser = new DbFindByEmailUser(usersRepository);
const dbLoginUser = new DbLoginUser(
    usersRepository,
    passwordHelper,
    tokenHelper
);
const dbEditUser = new DbEditUser(usersRepository, passwordHelper, tokenHelper);
const dbDeleteUser = new DbDeleteUser(usersRepository, tokenHelper);
const dbAllUsers = new DbAllUsers(usersRepository);

export const UserRoutes = (router: Router) => {
    router.get(
        '/user',
        new FindByEmailUserController(dbFindByEmailUser).handle
    );
    router.post('/user', new CreateUserController(dbCreateUser).handle);
    router.get('/user/all', new AllUsersController(dbAllUsers).handle);
    router.get('/user/login', new LoginUserController(dbLoginUser).handle);
    router.put('/user/login/edit', new EditUserController(dbEditUser).handle);
    router.delete(
        '/user/login/delete',
        new DeleteUserController(dbDeleteUser).handle
    );
};
