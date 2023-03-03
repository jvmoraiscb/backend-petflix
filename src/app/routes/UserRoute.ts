import { Router } from 'express';
import {
    CreateUser,
    DeleteUser,
    GetUser,
    LoginUser,
    UpdateUser
} from '../../useCases';
import {
    CreateUserController,
    DeleteUserController,
    GetUserController,
    LoginUserController,
    UpdateUserController
} from '../controllers';
import {
    IdGenerator,
    PasswordEncrypter,
    TokenGenerator,
    UserRepository
} from '../implementation';
import { isAuthMiddleware } from '../middlewares/isAuth';
import { registerIsOnMiddleware } from '../middlewares/registerIsOn';

const userRepository = new UserRepository();
const passwordEncrypter = new PasswordEncrypter();
const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

const getUser = new GetUser(userRepository);
const createUser = new CreateUser(
    userRepository,
    passwordEncrypter,
    idGenerator
);
const updateUser = new UpdateUser(userRepository, passwordEncrypter);
const deleteUser = new DeleteUser(userRepository);
const loginUser = new LoginUser(
    userRepository,
    passwordEncrypter,
    tokenGenerator
);

export const UserRoute = (router: Router) => {
    router.get(
        '/user',
        isAuthMiddleware,
        new GetUserController(getUser).handle
    );

    router.post(
        '/user',
        registerIsOnMiddleware,
        new CreateUserController(createUser).handle
    );

    router.put(
        '/user',
        isAuthMiddleware,
        new UpdateUserController(updateUser).handle
    );

    router.delete(
        '/user',
        isAuthMiddleware,
        new DeleteUserController(deleteUser).handle
    );

    router.post('/login', new LoginUserController(loginUser).handle);
};
