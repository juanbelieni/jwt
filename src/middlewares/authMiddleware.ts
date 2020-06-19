import { Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';

import { verifyAccessToken } from '../utils/jwt';

const tokenMiddleware = celebrate({
  headers: Joi.object({
    authorization: Joi.string()
      .required()
      .regex(/Bearer .+/),
  }).unknown(),
});

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization as string;
  const accessToken = authorization.split(' ')[1];

  try {
    res.locals.user = verifyAccessToken(accessToken);
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid access token.' });
  }
};

export default [tokenMiddleware, authMiddleware];
