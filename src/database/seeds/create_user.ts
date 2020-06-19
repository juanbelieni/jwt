import Knex from 'knex';
import { getHashedPassword } from '../../utils/password';

export async function seed(knex: Knex) {
  await knex('users').insert({
    name: 'Juan Belieni',
    email: 'juanbelieni@gmail.com',
    password: getHashedPassword('juan1234'),
  });
}
