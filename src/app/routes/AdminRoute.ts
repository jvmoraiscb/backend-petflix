import { Router } from 'express';
import {
    AddWatchedAdmin,
    DeleteUserAdmin,
    GetUsersAdmin,
    RegisterGetAdmin,
    RegisterToggleAdmin,
    RemoveWatchedAdmin
} from '../../useCases';
import {
    AddWatchedAdminController,
    DeleteUserAdminController,
    GetUsersAdminController,
    RegisterGetAdminController,
    RegisterToggleAdminController,
    RemoveWatchedAdminController
} from '../controllers';
import {
    AdminRepository,
    MovieRepository,
    UserRepository
} from '../implementation';
import { isAdminMiddleware, isAuthMiddleware } from '../middlewares';

const adminRepository = new AdminRepository();
const movieRepository = new MovieRepository();
const userRepository = new UserRepository();

const addWatchedAdmin = new AddWatchedAdmin(adminRepository, movieRepository);
const removeWatchedAdmin = new RemoveWatchedAdmin(
    adminRepository,
    movieRepository
);
const getUsersAdmin = new GetUsersAdmin(adminRepository);
const deleteUserAdmin = new DeleteUserAdmin(adminRepository, userRepository);
const registerToggleAdmin = new RegisterToggleAdmin(adminRepository);
const registerGetAdmin = new RegisterGetAdmin(adminRepository);

export const AdminRoute = (router: Router) => {
    router.get(
        '/admin/addwatched',
        isAuthMiddleware,
        isAdminMiddleware,
        new AddWatchedAdminController(addWatchedAdmin).handle
    );

    router.get(
        '/admin/removewatched',
        isAuthMiddleware,
        isAdminMiddleware,
        new RemoveWatchedAdminController(removeWatchedAdmin).handle
    );

    router.get(
        '/admin/users',
        isAuthMiddleware,
        isAdminMiddleware,
        new GetUsersAdminController(getUsersAdmin).handle
    );

    router.delete(
        '/admin/users',
        isAuthMiddleware,
        isAdminMiddleware,
        new DeleteUserAdminController(deleteUserAdmin).handle
    );

    router.put(
        '/admin/registertoggle',
        isAuthMiddleware,
        isAdminMiddleware,
        new RegisterToggleAdminController(registerToggleAdmin).handle
    );

    router.get(
        '/admin/registerison',
        new RegisterGetAdminController(registerGetAdmin).handle
    );
};
