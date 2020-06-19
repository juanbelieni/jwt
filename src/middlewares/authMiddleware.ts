import { Request, Response, NextFunction } from 'express';

import { verifyAccessToken } from '../utils/jwt';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({
      error: 'Access token not given.',
    });
  }

  const [bearer, accessToken] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return res.status(401).send({
      error: 'Access token must be a valid bearer token.',
    });
  }

  try {
    res.locals.user = verifyAccessToken(accessToken);
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid access token.' });
  }
};

export default authMiddleware;
