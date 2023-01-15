import { Router } from 'express';
import {
    IdGenerator,
    PasswordEncrypter,
    TokenGenerator,
    UserRepository
} from '../../implementation';
import {
    DbCreateUser,
    DbDeleteUser,
    DbEditUser,
    DbFindByEmailUser,
    DbGetAllUsers,
    DbLoginUser
} from '../../useCases';
import {
    CreateUserController,
    DeleteUserController,
    FindByEmailUserController,
    LoginUserController
} from '../controllers';
import { EditUserController } from '../controllers/user/EditUserController';
import { GetAllUsersController } from '../controllers/user/GetAllUsersController';

const usersRepository = new UserRepository();
const passwordEncrypter = new PasswordEncrypter();
const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();

const dbCreateUser = new DbCreateUser(
    usersRepository,
    passwordEncrypter,
    idGenerator
);
const dbFindByEmailUser = new DbFindByEmailUser(usersRepository);
const dbLoginUser = new DbLoginUser(
    usersRepository,
    passwordEncrypter,
    tokenGenerator
);
const dbEditUser = new DbEditUser(
    usersRepository,
    passwordEncrypter,
    tokenGenerator
);
const dbDeleteUser = new DbDeleteUser(usersRepository, tokenGenerator);
const dbAllUsers = new DbGetAllUsers(usersRepository);

export const UserRoutes = (router: Router) => {
    router.get(
        '/user',
        new FindByEmailUserController(dbFindByEmailUser).handle
    );
    router.post('/user', new CreateUserController(dbCreateUser).handle);
    router.get('/user/all', new GetAllUsersController(dbAllUsers).handle);
    router.get('/user/login', new LoginUserController(dbLoginUser).handle);
    router.put('/user/login/edit', new EditUserController(dbEditUser).handle);
    router.delete(
        '/user/login/delete',
        new DeleteUserController(dbDeleteUser).handle
    );
};
