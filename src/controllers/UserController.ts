import knex from '../database/connection';
import { Request, Response } from 'express';

import { getHashedPassword } from '../utils/password';
import { genAccessToken } from '../utils/jwt';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export default {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body as RegisterBody;

    const user = await knex('users').where({ email }).first();

    if (user) {
      return res.status(400).send({
        error: 'User already registered.',
      });
    }

    const hashedPassword = getHashedPassword(password);

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).send({ name, email });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body as LoginBody;
    const hashedPassword = getHashedPassword(password);

    const user = await knex('users')
      .where({ email, password: hashedPassword })
      .first();

    if (!user) {
      return res.status(400).send({
        error: 'Incorrect username or password.',
      });
    }

    const accessToken = genAccessToken(user);

    return res.status(200).send({ accessToken });
  },

  async index(req: Request, res: Response) {
    const users = await knex('users').select('name', 'email');
    return res.send(users);
  },
};
