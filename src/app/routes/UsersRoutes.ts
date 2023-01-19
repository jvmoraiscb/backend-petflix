import { Router } from 'express';
import {
    CreateUser,
    DeleteUser,
    EditUser,
    FindByIdUser,
    GetAllUsers,
    LoginUser
} from '../../useCases';
import {
    CreateUserController,
    DeleteUserController,
    FindByIdUserController,
    LoginUserController
} from '../controllers';
import { EditUserController } from '../controllers/user/EditUserController';
import { GetAllUsersController } from '../controllers/user/GetAllUsersController';
import {
    IdGenerator,
    PasswordEncrypter,
    TokenGenerator,
    UsersRepository
} from '../implementation';

const usersRepository = new UsersRepository();
const passwordEncrypter = new PasswordEncrypter();
const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();

const dbCreateUser = new CreateUser(
    usersRepository,
    passwordEncrypter,
    idGenerator
);
const dbFindByIdUser = new FindByIdUser(usersRepository);
const dbLoginUser = new LoginUser(
    usersRepository,
    passwordEncrypter,
    tokenGenerator
);
const dbEditUser = new EditUser(
    usersRepository,
    passwordEncrypter,
    tokenGenerator
);
const dbDeleteUser = new DeleteUser(usersRepository, tokenGenerator);
const dbAllUsers = new GetAllUsers(usersRepository);

export const UserRoutes = (router: Router) => {
    router.get('/user', new GetAllUsersController(dbAllUsers).handle);
    router.post('/user', new FindByIdUserController(dbFindByIdUser).handle);
    router.post('/user/create', new CreateUserController(dbCreateUser).handle);
    router.post('/user/login', new LoginUserController(dbLoginUser).handle);
    router.put('/user/edit', new EditUserController(dbEditUser).handle);
    router.delete(
        '/user/delete',
        new DeleteUserController(dbDeleteUser).handle
    );
};
