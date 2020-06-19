import express from 'express';

import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const routes = express.Router();

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);
routes.get('/users', authMiddleware, UserController.index);

export default routes;
