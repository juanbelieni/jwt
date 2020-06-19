import { celebrate, Joi } from 'celebrate';

export default {
  register: celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      }),
    },
    { abortEarly: false }
  ),
  login: celebrate(
    {
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
      }),
    },
    { abortEarly: false }
  ),
};
