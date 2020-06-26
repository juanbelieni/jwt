import express from 'express';

import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';
import usersValidations from './validations/usersValidations';

const routes = express.Router();

routes.post('/register', usersValidations.register, UserController.register);
routes.post('/login', usersValidations.login, UserController.login);
routes.get('/users', authMiddleware, UserController.index);

export default routes;
